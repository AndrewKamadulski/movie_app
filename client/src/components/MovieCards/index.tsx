import { setState, useState, useEffect} from "react";
import "./card.css";
import { Link } from "react-router-dom";
import { Pagination } from "../Pagination/Pagination";


export const MovieCards: React.FC<{movieObj: unknown, setMovieObj: React.Dispatch<React.SetStateAction<unknown>>}> = (props) => {
  const {movieObj, setMovieObj} = props;
  const [movieArr, setMovieArr] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const setSingleMovie = function (e) {    
    const obj = movieArr.find((o) => o.id === parseInt(e.target.id));
    setMovieObj(obj);
    console.log(movieObj); 
  };
  


  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=8e8d1fb7683b829d728e204db461103b&page=${pageNumber}&language=en-US&sort_by=popularity.desc&with_genres=27`
    ).then(function (response) {
      response.json().then(function (data) {
        setMovieArr(data.results);
       });
    });
},[pageNumber])
 


  return (
    <>
    <div className="container-fluid card-container">
      <div className="row">
        <div className="col-lg-12">
          <div className="mt-3">
            <div className="row">
              {movieArr.map((movie) => (
                <div
                  key={movie.id.toString()}
                  className="col-md-6 col-lg-4 col-xl-3 d-flex"
                >
                  <div className="movie-card card">
                    <div
                      onClick={setSingleMovie}
                      
                      className="col-3"
                    >
                      <Link to="/Movie">
                      <img
                        id={movie.id}
                        className="card-image"
                        src = {`https://image.tmdb.org/t/p/original${movie.poster_path}`}
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
    <Pagination  pageNumber={pageNumber} setPageNumber={setPageNumber}/>  
    </div>
    </>
  );
};
