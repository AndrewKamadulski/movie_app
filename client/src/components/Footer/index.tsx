import { Link } from "react-router-dom";
import "./footer.css";

export const Footer = () => {
  return (
    <div className="footer-container">
      <footer>
              <div className="container text-white pt-5">
          <div className="d-flex justify-content-between">          
                 <p className="ms-2">&copy;2023 AJK</p>  
                 <Link className="text-decoration-none text-light me-2" to="/">Home</Link>                 
                 </div>
          
       
        </div>
      
      </footer>
    </div>
  );
};
