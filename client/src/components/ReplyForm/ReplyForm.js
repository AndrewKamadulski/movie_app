import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ReviewModel from "../../models/ReviewModel";
import { useOktaAuth } from '@okta/okta-react';
import "./replyform.css";
import UserModel from "../../models/UserModel";
import MovieModel from "../../models/MovieModel";
import { useState } from "react";
import ReplyModel from "../../models/ReplyModel";
export const ReplyForm = (props) => {
    const { singleMovieReviewData, isReplied, setIsReplied } = props;
    const { authState } = useOktaAuth();
    const [Text, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [error] = useState(false);
    const handleChange = e => {
        if (e.target.value.length <= 280) {
            setText(e.target.value);
            setCharacterCount(e.target.value.length);
        }
    };
    const handleAddReply = async (e) => {
        e.preventDefault();
        const userId = parseInt(authState.idToken.claims.user_id);
        const userName = authState.idToken.claims.name;
        const userEmail = authState.idToken.claims.email;
        const reviewText = " ";
        const user = new UserModel(userId, userName, userEmail);
        const movie = new MovieModel(singleMovieReviewData[0].movieId.id, singleMovieReviewData[0].movieId.title);
        const review = new ReviewModel(user, movie, reviewText, singleMovieReviewData[0].id);
        const replyText = Text;
        const reply = new ReplyModel(userName, review, replyText);
        addReply(reply);
        setText('');
        setCharacterCount(0);
    };
    const addReply = async (data) => {
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
            console.log("reply added to database.");
            setIsReplied(!isReplied);
        }
    };
    return (_jsx("div", { children: _jsxs("div", { className: 'my-3', children: [_jsxs("p", { className: `m-1 ${characterCount === 280 || error ? 'text-error' : ''}`, children: ["Character Count: ", characterCount, "/280", error && _jsx("span", { className: "ml-2", children: "Something went wrong..." })] }), _jsxs("form", { className: "flex-row justify-center justify-space-between-md align-stretch", children: [_jsx("textarea", { placeholder: "Leave a Comment...", value: Text, className: "form-input col-12 col-md-9 m-1", onChange: handleChange }), _jsx("div", { className: 'my-1 mx-2', children: _jsx("button", { className: "btn col-1 btn-dark w-100", type: "submit", onClick: handleAddReply, children: "Submit" }) })] })] }) }));
};
