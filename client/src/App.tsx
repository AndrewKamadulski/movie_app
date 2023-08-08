import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"

import { Footer } from "./components/Footer"
import { MovieCards } from "./components/MovieCards"
import { Navbar } from "./components/Navbar/Navbar"
import { Homepage } from "./pages/Homepage"
import { SingleMovie } from "./pages/SingleMovie"
import { useState } from "react"




function App() {
 
  const [movieObj, setMovieObj] = useState({});

  return (
    <>
    <Router>
      <Navbar /> 
       <Routes>            
        <Route
                path="/"
                element={<Homepage
                movieObj={movieObj}
                setMovieObj={setMovieObj}
                >
                </Homepage>}
              />           
         
         <Route
                path="/Movie"
                element={<SingleMovie
                movieObj={movieObj}
                setMovieObj={setMovieObj}
                >
                </SingleMovie>}
              />           
         </Routes>
      <Footer />
    </Router>
    </>
  )
}

export default App
