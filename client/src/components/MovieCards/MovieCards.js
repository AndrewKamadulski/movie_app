import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import "./card.css";
import { Link } from "react-router-dom";
import { Pagination } from "../Pagination/Pagination";
export const MovieCards = (props) => {
    const { movieArr, setMovieArr } = props;
    const [pageNumber, setPageNumber] = useState(1);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=8e8d1fb7683b829d728e204db461103b&page=${pageNumber}&language=en-US&sort_by=popularity.desc&with_genres=27`).then(function (response) {
            response.json().then(function (data) {
                setMovieArr(data.results);
            });
        });
    }, [pageNumber, setMovieArr]);
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "container-fluid card-container", children: _jsx("div", { className: "row", children: _jsx("div", { className: "col-lg-12", children: _jsx("div", { className: "mt-3", children: _jsx("div", { className: "row", children: movieArr.map((movie) => (_jsx("div", { className: "col-md-6 col-lg-4 col-xl-3 d-flex", children: _jsx("div", { className: "movie-card card", children: _jsx("div", { className: "col-3", children: _jsx(Link, { to: `/movie/` + movie.id, children: _jsx("img", { id: (movie.id).toString(), className: "card-image", src: `https://image.tmdb.org/t/p/original${movie.poster_path}` }) }) }) }) }, movie.id.toString()))) }) }) }) }) }), _jsx("div", { className: "container d-flex justify-content-center ", children: _jsx(Pagination, { pageNumber: pageNumber, setPageNumber: setPageNumber }) })] }));
};
