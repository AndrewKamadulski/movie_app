import { setState, useState, useEffect} from "react";
import "./card.css";

export const MovieCards = () => {
  const [movieArr, setMovieArr] = useState([]);
  const [movieObj, setMovieObj] = useState({});

  const singleMovie = function (e) {    
    const obj = movieArr.find((o) => o.id === parseInt(e.target.id));
    setMovieObj(obj);
    console.log(movieObj); 
  };
  


  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=8e8d1fb7683b829d728e204db461103b&page=&language=en-US&sort_by=popularity.desc&with_genres=27`
    ).then(function (response) {
      response.json().then(function (data) {
        setMovieArr(data.results);
       });
    });
},[movieArr])
 


  return (
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
                      onClick={singleMovie}
                      
                      className="col-3 p-2"
                    >
                      <img
                        id={movie.id}
                        style={{ height: 400 }}
                        src = {`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
