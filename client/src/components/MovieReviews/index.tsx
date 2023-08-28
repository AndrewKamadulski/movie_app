import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import MovieModel from "../../models/MovieModel";
import UserModel from "../../models/UserModel";
import ReviewModel from "../../models/ReviewModel";
import ReplyModel from "../../models/ReplyModel";
import { error } from "console";
import { Link, useParams } from "react-router-dom";
import { ReplyForm } from "../ReplyForm/ReplyForm";

export const MovieReviews:React.FC<{isReviewed: unknown}> = (props) => {

  const movie = useParams();

  


  const { movieObj, isReviewed} = props;
  const [reviewData, setReviewData] = useState([]);
  const { authState } = useOktaAuth();




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
      <div className="ms-3" key={isReviewed}>
        <h3>No Comments Yet</h3>      
      </div>
    );
  } else if(reviewData.length) {
    return (
      <div className="p-4" key={isReviewed}>                  
        {reviewData.map((review: any, index: number) => (
          
            <div className="py-1" key={review.id}>
             <Link className="text-decoration-none text-light" to={`/review/` + review.id}>
              <div className="card"  onClick={(e)=>console.log(review.id)}>
                <div className="column">
                  <div className="card-header">
                    <div className=" row">
                      <div className="col-12 col-md-5 ms-2" datatype={review.id}>
                        {review.userId.userName}
                      </div>
                      <div className="col-12 col-md-6 text-end ms-auto">
                        {review.createdAt.substring(0, 10)} @{" "}
                        {review.createdAt.substring(11, 19)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-2 pb-0 text-dark" key={review.id}>
                  {review.reviewText}
                  <hr />
    
                </div>
                <p className="ms-2 text-dark">
                {review.replies.length}{' '} Replies:  Click to{' '}
                    {review.replies.length > 0 ? 'see' : 'start'} the discussion!
                  </p>
                
                {/* <button className="btn btn-primary m-auto" style={{width:150}} datatype={review.id} onClick={()=>{handleAddReply()}}>Submit</button>
                <ReplyForm /> */}
              </div>
              </Link>
            </div>

          
        ))}
      </div>
    );
  }
};
