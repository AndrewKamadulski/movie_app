import { useOktaAuth } from "@okta/okta-react";
import { MovieReviews } from "../components/MovieReviews/MovieReviews";
import { ReviewForm } from "../components/ReviewForm/ReviewForm";
import { useEffect,  useState } from "react";
import { useParams } from "react-router-dom";
import { StarsReview } from "../components/StarReview/StarReview";

export const SingleMovie: React.FC<{movieArr: unknown }> = (props) => {  
  const {id} = useParams();
  const [isReviewed, setIsReviewed] = useState(false);
  const [movieObj, setMovieObj] = useState({});
  const [compositeRating, setCompositeRating] = useState(0);
  const [userRating, setUserRating] =useState(0);
  const [ratingsArray, setRatingsArray] = useState([])
  const { authState } = useOktaAuth();
 

useEffect(()=>{  
 
const url = `https://api.themoviedb.org/3/movie/${id}language=en-US`;
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
    setMovieObj(data);
  });
});
}, [id]);
console.log(id)

useEffect(()=>{  
 
  const url = `http://www.localhost:8080/api/movies/${id}/ratings`;
  
  fetch(url)
  .then(function (response) {
    response.json().then(function (data) {    
    const tempArray = []     
    data._embedded.ratings.map(el => tempArray.push(el.rating))       
    const sum = tempArray.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    const average = sum / tempArray.length; 
    setRatingsArray(tempArray)    
    const roundedAvg = round(average);    
    setCompositeRating(roundedAvg);
    });
   
  });
  }, [id]);

  useEffect(()=>{
    const url = `http://www.localhost:8080/api/movies/${id}/ratings`;
    fetch(url).then(function (response) {
      response.json().then(function (data) {    
          const ratingData = data._embedded.ratings.filter((rating) => rating.userId.userName === authState?.idToken?.claims.name)
         setUserRating(ratingData[0].rating);
     
      });
     
    });
    },[authState?.idToken?.claims.name, id]);


  const round = (num) => {
    const rounded = Math.round(num *2)/2
  return rounded;
  }
  console.log(movieObj)

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
                Horror Scorer Rating <br></br>
                ({ratingsArray.length} ratings): 
                <StarsReview rating={compositeRating} size={32} />
                <hr></hr>
                <div>
                Your Rating: 
                <StarsReview rating={userRating} size={32} />
                </div>
                <span>
                  <hr />
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {authState?.isAuthenticated && 
          <div className="ms-4">
            <ReviewForm movieObj={movieObj} isReviewed={isReviewed} setIsReviewed={setIsReviewed} />
          </div>}
        
        <MovieReviews movieObj={movieObj} isReviewed={isReviewed} />
      </div>
    </>
  );
};
