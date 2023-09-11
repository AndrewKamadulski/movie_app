import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
export const MovieReviews = (props) => {
    const movie = useParams();
    const { isReviewed } = props;
    const [reviewData, setReviewData] = useState([]);
    const { authState } = useOktaAuth();
    useEffect(() => {
        fetch(`http://www.localhost:8080/api/reviews/search/findByMovieId?movieId=${parseInt(movie.id)}`)
            .then(function (response) {
            response.json().then(function (data) {
                try {
                    setReviewData(data._embedded.reviews);
                }
                catch {
                    console.error;
                }
            });
        });
    }, [isReviewed, movie.id]);
    if (reviewData.length === 0) {
        return (_jsx("div", { className: "ms-3", children: _jsx("h3", { children: "No Comments Yet" }) }, (!isReviewed).toString()));
    }
    else {
        return (_jsx("div", { className: "p-4", children: reviewData.map((review) => (_jsx("div", { className: "py-1", children: _jsx(Link, { className: "text-decoration-none text-light", to: `/review/` + review.id, children: _jsxs("div", { className: "card", children: [_jsx("div", { className: "column", children: _jsx("div", { className: "card-header", children: _jsxs("div", { className: " row", children: [_jsx("div", { className: "col-12 col-md-5 ms-2 ", datatype: (review.id).toString(), children: _jsxs(Link, { className: "text-decoration-none text-light", to: `/profile/` + review.userId.userName, children: [" ", review.userId.userName] }) }), _jsxs("div", { className: "col-12 col-md-6 text-end ms-auto", children: [review.createdAt.substring(0, 10), " @", " ", review.createdAt.substring(11, 19)] })] }) }) }), _jsxs("div", { className: "p-2 pb-0 text-dark", children: [review.reviewText, _jsx("hr", {})] }, review.id), _jsxs("p", { className: "ms-2 text-dark", children: [review.replies.length, " Replies: Click to", " ", review.replies.length < 1 && !authState?.isAuthenticated ? "start" : "see", " the discussion!"] })] }) }) }, review.id))) }, (!isReviewed).toString()));
    }
};
