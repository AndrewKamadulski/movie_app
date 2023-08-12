import { useEffect, useState } from "react";

export const MovieReviews = () => {
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    fetch(
      `http://www.localhost:8080/api/reviews/search/findByMovieId?movieId=2`
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
