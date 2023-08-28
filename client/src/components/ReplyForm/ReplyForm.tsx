import ReviewModel from "../../models/ReviewModel";
import { useOktaAuth } from '@okta/okta-react';
import "./replyform.css";


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

// const addReply = async (data) => {

//     if (authState && authState.isAuthenticated) {
//       const url = `http://localhost:8080/api/replies/secure/add/reply`;
//       const requestOptions = {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${authState.accessToken?.accessToken}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       };
//       const addReplyResponse = await fetch(url, requestOptions);
//       if (!addReplyResponse.ok) {
//         throw new Error("Unable to add reply to the database.");
//       }
  
//       console.log("reply added to database.")
  
//     }
    
//   }


export const ReplyForm = () => {
    return(
        <div className="text-dark">reply form</div>
    );
}