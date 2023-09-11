import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ReplyForm } from "../components/ReplyForm/ReplyForm";
import { useOktaAuth } from "@okta/okta-react";
export const SingleReview = () => {
    const reviewParam = useParams();
    const { authState } = useOktaAuth();
    const [singleMovieReviewData, setSingleMovieReviewData] = useState();
    const [isReplied, setIsReplied] = useState(false);
    useEffect(() => {
        fetch(`http://www.localhost:8080/api/reviews/${reviewParam.id}/movieId`).then(function (response) {
            response.json().then(function (data) {
                try {
                    const singleReview = [...data._embedded.reviews].filter((el) => el.id === parseInt(reviewParam.id));
                    console.log(singleReview);
                    setSingleMovieReviewData(singleReview);
                }
                catch {
                    console.error;
                }
            });
        });
    }, [isReplied, reviewParam.id]);
    return (_jsx(_Fragment, { children: _jsx("div", { className: "container pt-5", children: singleMovieReviewData && (_jsxs("div", { className: "p-3 single-review-container", children: [_jsxs("div", { className: "card single-review", children: [_jsx("div", { className: "column", children: _jsx("div", { className: "card-header", children: _jsxs("div", { className: " row", children: [_jsxs("div", { className: "col-12 col-md-5 ms-2", children: [_jsx(Link, { className: "text-decoration-none text-light", to: `/profile/` + singleMovieReviewData[0].userId.userName, children: singleMovieReviewData[0].userId.userName }), _jsxs("div", { children: [" ", _jsx(Link, { className: "text-decoration-none text-light", to: `/movie/` + singleMovieReviewData[0].movieId.id, children: singleMovieReviewData[0].movieId.title })] })] }), _jsx("div", { className: "col-12 col-md-6 text-end ms-auto" })] }) }) }), _jsxs("div", { className: "p-2 pb-0 text-dark", children: [singleMovieReviewData[0].reviewText, _jsx("hr", {}), singleMovieReviewData[0].replies.map((reply) => {
                                        return (_jsxs("div", { children: [_jsxs("div", { className: "ms-3 card-header text-light", children: [_jsx(Link, { className: "text-decoration-none text-light", to: `/profile/` + reply.userName, children: reply.userName }), " replied"] }), _jsxs("div", { className: "ms-5 my-2", children: [reply.replyText, _jsx("hr", {})] }, String(isReplied))] }));
                                    })] }, singleMovieReviewData[0].id)] }), authState?.isAuthenticated &&
                        _jsx(ReplyForm, { singleMovieReviewData: singleMovieReviewData, isReplied: isReplied, setIsReplied: setIsReplied })] })) }, String(isReplied)) }));
};
