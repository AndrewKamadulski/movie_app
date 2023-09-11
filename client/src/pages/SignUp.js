import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import SignUpModel from "../models/SignUpModel";
export const SignUp = () => {
    const [signUpFirstName, setSignUpFirstName] = useState("");
    const [signUpLastName, setSignUpLastName] = useState("");
    const [signUpUserName, setSignUpUserName] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [issignUpFormSent, setIssignUpFormSent] = useState(false);
    const [signUpFormError, setSignUpFormError] = useState(false);
    const onSubmit = (e) => {
        e.preventDefault();
        const signUpData = new SignUpModel(signUpFirstName, signUpLastName, signUpUserName, signUpEmail);
        async function postData(url = "", data = {}) {
            const response = await fetch(url, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(data),
            });
            return response;
        }
        try {
            postData("http://localhost:8080/api/signup/send", signUpData).then((data) => {
                if (!data.ok) {
                    console.log("Unable to send data");
                    setSignUpFormError(true);
                }
            });
        }
        catch (error) {
            console.log(error);
            setSignUpFormError(true);
        }
        setIssignUpFormSent(true);
    };
    if (!issignUpFormSent) {
        return (_jsx(_Fragment, { children: _jsx("div", { className: "container signup-form col-12 col-lg-6 my-3 bg-dark border rounded", children: _jsx("div", { className: "justify-content-center pt-5", children: _jsxs("form", { onSubmit: onSubmit, children: [_jsxs("div", { className: "mb-3 px-5", children: [_jsx("label", { className: "form-label", htmlFor: "firstName", children: "First Name" }), _jsx("input", { className: "form-control", type: "text", id: "firstName", onChange: (e) => setSignUpFirstName(e.target.value), required: true })] }), _jsxs("div", { className: "mb-3 px-5", children: [_jsx("label", { className: "form-label", htmlFor: "lastName", children: "Last Name" }), _jsx("input", { className: "form-control", type: "text", id: "lastName", onChange: (e) => setSignUpLastName(e.target.value), required: true })] }), _jsxs("div", { className: "mb-3 px-5", children: [_jsx("label", { className: "form-label", htmlFor: "userName", children: "Requested User Name" }), _jsx("input", { className: "form-control", type: "text", id: "userName", onChange: (e) => setSignUpUserName(e.target.value), required: true })] }), _jsxs("div", { className: "mb-3 px-5", children: [_jsx("label", { className: "form-label", htmlFor: "email", children: "Email" }), _jsx("input", { className: "form-control", type: "email", id: "email", onChange: (e) => setSignUpEmail(e.target.value), placeholder: "user@email.com", required: true })] }), _jsx("div", { className: "mb-3 px-5", children: _jsx("div", { className: "d-flex justify-content-center", children: _jsx("button", { className: "btn btn-outline-dark my-4 bg-red text-light", type: "submit", onSubmit: onSubmit, children: "Send" }) }) })] }) }) }) }));
    }
    else {
        return (_jsxs(_Fragment, { children: [!signUpFormError && (_jsx("div", { className: "container col-12 col-lg-6 my-3 bg-red", children: _jsxs("div", { className: "text-center pt-5", children: [_jsx("p", { className: "display-2 pt-5 mx-2", children: " Thank you for signing up " }), _jsx("br", {}), _jsx("p", { className: "display-3 p-5", children: "You will receive an email with login credentials within 24 hours." })] }) })), signUpFormError && (_jsx("div", { className: "container c col-12 col-lg-6", children: _jsxs("div", { className: "text-center pt-5", children: [_jsx("p", { className: "display-3 pt-5", children: " Something went wrong. " }), _jsx("br", {}), _jsx("p", { className: "display-4", children: "We are having technical difficulties. Please try again later." })] }) }))] }));
    }
};
