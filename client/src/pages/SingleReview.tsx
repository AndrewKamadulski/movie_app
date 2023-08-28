import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const SingleReview = () => {

    const review = useParams();

    const [singleMovieReviewData, setSingleMovieReviewData] = useState();
    const [replyData, setReplyData] = useState();

    useEffect(() => {
 
        fetch(
          `http://www.localhost:8080/api/reviews/${review.id}`
        ).then(function (response) {
          response.json().then(function (data) {
           try {             
            setSingleMovieReviewData(data);       
          } catch {
            console.error;
          }
          });
        });

         
        fetch(
            `http://www.localhost:8080/api/reviews/${review.id}/replies`
          ).then(function (response) {
            response.json().then(function (data) {
             try {             
              setReplyData(data);       
            } catch {
              console.error;
            }
            });
          });

      }, []);

      

      

      console.log(singleMovieReviewData)
      console.log(replyData)

    return(
        <div>
            hello 
        </div>
    );
}