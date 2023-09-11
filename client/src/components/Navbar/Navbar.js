import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import "./navbar.css";
export const Navbar = () => {
    const { oktaAuth, authState } = useOktaAuth();
    if (!authState) {
        return _jsx("div", { children: "Loading......" });
    }
    const handleLogout = async () => oktaAuth.signOut();
    console.log(authState);
    return (_jsx("nav", { className: "navbar navbar-dark bg-red navbar-expand-lg", children: _jsxs("div", { className: "container-fluid", children: [_jsx(Link, { to: "/", className: "navbar-brand logo fs-1 px-1 text-light", children: "Horror Scorer" }), _jsx("button", { className: "navbar-toggler", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#navbarSupportedContent", "aria-controls": "navbarSupportedContent", "aria-expanded": "false", "aria-label": "Toggle navigation", children: _jsx("span", { className: "navbar-toggler-icon" }) }), _jsx("div", { className: "collapse navbar-collapse bg-red navbar-dropdown fs-4", id: "navbarSupportedContent", children: _jsx("ul", { className: "navbar-nav ms-auto mb-2 mb-lg-0", children: !authState.isAuthenticated ? (_jsxs(_Fragment, { children: [_jsx("li", { className: "nav-item", children: _jsx(Link, { to: "/Login", className: "nav-link text-light", children: "Login" }) }), _jsx("li", { className: "nav-item", children: _jsx(Link, { to: "/signup", className: "nav-link text-light", children: "SignUp" }) })] })) : (_jsxs(_Fragment, { children: [_jsx("li", { className: "nav-item", children: _jsx(Link, { to: `/profile/` + authState.idToken.claims.name, className: "nav-link text-light", children: authState.idToken.claims.name }) }), _jsx("li", { className: "nav-item", children: _jsx(Link, { to: "/", className: "nav-link text-light", onClick: handleLogout, children: "Logout" }) })] })) }) })] }) }));
};
