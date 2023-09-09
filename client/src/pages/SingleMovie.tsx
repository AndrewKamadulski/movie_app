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
  const [movieObj, setMovieObj] = useState({});
  const [compositeRating, setCompositeRating] = useState(0);
  const [userRating, setUserRating] = useState();
  const [ratingsArray, setRatingsArray] = useState([]);   
  const [isRated, setIsRated] = useState(false);
  const { authState } = useOktaAuth();  




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
      });
    });
  }, [id]);

  useEffect(() => {
    const url = `http://www.localhost:8080/api/movies/${id}/ratings`;
    fetch(url).then(function (response) {
      response.json().then(function (data) {
        const ratingData = data._embedded.ratings.filter(
          (rating) => rating.userId.userName === authState?.idToken?.claims.name
        );
        if(ratingData[0]) {
          setUserRating(ratingData[0].rating);
          setIsRated(true);
        };
      });
    });
  }, [authState?.idToken?.claims.name, id, userRating]);

  const round = (num) => {
    const rounded = Math.round(num * 2) / 2;
    return rounded;
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


  const validateMovie = async (ratingRequestData) => { 
    await fetch(
    `http://www.localhost:8080/api/movies/${id}`
  )
  
  if(!validateMovie.ok) { 
    const movie = new MovieModel(movieObj.id, movieObj.title);    
    addMovie(movie).then(addRating(ratingRequestData));   
  }

  if(validateMovie.ok) {
    addRating(ratingRequestData)   
  }
}


 

  function handleStarValue(value: number) {

    
    console.log(value);
    

    const { user_id, name, email } = authState?.idToken?.claims;
    const user = new UserModel(parseInt(user_id), name, email);  
    const movie = new MovieModel(movieObj.id, movieObj.title);   

    const ratingRequestData = new RatingModel(value, user, movie);
    validateMovie(ratingRequestData);
  
    console.log(ratingRequestData)
   
  }

  const addRating = async (data) => {
    console.log(data.rating)

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
  
      
      setUserRating(data.rating);  
    }
    
  }



  return (
    <>
      <div className="container-fluid container mt-3 mb-5">
        <div className="movie-detail">
          <div className="movie_title">
            {movieObj ? movieObj.original_title : ""}
          </div>
          <div className="movie-info px-3">
            <img
              className="movie-backdrop"
              src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
              alt=""
            />
            <div className="movie-overview">
              <div>
                <h3 className="font-weight-bold">Movie Overview:</h3>
                {movieObj ? movieObj.overview : ""}
                <span>
                  <hr />
                </span>
                Release date:<p>{movieObj.release_date}</p>
                <div key={userRating}>
                Horror Scorer Rating <br></br>({ratingsArray.length} ratings):
                <StarsReview rating={compositeRating} size={32} />
                </div>
                <hr></hr>
               {!isRated &&
                  <div className="dropdown" style={{ cursor: "pointer" }}>
                    <h5
                      className="dropdown-toggle"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                    >
                      Leave a review ?
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
                 {isRated &&
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

        {authState?.isAuthenticated && (
          <div className="ms-4">
            <ReviewForm
              movieObj={movieObj}
              isReviewed={isReviewed}
              setIsReviewed={setIsReviewed}
            />
          </div>
        )}

        <MovieReviews movieObj={movieObj} isReviewed={isReviewed} />
      </div>
    </>
  );
};
