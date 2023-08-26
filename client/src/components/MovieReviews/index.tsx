import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import MovieModel from "../../models/MovieModel";
import UserModel from "../../models/UserModel";
import ReviewModel from "../../models/ReviewModel";
import ReplyModel from "../../models/ReplyModel";
import { error } from "console";
import { useParams } from "react-router-dom";

export const MovieReviews:React.FC<{isReviewed: unknown}> = (props) => {

  const movie = useParams();

  


  const { movieObj, isReviewed} = props;
  const [reviewData, setReviewData] = useState([]);
  const { authState } = useOktaAuth();
  console.log(reviewData);
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

// const handleAddReply = async () => {

//   const userId = parseInt(authState.idToken.claims.user_id);
//   const userName = authState.idToken.claims.name;
//   const userEmail= authState.idToken.claims.email;

//   const user = new UserModel(userId, userName, userEmail);

//   const movie = new MovieModel(movieObj.id, movieObj.title);

//   const reviewText = " ";

//   const review = new ReviewModel(user, movie, reviewText, 10);

//   const replyText = "This is some test reply text";

//   const reply = new ReplyModel(userName, review, replyText);

//     addReply(reply);

// }




  useEffect(() => {
 
    fetch(
      `http://www.localhost:8080/api/reviews/search/findByMovieId?movieId=${parseInt(movie.id)}`
    ).then(function (response) {
      response.json().then(function (data) {
       try { 
        setReviewData(data._embedded.reviews);       
      } catch {
        console.error;
      }
      });
    });
  }, [isReviewed, movie.id]);


  if (!reviewData.length) {
    return (
      <div className="ms-3" key={Math.random()}>
        <h3>No Comments Yet</h3>      
      </div>
    );
  } else if(reviewData.length) {
    return (
      <div className="p-5" key={isReviewed}>                  
        {reviewData.map((review: any, index: number) => (
          
            <div className="py-2" key={review.id} >
              <div className="card">
                <div className="column">
                  <div className="card-header">
                    <div className=" row">
                      <div className="col-12 col-md-5 ms-2" onClick={(e)=>console.log(review.id)} datatype={review.id}>
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
          
        ))}
      </div>
    );
  }
};
