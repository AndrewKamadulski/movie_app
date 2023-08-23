import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import MovieModel from "../../models/MovieModel";
import UserModel from "../../models/UserModel";
import ReviewModel from "../../models/ReviewModel";
import ReplyModel from "../../models/ReplyModel";

export const MovieReviews:React.FC<{movieObj: unknown}> = (props) => {
  const {movieObj} = props;
  const [reviewData, setReviewData] = useState([]);
  const { authState } = useOktaAuth();

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

const addReply = async (data) => {

  if (authState && authState.isAuthenticated) {
    const url = `http://localhost:8080/api/replies/secure/add/reply`;
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const addReplyResponse = await fetch(url, requestOptions);
    if (!addReplyResponse.ok) {
      throw new Error("Unable to add reply to the database.");
    }

    console.log("reply added to database.")

  }
  
}

const handleAddReply = async () => {

  const userId = parseInt(authState.idToken.claims.user_id);
  const userName = authState.idToken.claims.name;
  const userEmail= authState.idToken.claims.email;

  const user = new UserModel(userId, userName, userEmail);

  const movie = new MovieModel(movieObj.id, movieObj.title);

  const reviewText = " ";

  const review = new ReviewModel(user, movie, reviewText, 10);

  const replyText = "This is some test reply text";

  const reply = new ReplyModel(userName, review, replyText);

  addReply(reply);

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
      </div>
    );
  } else {
    return (
      <div className="p-5">               
        {reviewData.map((review: any) => (
          <>
            <div className="py-2" key={review.id} >
              <div className="card">
                <div className="column">
                  <div className="card-header">
                    <div className=" row">
                      <div className="col-12 col-md-5 ms-2" onClick={(e)=>console.log(e.target)} datatype={review.id}>
                        {review.userId.userName}
                      </div>
                      <div className="col-12 col-md-6 text-end ms-auto">
                        {review.createdAt.substring(0, 10)} @{" "}
                        {review.createdAt.substring(11, 19)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-2 text-dark" key={review.id}>
                  {review.reviewText}
                  <hr />
                  {review.replies.map((reply: any) => {
                    return (
                      <>
                      <div>
                        <div className="column text-light"  >
                          <div className="card-header">
                            <div className=" row">
                              <div className="col-12 col-md-5 ms-2" >
                                {reply.userName} replied
                              </div>                              
                            </div>
                          </div>
                       
                        </div>
                        

                        <div>
                          {reply.replyText}
                          <hr />
                        </div>
                        </div>
                      </>
                    );
                  })}
                </div>
                <button className="btn btn-lg btn-primary" datatype={review.id} onClick={()=>{handleAddReply()}}>add reply</button>
              </div>
              
            </div>
          </>
        ))}
      </div>
    );
  }
};
