import ReviewModel from "../../models/ReviewModel";
import { useOktaAuth } from '@okta/okta-react';
import "./replyform.css";
import UserModel from "../../models/UserModel";
import MovieModel from "../../models/MovieModel";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import ReplyModel from "../../models/ReplyModel";
import Review from "../../Types/Review";



export const ReplyForm: React.FC<{ singleMovieReviewData: Review[], isReplied: boolean, setIsReplied:React.Dispatch<React.SetStateAction<boolean>> }> = (props) => {
  const {singleMovieReviewData, isReplied, setIsReplied} = props;
 

  const { authState } = useOktaAuth();

  const [Text, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [error] = useState(false); 

  const handleChange:ChangeEventHandler<HTMLTextAreaElement> = e => {
    if (e.target.value.length <= 280) {
      setText(e.target.value);
      setCharacterCount(e.target.value.length);
    }
  };

const handleAddReply:MouseEventHandler<HTMLButtonElement> = async e => {
  e.preventDefault();
  const userId = parseInt(authState.idToken.claims.user_id);
  const userName = authState.idToken.claims.name;
  const userEmail= authState.idToken.claims.email;
  const reviewText = " ";

  const user = new UserModel(userId, userName, userEmail);
  const movie = new MovieModel(singleMovieReviewData[0].movieId.id, singleMovieReviewData[0].movieId.title);
  const review = new ReviewModel(user, movie, reviewText, singleMovieReviewData[0].id);

  const replyText = Text;

  const reply = new ReplyModel(userName, review, replyText);

    addReply(reply);
    setText('');
    setCharacterCount(0);
}

const addReply = async (data: ReplyModel) => {

    if (authState && authState.isAuthenticated && Text.length > 3) {
      const url = `http://localhost:8080/api/replies/secure/add/reply`;
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authState.accessToken?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const addReplyResponse = await fetch(url, requestOptions);
      if (!addReplyResponse.ok) {
        throw new Error("Unable to add reply to the database.");
      }
  
      console.log("reply added to database.")
      setIsReplied(!isReplied);
  
    }
    
  }

  return(  
    <div>              
        <div className='my-3'>
                    <p className={`m-1 ${characterCount === 280 || error ? 'text-error' : ''}`}>
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
        </p>
        <form className="flex-row justify-center justify-space-between-md align-stretch">
            <textarea
            placeholder="Leave a Comment..."
            value={Text}
            className="form-input col-12 col-md-9 m-1"
            onChange={handleChange}
            ></textarea>
            <div className='my-1 mx-2'>
            <button className="btn col-1 btn-dark w-100" type="submit" onClick={handleAddReply}>
            Submit
            </button>
            </div>
        </form>
        </div>
  

    </div>
);
}