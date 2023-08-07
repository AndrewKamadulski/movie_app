import "./App.css"

import { Footer } from "./components/Footer"
import { Navbar } from "./components/Navbar"
import { Homepage } from "./pages/Homepage"



function App() {
 

  return (
    <>
      <div>     
        <Navbar />   
        <Homepage />
        <Footer />
      </div>
    
    </>
  )
}

export default App
