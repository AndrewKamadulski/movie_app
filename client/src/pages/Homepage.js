import { jsx as _jsx } from "react/jsx-runtime";
import { MovieCards } from "../components/MovieCards/MovieCards";
export const Homepage = (props) => {
    const { movieArr, setMovieArr } = props;
    return (_jsx("div", { children: _jsx("div", { className: "mx-5 my-2", children: _jsx(MovieCards, { movieArr: movieArr, setMovieArr: setMovieArr }) }) }));
};
