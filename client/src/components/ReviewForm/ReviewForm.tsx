import { useState } from 'react';
import MovieModel from "../../models/MovieModel";
import UserModel from "../../models/UserModel";
import ReviewModel from "../../models/ReviewModel";
import "./reviewform.css";
import { useOktaAuth } from '@okta/okta-react';

export const ReviewForm: React.FC<{ isReviewed: unknown, setIsReviewed: unknown }> = (props) => {
    const { movieObj, isReviewed, setIsReviewed} = props;

    const { authState } = useOktaAuth();

    const [Text, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [error, setError] = useState(false); 

    const handleChange = event => {
        if (event.target.value.length <= 280) {
          setText(event.target.value);
          setCharacterCount(event.target.value.length);
        }
      };

      
      const handleFormSubmit = async event => {   
        event.preventDefault()              
        try {

            const userId = parseInt(authState.idToken.claims.user_id);
            const userName = authState.idToken.claims.name;
            const userEmail= authState.idToken.claims.email;
        
            const user = new UserModel(userId, userName, userEmail);
        
            const movie = new MovieModel(movieObj.id, movieObj.title);
        
            const reviewText = Text;
        
            const review = new ReviewModel(user, movie, reviewText);
        
        
        
            const validateMovie = await fetch(
              `http://www.localhost:8080/api/movies/${movieObj.id}`
            )
            
            if(!validateMovie.ok) {     
              
              addMovie(movie).then(()=> addReview(review)).then(()=>setIsReviewed(!isReviewed));   
            }
        
        
            if(validateMovie.ok) {
              addReview(review);
              
            }
                  
          setText('');
          setCharacterCount(0);        
            
          
        } catch (e) {
          console.error(e);
        }
      };





const addMovie = async (data) => {

  if (authState && authState.isAuthenticated) {
    const url = `http://localhost:8080/api/movies/secure/add/movie`;
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const addMovieResponse = await fetch(url, requestOptions);
    if (!addMovieResponse.ok) {
      throw new Error("Unable to add movie to the database.");
    }

    console.log("Movie added to database.")

  }
  
}

      const addReview = async (data) => {

        if (authState && authState.isAuthenticated) {
          const url = `http://localhost:8080/api/reviews/secure/add/review`;
          const requestOptions = {
            method: "POST",
            headers: {
              Authorization: `Bearer ${authState.accessToken?.accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          };
          const addReviewResponse = await fetch(url, requestOptions);
          if (!addReviewResponse.ok) {
            throw new Error("Unable to add review to the database.");
          }
      
          console.log("Review added to database.")   
          
      
        }
        
      }
    

    return(    
        <div className='my-3'>
                    <p className={`m-1 ${characterCount === 280 || error ? 'text-error' : ''}`}>
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
        </p>
        <form className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}>
            <textarea
            placeholder="Leave a Comment..."
            value={Text}
            className="form-input col-12 col-md-9 m-1"
            onChange={handleChange}
            ></textarea>
            <div className='my-1 mx-2'>
            <button className="btn col-1 btn-dark" type="submit">
            Submit
            </button>
            </div>
        </form>
        </div>
    );
}