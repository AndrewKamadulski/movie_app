import { useOktaAuth } from "@okta/okta-react";
import { MovieReviews } from "../components/MovieReviews/MovieReviews";
import { ReviewForm } from "../components/ReviewForm/ReviewForm";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export const SingleMovie: React.FC<{movieArr: unknown }> = (props) => {  
  const movie = useParams();
  const [isReviewed, setIsReviewed] = useState(false);
  const [movieObj, setMovieObj] = useState({});
  const { authState } = useOktaAuth();


  useEffect(()=>{  
 
const url = `https://api.themoviedb.org/3/movie/${movie.id}language=en-US`;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZThkMWZiNzY4M2I4MjlkNzI4ZTIwNGRiNDYxMTAzYiIsInN1YiI6IjYzM2NlMDk0MDA2YjAxMDA3ZjI3ZDY5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GrI0N5JWVxdtzfmYZtq0occyJyllrY4zgg-2EENzrio'
  }
};

fetch(url, options)
.then(function (response) {
  response.json().then(function (data) {

    console.log(data);
    setMovieObj(data);
  });
});
}, [movie.id]);

console.log(movieObj);

  return (
    <>
      <div className="container-fluid mt-3 mb-5">
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
                <span>
                  <hr />
                </span>
              </div>
            </div>
          </div>
        </div>
        {authState?.isAuthenticated && <ReviewForm movieObj={movieObj} isReviewed={isReviewed} setIsReviewed={setIsReviewed} />}
        <MovieReviews movieObj={movieObj} isReviewed={isReviewed} />
      </div>
    </>
  );
};
