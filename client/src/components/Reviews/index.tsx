import { useEffect, useState } from "react"

export const Reviews = () => {  
    const [reviewData, setReviewData] = useState("");
   


    useEffect(() => {
        fetch(
            `http://www.localhost:8080/api/reviews/search/findByMovieId?movieId=1`
        ).then(function (response) {
          response.json().then(function (data) {
            setReviewData(data._embedded.reviews);
            console.log(reviewData)
           });
        });
    },[])  

     
 
    if(!reviewData.length) {
    return (
        <div>
            No Comments Yet
           </div>
    );
    } else {
        return (
            <div>Comments</div>
        );
    }
    
    

} 