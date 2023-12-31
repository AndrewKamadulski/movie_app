import { Link } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import "./navbar.css";

export const Navbar = () => {
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) {
    return <div>Loading......</div>;
  }

  const handleLogout = async () => oktaAuth.signOut();
  console.log(authState);

  return (
    <nav className="navbar navbar-dark bg-red navbar-expand-lg">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand logo fs-1 px-1 text-light">
          Horror Scorer
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse bg-red navbar-dropdown fs-4"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {!authState.isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link to="/Login" className="nav-link text-light">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link text-light">
                    SignUp
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to={`/profile/` + authState.idToken.claims.name}
                    className="nav-link text-light"
                  >
                    {authState.idToken.claims.name}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/"
                    className="nav-link text-light"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
