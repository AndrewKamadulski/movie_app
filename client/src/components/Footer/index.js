import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import "./footer.css";
export const Footer = () => {
    return (_jsx("div", { className: "footer-container", children: _jsx("footer", { children: _jsx("div", { className: "container text-white pt-5", children: _jsxs("div", { className: "d-flex justify-content-between", children: [_jsx("p", { className: "ms-2", children: "\u00A92023 AJK" }), _jsx(Link, { className: "text-decoration-none text-light me-2", to: "/", children: "Home" })] }) }) }) }));
};
