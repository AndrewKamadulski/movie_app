import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const Profile = () => {
    const {userName}= useParams();   
    const { authState } = useOktaAuth();
    const [profileUser, setProfileUser] = useState(); 


    let isSameUser = false; 
    if(authState && userName === authState.idToken?.claims.name) {
       isSameUser = true;
    }

    console.log(profileUser);

    useEffect(() => {
        fetch(
          `http://localhost:8080/api/users/search/findByUserName?userName=${userName}`
        ).then(function (response) {
          response.json().then(function (data) {
            try {           
             setProfileUser(data._embedded.users[0]);        
            } catch {
              console.error;
            }
          });
        });
      }, [userName]);

      if(!authState?.isAuthenticated ) {
        return (
          <h4 className="m-5">
            You must logged in to see this page. Use the navigation links above to sign up or log in!
          </h4>
        );
    } 
   
    return(
        <>
        <div>
            <div className="flex-row m-3 bg-black rounded">
            <h2 className="p-3 display-inline-block">
            {isSameUser ? "Your" : userName + "'s"} profile        
            </h2>
            </div>
        </div>
          <div className="flex-row justify-space-between mb-3">
          <div className="col-12 mb-3 col-lg-8">
    


        {profileUser && 
     <div className="p-4">
        {profileUser._embedded.reviews.map((review: any, index: number) => (
          <div className="py-1" key={review.id}>
            <Link
              className="text-decoration-none text-light"
              to={`/review/` + review.id}
            >
              <div className="card">
                <div className="column">
                  <div className="card-header">
                    <div className=" row">
                      <div
                        className="col-12 col-md-5 ms-2 "
                        datatype={review.id}
                      ><div>
                        <Link
                          className="text-decoration-none text-light"
                          to={`/movie/` + review.movieId.id}
                        >                       
                          {review.movieId.title}
                        </Link>
                        </div>
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
                  {review.replies.length} Replies: Click to{" "}
                  {review.replies.length > 0 ? "see" : "start"} the discussion!
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
}






    
        </div>
    
        <div className="col-12 col-lg-3 mb-3">
        friends
        </div>
        </div> 
        </>
    );
}