import React from "react";
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
  
const Navbar=() =>
{
    return(

      <nav className="navbar navbar-expand-lg  ">
        <div className="container">
         <Link className="navbar-brand d-flex align-items-center" to="/" style={{color:'#E4004B', fontWeight:"bold",fontSize:'30px'}}>
        <img src="/logo1.png" alt="ComicBuilder Logo" width="50" height="50" className="me-2 logo-img" />
         ComicBuilder
        </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/" style={{color:'#E4004B',fontSize:'20px'}}>Home</Link></li>
              <li className="nav-item"><Link className="nav-link"   to="/creator" style={{color:'#E4004B',fontSize:'20px'}}>Create Comic</Link></li>
              <li className="nav-item"><Link className="nav-link"   to="/"style={{color:'#E4004B',fontSize:'20px'}}>Gallery</Link></li>
              <li className="nav-item"><Link className="nav-link"   to="/login" style={{color:'#E4004B',fontSize:'20px'}}>Login</Link></li>
            </ul>
          </div>
        </div>
      </nav>

    );
};

export default Navbar;