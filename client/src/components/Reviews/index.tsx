import { useEffect, useState } from "react"

export const Reviews = () => {  
    const [reviewData, setReviewData] = useState([]);
   


    useEffect(() => {
        fetch(
            `http://www.localhost:8080/api/reviews/search/findByMovieId?movieId=1`
        ).then(function (response) {
          response.json().then(function (data) {
            console.log(data._embedded.reviews)
            setReviewData(data._embedded.reviews)
            reviewData.map(review => console.log(review))
          
           });
        });
    },[])  

     
 
    if(!reviewData.length) {
    return (
        <div>
            <h3>No Comments Yet</h3>
           </div>
    );
    } else {
        return (
            <div className="p-5">
                {reviewData.map( review => (
                    <>
                    <hr/>
                    <div className="p-2">{review.userId.userName}</div>
                    <div className="p-2">{review.movieId.title}</div>
                    <div className="p-2">{review.reviewText}</div>
                    </>
                ))}
               
                
        </div>
        );
    }
}