import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  redirect,
} from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer";
import { MovieCards } from "./components/MovieCards";
import { Navbar } from "./components/Navbar/Navbar";
import { Homepage } from "./pages/Homepage";
import { SingleMovie } from "./pages/SingleMovie";
import { useState } from "react";
import { oktaConfig } from "./lib/oktaconfig";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security, LoginCallback } from "@okta/okta-react";
import LoginWidget from "./Auth/LoginWidget";
import { SingleReview } from "./pages/SingleReview";

const oktaAuth = new OktaAuth(oktaConfig);
function App() {  
  const [movieArr, setMovieArr] = useState([]);

  const customAuthHandler = () => {
    redirect("/login");
  };

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    redirect(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <>
      <Router>
        <Security
          oktaAuth={oktaAuth}
          restoreOriginalUri={restoreOriginalUri}
          onAuthRequired={customAuthHandler}
        >
          <Navbar />

          <Routes>
            <Route
              path="/"
              element={
                <Homepage               
                  movieArr={movieArr}
                  setMovieArr={setMovieArr}
                ></Homepage>
              }
            />

            <Route
              path="/movie/:id"
              element={<SingleMovie                
                 movieArr={movieArr}> 
                 </SingleMovie>}
            />

            
<Route
              path="/review/:id"
              element={<SingleReview>             
                 
                 </SingleReview>}
            />

            <Route
              path="/login"
              element={<LoginWidget config={oktaConfig}></LoginWidget>}
            />
            <Route path="/login/callback" component={LoginCallback} />
          </Routes>

          <Footer />
        </Security>
      </Router>
    </>
  );
}

export default App;
