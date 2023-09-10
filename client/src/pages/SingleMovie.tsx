import { useOktaAuth } from "@okta/okta-react";
import { MovieReviews } from "../components/MovieReviews/MovieReviews";
import { ReviewForm } from "../components/ReviewForm/ReviewForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StarsReview } from "../components/StarReview/StarReview";
import UserModel from "../models/UserModel";
import MovieModel from "../models/MovieModel";
import RatingModel from "../models/RatingModel";

export const SingleMovie: React.FC<{ movieArr: unknown }> = (props) => {
  const { id } = useParams();
  const [isReviewed, setIsReviewed] = useState(false);
  const [isRated, setIsRated] = useState(false);
  const [movieObj, setMovieObj] = useState({});
  const [compositeRating, setCompositeRating] = useState(0);
  const [userRating, setUserRating] = useState();
  const [ratingsArray, setRatingsArray] = useState([]);    
  const { authState } = useOktaAuth();  

  console.log(movieObj);




  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${id}language=en-US`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZThkMWZiNzY4M2I4MjlkNzI4ZTIwNGRiNDYxMTAzYiIsInN1YiI6IjYzM2NlMDk0MDA2YjAxMDA3ZjI3ZDY5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GrI0N5JWVxdtzfmYZtq0occyJyllrY4zgg-2EENzrio",
      },
    };

    fetch(url, options).then(function (response) {
      response.json().then(function (data) {
        setMovieObj(data);
      });
    });
  }, [id]);
 

  useEffect(() => {
    const url = `http://www.localhost:8080/api/movies/${id}/ratings`;

    fetch(url).then(function (response) {
      if(response.ok){
      response.json().then(function (data) {
        const tempArray = [];
        data._embedded.ratings.map((el) => tempArray.push(el.rating));
        const sum = tempArray.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
        const average = sum / tempArray.length;
        setRatingsArray(tempArray);
        const roundedAvg = round(average);
        setCompositeRating(roundedAvg);

        const ratingData = data._embedded.ratings.filter(
          (rating) => rating.userId.userName === authState?.idToken?.claims.name
        );
        if(ratingData[0]) {
          setUserRating(ratingData[0].rating);        
        };
      });
     }
    });
  }, [authState?.idToken?.claims.name, id, isRated]);



  const round = (num: number) => {
    const rounded = Math.round(num * 2) / 2;
    return rounded;
  };
  
  const addMovie = async (movie: MovieModel) => {

    if (authState && authState.isAuthenticated) {
      const url = `http://localhost:8080/api/movies/secure/add/movie`;
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authState.accessToken?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      };
      const addMovieResponse = await fetch(url, requestOptions);
      if (!addMovieResponse.ok) {
        throw new Error("Unable to add movie to the database.");
      }
  
      console.log("Movie added to database.")
    
  
    }
    
  }

  const validateMovie = async (ratingRequestData: RatingModel) => {
    console.log(ratingRequestData)   
    const response = await fetch(
    `http://www.localhost:8080/api/movies/${id}`
  )
  
  if(!response.ok) { 
    const movie = new MovieModel(movieObj.id, movieObj.title);    
    addMovie(movie)
    .then(() => (addRating(ratingRequestData)));  
  }

  if(response.ok) {
    addRating(ratingRequestData).then(()=>setUserRating(ratingRequestData.rating));   
  }
}


const addRating = async (data: RatingModel) => {
    if (authState && authState.isAuthenticated) {
    const url = `http://localhost:8080/api/ratings/secure/add/rating`;
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const addRatingResponse = await fetch(url, requestOptions);
    if (!addRatingResponse.ok) {
      throw new Error("Unable to add rating.");
    }  
    
    if (addRatingResponse.ok) {
      setIsRated(true);
      console.log("rating added");
    }           
  }
  
}
 

  function handleStarValue(value: number) {    
    console.log(value);  

    if(authState && authState.idToken){
    const { user_id, name, email } = authState.idToken.claims;
    const user = new UserModel(parseInt(user_id), name, email);  
    const movie = new MovieModel(movieObj.id, movieObj.title);   

    const ratingRequestData = new RatingModel(value, user, movie);
    validateMovie(ratingRequestData);
    }
     
  }

  

  const releaseDateConversion = (date: string) => {
    if(date){  
    const year = date.slice(0,4);   
    const month = date.slice(5,7);    
    const day = date.slice(8,11);
    date = (`${month}-${day}-${year}`)
    return date;
    } 
    return date;
  }
  const releaseDate = releaseDateConversion(movieObj.release_date);


  return (
    <>
      <div className="container-fluid  d-flex container mt-3 mb-5">
        <div className="movie-detail movie-container">
          <div className="movie_title">
            {movieObj ? movieObj.original_title : ""}
          </div>
          <div className="row">
          <div className="movie-info px-3">
            <div>
            <img
              className="w-100 rounded"              
              src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
              alt=""
            />
           
            <div className="movie-overview mt-2 w-100 ms-auto">
              <div className="pt-3 m-3">
                <h3 className="font-weight-bold text-decoration-underline">Movie Overview:</h3>
                {movieObj ? movieObj.overview : ""}
                <hr></hr>
                Release date:<p>{releaseDate}</p>
                <hr></hr>
                <div>
                Horror Scorer Rating <br></br>({ratingsArray.length} ratings):
                <StarsReview key={userRating} rating={compositeRating} size={32} />
                </div>
                <hr></hr>
               {!userRating && authState?.isAuthenticated &&
                  <div className="dropdown" style={{ cursor: "pointer" }}>
                    <h5
                      className="dropdown-toggle"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                    >
                      Rate this movie ?
                    </h5>
                    <ul
                      id="submitReviewRating"
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <button
                          onClick={() => handleStarValue(0)}
                          className="dropdown-item"
                        >
                          0
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleStarValue(0.5)}
                          className="dropdown-item"
                        >
                          0.5
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleStarValue(1)}
                          className="dropdown-item"
                        >
                          1
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleStarValue(1.5)}
                          className="dropdown-item"
                        >
                          1.5
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleStarValue(2)}
                          className="dropdown-item"
                        >
                          2
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleStarValue(2.5)}
                          className="dropdown-item"
                        >
                          2.5
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleStarValue(3)}
                          className="dropdown-item"
                        >
                          3
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleStarValue(3.5)}
                          className="dropdown-item"
                        >
                          3.5
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleStarValue(4)}
                          className="dropdown-item"
                        >
                          4
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleStarValue(4.5)}
                          className="dropdown-item"
                        >
                          4.5
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleStarValue(5)}
                          className="dropdown-item"
                        >
                          5
                        </button>
                      </li>
                    </ul>            
                                         
                  </div>
                 }
                 {userRating &&
                  <div>
                        Your Rating:
                        <StarsReview rating={userRating} size={32} />
                      </div>}
                    
                    <span>
                      <hr />
                    </span>
               
              </div>
            </div>
            </div>
          </div>
          </div>
        

        {authState?.isAuthenticated && (
          <div className="m-2 ms-lg-5">
            <ReviewForm
              movieObj={movieObj}
              isReviewed={isReviewed}
              setIsReviewed={setIsReviewed}
            />
          </div>
        )}

        <MovieReviews movieObj={movieObj} isReviewed={isReviewed} />
      </div>
      </div>
    </>
  );
};
