import React, { SyntheticEvent, useState } from "react";
import SignUpModel from "../models/SignUpModel";

export const SignUp = () => {
  const [signUpFirstName, setSignUpFirstName] = useState("");
  const [signUpLastName, setSignUpLastName] = useState("");
  const [signUpUserName, setSignUpUserName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [issignUpFormSent, setIssignUpFormSent] = useState(false);
  const [signUpFormError, setSignUpFormError] = useState(false);
  

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const signUpData = new SignUpModel(
      signUpFirstName,
      signUpLastName,
      signUpUserName,
      signUpEmail
    );

    async function postData(url = "", data = {}) {
      const response = 
      await fetch(url, {
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
      postData("http://localhost:8080/api/signup/send", signUpData).then(
        (data) => {
          if (!data.ok) {
            console.log("Unable to send data");
            setSignUpFormError(true);
          }
        }
      );
    } catch (error) {
      console.log(error);
      setSignUpFormError(true);
    }

    setIssignUpFormSent(true);
  };

  if (!issignUpFormSent) {
    return (
      <>
        <div className="container signup-form col-12 col-lg-6 my-3 bg-dark border rounded">
          <div className="justify-content-center pt-5">
            <form onSubmit={onSubmit}>
              <div className="mb-3 px-5">
                <label className="form-label" htmlFor="firstName">
                  First Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="firstName"
                  onChange={(e) => setSignUpFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 px-5">
                <label className="form-label" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="lastName"
                  onChange={(e) => setSignUpLastName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 px-5">
                <label className="form-label" htmlFor="userName">
                  Requested User Name
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="userName"
                  onChange={(e) => setSignUpUserName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 px-5">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  placeholder="user@email.com"
                  required
                />
              </div>

              <div className="mb-3 px-5">
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-outline-dark my-4 bg-red text-light"
                    type="submit"
                    onSubmit={onSubmit}
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        {!signUpFormError && (
          <div className="container col-12 col-lg-6 my-3 bg-red">
            <div className="text-center pt-5">
              <p className="display-2 pt-5 mx-2"> Thank you for signing up </p>
              <br></br>
              <p className="display-3 p-5">You will receive an email with login credentials within 24 hours.</p>
            </div>
          </div>
        )}

        {signUpFormError && (
          <div className="container c col-12 col-lg-6">
            <div className="text-center pt-5">
              <p className="display-3 pt-5"> Something went wrong. </p>
              <br></br>
              <p className="display-4">
                We are having technical difficulties. Please try again later.
              </p>
            </div>
          </div>
        )}
      </>
    );
  }
};
