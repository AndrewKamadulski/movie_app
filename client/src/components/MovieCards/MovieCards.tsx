import { useState, useEffect } from "react";
import "./card.css";
import { Link } from "react-router-dom"
import { Pagination } from "../Pagination/Pagination";
import MovieObj from "../../Types/MovieObj";


export const MovieCards: React.FC<{  movieArr: MovieObj[], 
  setMovieArr: React.Dispatch<React.SetStateAction<MovieObj[]>>
}> = (props) => {
  const {  movieArr, setMovieArr } = props;

  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=8e8d1fb7683b829d728e204db461103b&page=${pageNumber}&language=en-US&sort_by=popularity.desc&with_genres=27`
    ).then(function (response) {
      response.json().then(function (data) {
        setMovieArr(data.results);
      });
    });
  }, [pageNumber, setMovieArr]);

  return (
    <>
      <div className="container-fluid card-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="mt-3">
              <div className="row">
                {movieArr.map((movie: MovieObj) => (
                  <div
                    key={movie.id.toString()}
                    className="col-md-6 col-lg-4 col-xl-3 d-flex"
                  >
                    <div className="movie-card card">
                      <div className="col-3">
                        <Link to={`/movie/` + movie.id}>
                          <img
                            id={(movie.id).toString()}
                            className="card-image"
                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container d-flex justify-content-center ">
        <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} />
      </div>
    </>
  );
};
