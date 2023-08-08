import { Link } from "react-router-dom";
import "./navbar.css"

export const Navbar = () => {
    return(

<nav className="navbar navbar-dark navbar-expand-lg">
  <div className="container-fluid">
    <Link to="/" className="navbar-brand fs-1 px-3 text-light">Horror Scorer</Link>    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>      
    <div className="collapse navbar-collapse fs-4" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">    
        <li className="nav-item">
          <Link to="/" className="nav-link text-light">Login</Link>
        </li>      
        <li className="nav-item">
          <Link to="/" className="nav-link text-light" >SignUp</Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link text-light" >UserName</Link>
        </li>
      </ul> 
  
  </div>
  </div>
</nav>

);
}