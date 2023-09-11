import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useOktaAuth } from "@okta/okta-react";
import { MovieReviews } from "../components/MovieReviews/MovieReviews";
import { ReviewForm } from "../components/ReviewForm/ReviewForm";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StarsReview } from "../components/StarReview/StarReview";
import UserModel from "../models/UserModel";
import MovieModel from "../models/MovieModel";
import RatingModel from "../models/RatingModel";
export const SingleMovie = () => {
    const { id } = useParams();
    const [isReviewed, setIsReviewed] = useState(false);
    const [isRated, setIsRated] = useState(false);
    const [compositeRating, setCompositeRating] = useState(0);
    const [userRating, setUserRating] = useState(0);
    const [ratingsArray, setRatingsArray] = useState([]);
    const { authState } = useOktaAuth();
    const [movieObj, setMovieObj] = useState({
        adult: false,
        backdrop_path: "",
        genre_ids: [0],
        id: 0,
        original_language: "",
        original_title: "",
        overview: "",
        popularity: 0,
        poster_path: "",
        release_date: "",
        title: "",
        video: false,
        vote_average: 0,
        vote_count: 0,
    });
    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/${id}language=en-US`;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZThkMWZiNzY4M2I4MjlkNzI4ZTIwNGRiNDYxMTAzYiIsInN1YiI6IjYzM2NlMDk0MDA2YjAxMDA3ZjI3ZDY5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GrI0N5JWVxdtzfmYZtq0occyJyllrY4zgg-2EENzrio",
            },
        };
        fetch(url, options).then(function (response) {
            response.json().then(function (data) {
                setMovieObj(data);
            });
        });
    }, [id]);
    useEffect(() => {
        const url = `http://www.localhost:8080/api/movies/${id}/ratings`;
        fetch(url).then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    const tempArray = [];
                    data._embedded.ratings.map((el) => tempArray.push(el.rating));
                    const sum = tempArray.reduce((accumulator, currentValue) => {
                        return accumulator + currentValue;
                    }, 0);
                    const average = sum / tempArray.length;
                    setRatingsArray(tempArray);
                    const roundedAvg = round(average);
                    setCompositeRating(roundedAvg);
                    const ratingData = data._embedded.ratings.filter((rating) => rating.userId.userName === authState?.idToken?.claims.name);
                    if (ratingData[0]) {
                        setUserRating(ratingData[0].rating);
                    }
                });
            }
        });
    }, [authState?.idToken?.claims.name, id, isRated]);
    const round = (num) => {
        const rounded = Math.round(num * 2) / 2;
        return rounded;
    };
    const addMovie = async (movie) => {
        if (authState && authState.isAuthenticated) {
            const url = `http://localhost:8080/api/movies/secure/add/movie`;
            const requestOptions = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(movie),
            };
            const addMovieResponse = await fetch(url, requestOptions);
            if (!addMovieResponse.ok) {
                throw new Error("Unable to add movie to the database.");
            }
            console.log("Movie added to database.");
        }
    };
    const validateMovie = async (ratingRequestData) => {
        const response = await fetch(`http://www.localhost:8080/api/movies/${id}`);
        if (!response.ok) {
            const movie = new MovieModel(movieObj.id, movieObj.title);
            addMovie(movie)
                .then(() => (addRating(ratingRequestData)));
        }
        if (response.ok) {
            addRating(ratingRequestData).then(() => setUserRating(ratingRequestData.rating));
        }
    };
    const addRating = async (data) => {
        if (authState && authState.isAuthenticated) {
            const url = `http://localhost:8080/api/ratings/secure/add/rating`;
            const requestOptions = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            };
            const addRatingResponse = await fetch(url, requestOptions);
            if (!addRatingResponse.ok) {
                throw new Error("Unable to add rating.");
            }
            if (addRatingResponse.ok) {
                setIsRated(true);
                console.log("rating added");
            }
        }
    };
    function handleStarValue(value) {
        if (authState && authState.idToken) {
            const { user_id, name, email } = authState.idToken.claims;
            const user = new UserModel(parseInt(user_id), name, email);
            const movie = new MovieModel(movieObj.id, movieObj.title);
            const ratingRequestData = new RatingModel(value, user, movie);
            validateMovie(ratingRequestData);
        }
    }
    const releaseDateConversion = (date) => {
        if (date) {
            const year = date.slice(0, 4);
            const month = date.slice(5, 7);
            const day = date.slice(8, 11);
            date = (`${month}-${day}-${year}`);
            return date;
        }
        return date;
    };
    const releaseDate = releaseDateConversion(movieObj.release_date);
    return (_jsx(_Fragment, { children: _jsx("div", { className: "container-fluid  d-flex container mt-3 mb-5", children: _jsxs("div", { className: "movie-detail movie-container", children: [_jsx("div", { className: "movie_title", children: movieObj ? movieObj.original_title : "" }), _jsx("div", { className: "row", children: _jsx("div", { className: "movie-info px-3", children: _jsxs("div", { children: [_jsx("img", { className: "w-100 rounded", src: `https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`, alt: "" }), _jsx("div", { className: "movie-overview mt-2 w-100 ms-auto", children: _jsxs("div", { className: "pt-3 m-3", children: [_jsx("h3", { className: "font-weight-bold text-decoration-underline", children: "Movie Overview:" }), movieObj ? movieObj.overview : "", _jsx("hr", {}), "Release date:", _jsx("p", { children: releaseDate }), _jsx("hr", {}), _jsxs("div", { children: ["Horror Scorer Rating ", _jsx("br", {}), "(", ratingsArray.length, " ratings):", _jsx(StarsReview, { rating: compositeRating, size: 32 }, userRating)] }), _jsx("hr", {}), !userRating && authState?.isAuthenticated &&
                                                    _jsxs("div", { className: "dropdown", style: { cursor: "pointer" }, children: [_jsx("h5", { className: "dropdown-toggle", id: "dropdownMenuButton1", "data-bs-toggle": "dropdown", children: "Rate this movie ?" }), _jsxs("ul", { id: "submitReviewRating", className: "dropdown-menu", "aria-labelledby": "dropdownMenuButton1", children: [_jsx("li", { children: _jsx("button", { onClick: () => handleStarValue(0), className: "dropdown-item", children: "0" }) }), _jsx("li", { children: _jsx("button", { onClick: () => handleStarValue(0.5), className: "dropdown-item", children: "0.5" }) }), _jsx("li", { children: _jsx("button", { onClick: () => handleStarValue(1), className: "dropdown-item", children: "1" }) }), _jsx("li", { children: _jsx("button", { onClick: () => handleStarValue(1.5), className: "dropdown-item", children: "1.5" }) }), _jsx("li", { children: _jsx("button", { onClick: () => handleStarValue(2), className: "dropdown-item", children: "2" }) }), _jsx("li", { children: _jsx("button", { onClick: () => handleStarValue(2.5), className: "dropdown-item", children: "2.5" }) }), _jsx("li", { children: _jsx("button", { onClick: () => handleStarValue(3), className: "dropdown-item", children: "3" }) }), _jsx("li", { children: _jsx("button", { onClick: () => handleStarValue(3.5), className: "dropdown-item", children: "3.5" }) }), _jsx("li", { children: _jsx("button", { onClick: () => handleStarValue(4), className: "dropdown-item", children: "4" }) }), _jsx("li", { children: _jsx("button", { onClick: () => handleStarValue(4.5), className: "dropdown-item", children: "4.5" }) }), _jsx("li", { children: _jsx("button", { onClick: () => handleStarValue(5), className: "dropdown-item", children: "5" }) })] })] }), userRating &&
                                                    _jsxs("div", { children: ["Your Rating:", _jsx(StarsReview, { rating: userRating, size: 32 })] }), _jsx("span", { children: _jsx("hr", {}) })] }) })] }) }) }), authState?.isAuthenticated && (_jsx("div", { className: "m-2 ms-lg-5", children: _jsx(ReviewForm, { movieObj: movieObj, isReviewed: isReviewed, setIsReviewed: setIsReviewed }) })), _jsx(MovieReviews, { movieObj: movieObj, isReviewed: isReviewed })] }) }) }));
};
