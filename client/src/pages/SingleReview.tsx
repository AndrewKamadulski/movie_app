import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const SingleReview = () => {

    const reviewParam = useParams();

    const [singleMovieReviewData, setSingleMovieReviewData] = useState();


    useEffect(() => {
 
            fetch(
            `http://www.localhost:8080/api/reviews/${reviewParam.id}/movieId`
          ).then(function (response) {
            response.json().then(function (data) {
             try {                     
            const singleReview = [...data._embedded.reviews].filter((el)=> el.id === parseInt(reviewParam.id));                  
            setSingleMovieReviewData(singleReview);    
            console.log(singleMovieReviewData);  
          
             
          
            } catch {
              console.error;
            }
            });
          });

      }, []);
      

    

    


    return(
        <div>

            
























                        {/* {review.replies.map((reply: any) => {
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
                  })} */}
                  
        </div>
    );
}