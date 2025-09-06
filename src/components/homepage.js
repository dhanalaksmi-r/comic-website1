import React from "react";
import './homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate=useNavigate();
  return (
    <div>
     
      {/* Hero Section */}
      <section className="bg-light text-dark text-center py-5">
        <div className="container">
          <h1 className="display-4">Unleash your inner hero-comic creation in no time!</h1>
          <p className="lead">Build, customize, and share your comic strips online.</p>
          <button className="btn  btn-lg me-2" style={{backgroundColor:' #6A0066',color:'#E4004B'}} onClick={()=>navigate("/creator")}>Start Building</button>
          <button className="btn  browsebtn btn-lg" style={{border:'1px solid #6A0066'}} onClick={()=>navigate("/gallery")}>Browse Gallery</button>
        </div>
      </section>

      {/* Featured Comics Carousel */}
      <section className="container my-5">
        <h2 className="text-center mb-4">Featured Comics</h2>
        <div id="comicCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="corosel-1.jpeg" className="d-block w-100 img-fluid" alt="Comic 1" />
            </div>
            <div className="carousel-item ">
              <img src="image1.png" className="d-block w-100 img-fluid" alt="Comic 2" />
            </div>
            <div className="carousel-item ">
              <img src="image2.jpeg" className="d-block w-100 img-fluid" alt="Comic 3" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#comicCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#comicCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container my-5">
        <h2 className="text-center mb-4">Popular Categories</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card custom-card">
              <img src="humor.png" className="card-img-top" alt="Humor" />
              <div className="card-body">
                <h5 className="card-title">Humor</h5>
                <p className="card-text">Create funny and entertaining comic strips.</p>
                <a href="#" className="btn " style={{backgroundColor:'#ffcc00'}}>Explore</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card custom-card">
              <img src="superhero.png" className="card-img-top" alt="Superhero" />
              <div className="card-body">
                <h5 className="card-title">Superhero</h5>
                <p className="card-text">Design your own superheroes and villains.</p>
                <a href="#" className="btn "style={{backgroundColor:'#ffcc00'}}>Explore</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card custom-card">
              <img src="manga.png" className="card-img-top" alt="Manga" />
              <div className="card-body">
                <h5 className="card-title">Manga</h5>
                <p className="card-text">Create stunning manga-inspired comics.</p>
                <a href="#" className="btn "style={{backgroundColor:'#ffcc00'}}>Explore</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-light text-center py-3" style={{backgroundColor:'#6A0066'}}> 
        <p>&copy; 2025 ComicBuilder | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default HomePage;
