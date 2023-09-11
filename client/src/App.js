import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { BrowserRouter as Router, Route, Routes, redirect, } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar/Navbar";
import { Homepage } from "./pages/Homepage";
import { SingleMovie } from "./pages/SingleMovie";
import { useState } from "react";
import { oktaConfig } from "./lib/oktaconfig";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security, LoginCallback } from "@okta/okta-react";
import LoginWidget from "./Auth/LoginWidget";
import { SingleReview } from "./pages/SingleReview";
import { Profile } from "./pages/Profile";
import { SignUp } from "./pages/SignUp";
const oktaAuth = new OktaAuth(oktaConfig);
function App() {
    const [movieArr, setMovieArr] = useState([]);
    const customAuthHandler = () => {
        redirect("/login");
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const restoreOriginalUri = async (_oktaAuth, originalUri) => {
        redirect(toRelativeUrl(originalUri || "/", window.location.origin));
    };
    return (_jsx(_Fragment, { children: _jsx(Router, { children: _jsxs(Security, { oktaAuth: oktaAuth, restoreOriginalUri: restoreOriginalUri, onAuthRequired: customAuthHandler, children: [_jsx(Navbar, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Homepage, { movieArr: movieArr, setMovieArr: setMovieArr }) }), _jsx(Route, { path: "/movie/:id", element: _jsx(SingleMovie, {}) }), _jsx(Route, { path: "/review/:id", element: _jsx(SingleReview, {}) }), _jsx(Route, { path: "/profile/:userName", element: _jsx(Profile, {}) }), _jsx(Route, { path: "/signup", element: _jsx(SignUp, {}) }), _jsx(Route, { path: "/login", element: _jsx(LoginWidget, { config: oktaConfig }) }), _jsx(Route, { path: "/login/callback", Component: LoginCallback })] }), "             ", _jsx(Footer, {})] }) }) }));
}
export default App;
