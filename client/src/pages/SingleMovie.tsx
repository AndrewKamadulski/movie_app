import { useOktaAuth } from "@okta/okta-react";
import { MovieReviews } from "../components/MovieReviews";
import { ReviewForm } from "../components/ReviewForm/ReviewForm";
import { useState } from "react";

export const SingleMovie: React.FC<{ movieObj: unknown }> = (props) => {
  const { movieObj } = props;
  console.log(movieObj);

  const [isReviewed, setIsReviewed] = useState(false);

  const { authState } = useOktaAuth();

  // if(!movieObj.id) {
  //   window.location.assign("/");
  // }

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
        {authState?.isAuthenticated && !isReviewed && <ReviewForm movieObj={movieObj} isReviewed={isReviewed} setIsReviewed={setIsReviewed}/>}
        <MovieReviews movieObj={movieObj} isReviewed={isReviewed} />
      </div>
    </>
  );
};
