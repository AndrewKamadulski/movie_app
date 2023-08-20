import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import MovieModel from "../../models/MovieModel";
import UserModel from "../../models/UserModel";
import ReviewModel from "../../models/ReviewModel";

export const MovieReviews:React.FC<{movieObj: unknown, setMovieObj: React.Dispatch<React.SetStateAction<unknown>>}> = (props) => {
  const {movieObj, setMovieObj} = props;
  const [reviewData, setReviewData] = useState([]);
  const { authState } = useOktaAuth();
  console.log(authState.idToken.claims.user_id);



  

  const handleAddComment = async () => {


    const userId = parseInt(authState.idToken.claims.user_id);
    const userName = authState.idToken.claims.name;
    const userEmail= authState.idToken.claims.email;

    const user = new UserModel(userId, userName, userEmail);

    const movie = new MovieModel(movieObj.id, movieObj.title);

    const reviewText = "this is some test text";

    const review = new ReviewModel(user, movie, reviewText);



    const validateMovie = await fetch(
      `http://www.localhost:8080/api/movies/${movieObj.id}`
    )
    
    if(!validateMovie.ok) {     
      
      addMovie(movie).then(()=> addReview(review));
      console.log(movie);
    }


    if(validateMovie.ok) {
      addReview(review);
    }


  



  }





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
      throw new Error("Something went wrong");
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
    const addMovieResponse = await fetch(url, requestOptions);
    if (!addMovieResponse.ok) {
      throw new Error("Something went wrong");
    }

    console.log("Review added to database.")

  }
  
}




  useEffect(() => {


    fetch(
      `http://www.localhost:8080/api/reviews/search/findByMovieId?movieId=${movieObj.id}`
    ).then(function (response) {
      response.json().then(function (data) {
        setReviewData(data._embedded.reviews);
      });
    });
  }, []);

  if (!reviewData.length) {
    return (
      <div>
        <h3>No Comments Yet</h3>
        <button onClick={()=>handleAddComment()}className="btn btn-primary text-light fs-1" style={{height: 50, width: 400}}>Hit me!</button>
      </div>
    );
  } else {
    return (
      <div className="p-5">
        
        {reviewData.map((review) => (
          <>
            {" "}
            <div className="py-2" key={review.id}>
              <div className="card">
                <div className="column">
                  <div className="card-header">
                    <div className=" row">
                      <div className="col-12 col-md-5 ms-2">
                        {review.userId.userName}
                      </div>
                      <div className="col-12 col-md-6 text-end ms-auto">
                        {review.createdAt.substring(0, 10)} @{" "}
                        {review.createdAt.substring(11, 19)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-2 text-dark">
                  {review.reviewText}
                  <hr />
                  {review.replies.map((reply) => {
                    return (
                      <>
                        <div className="column text-light">
                          <div className="card-header">
                            <div className=" row">
                              <div className="col-12 col-md-5 ms-2 ">
                                {reply.userName} replied
                              </div>
                              <div className="col-12 col-md-6 text-end ms-auto"></div>
                            </div>
                          </div>
                        </div>

                        <div className="text-light card-header">
                          {reply.replyText}
                          <hr />
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    );
  }
};
