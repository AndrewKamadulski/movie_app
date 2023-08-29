import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReplyForm } from "../components/ReplyForm/ReplyForm";
import { useOktaAuth } from "@okta/okta-react";

export const SingleReview = () => {
  const reviewParam = useParams(); 
  const { authState } = useOktaAuth();


  const [singleMovieReviewData, setSingleMovieReviewData] = useState();
  const [isReplied, setIsReplied] = useState(false);


  useEffect(() => {
    fetch(
      `http://www.localhost:8080/api/reviews/${reviewParam.id}/movieId`
    ).then(function (response) {
      response.json().then(function (data) {
        try {
             const singleReview = [...data._embedded.reviews].filter(
            (el) => el.id === parseInt(reviewParam.id)
          );

          setSingleMovieReviewData(singleReview);
        } catch {
          console.error;
        }
      });
    });
  }, [isReplied, reviewParam.id]);

  return (
    <>    
    <div className="review-container" key={isReplied}>        
      {singleMovieReviewData && (
        <div className="p-3" >
          <div className="card single-review">
            <div className="column">
              <div className="card-header">
                <div className=" row">
                  <div className="col-12 col-md-5 ms-2">
                    {singleMovieReviewData[0].userId.userName} on{" "}
                    {singleMovieReviewData[0].movieId.title}
                  </div>
                  <div className="col-12 col-md-6 text-end ms-auto">
                    {/* {review.createdAt.substring(0, 10)} @{" "}
                        {review.createdAt.substring(11, 19)} */}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="p-2 pb-0 text-dark"
              key={singleMovieReviewData[0].id}
            >
              {singleMovieReviewData[0].reviewText}
              <hr />
              {singleMovieReviewData[0].replies.map((reply) => {
                return (
                  <div>
                    <div className="ms-3 card-header text-light">
                      {reply.userName}
                      {" replied"}
                    </div>
                    <div className="ms-5 my-2" key={isReplied}>{reply.replyText}</div>
                  </div>
                );
              })}
            </div>
          </div>
          {authState?.isAuthenticated && 
          <ReplyForm 
          singleMovieReviewData={singleMovieReviewData} 
          isReplied={isReplied}
          setIsReplied={setIsReplied}
          /> }        
        </div>
      )}
  
    </div>
    
    </>
  );
};

