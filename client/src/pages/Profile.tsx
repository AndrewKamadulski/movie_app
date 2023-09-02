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

   try{ console.log(profileUser._embedded.friends);} catch{console.log("caught")}

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
          <div className="text-danger"style={{height:500}}>
          <h4 className="m-5">
            You must logged in to see this page. Use the navigation links above to sign up or log in!
          </h4>
          </div>
        );
    } 
   
    return(
        <>
        <div>
            <div className="m-3 bg-red rounded">
            <h2 className="p-3">
            {isSameUser ? "Your" : userName + "'s"} profile        
            </h2>
            {!isSameUser && <button className="">Add Friend</button>}
            </div>
        </div>
          <div className="mb-3 row profile-container">          
          <div className="col-12 mb-3 col-lg-8"> 
        {profileUser && 
     <div className="p-4">
        {profileUser._embedded.reviews && profileUser._embedded.reviews.map((review: any, index: number) => (
          <div className="py-1" key={review.id}>
            <Link
              className="text-decoration-none text-light"
              to={`/review/` + review.id}
            >
              <div className="card">
                <div className="column">
                  <div className="card-header bg-red">
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
        <div className="col-12 col-lg-3 w-25">
        <div className="bg-red rounded mt-5">    
        <h4>{isSameUser ? "Your" : userName + "'s"}  friends</h4>
      </div>   
      <div className="bg-light rounded">
      {profileUser && profileUser._embedded.friends.map(friend => (
        <button className="btn w-100 display-block mb-2" key={friend.friendId.id}>
          <Link className="text-decoration-none text-dark fs-3" to={`/profile/${friend.friendId.userName}`}>{friend.friendId.userName}</Link>
        </button>        
      ))}
    </div>

        </div>
        </div>
   
        </>
    );
}