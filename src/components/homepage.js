import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">ComicBuilder</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Create Comic</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Gallery</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Login</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-light text-dark text-center py-5">
        <div className="container">
          <h1 className="display-4">Create Your Own Comic in Minutes</h1>
          <p className="lead">Build, customize, and share your comic strips online.</p>
          <a href="#" className="btn btn-primary btn-lg me-2">Start Building</a>
          <a href="#" className="btn btn-outline-dark btn-lg">Browse Gallery</a>
        </div>
      </section>

      {/* Featured Comics Carousel */}
      <section className="container my-5">
        <h2 className="text-center mb-4">Featured Comics</h2>
        <div id="comicCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://via.placeholder.com/900x400?text=Comic+1" className="d-block w-100" alt="Comic 1" />
            </div>
            <div className="carousel-item">
              <img src="https://via.placeholder.com/900x400?text=Comic+2" className="d-block w-100" alt="Comic 2" />
            </div>
            <div className="carousel-item">
              <img src="https://via.placeholder.com/900x400?text=Comic+3" className="d-block w-100" alt="Comic 3" />
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
            <div className="card shadow-sm">
              <img src="https://via.placeholder.com/350x200" className="card-img-top" alt="Humor" />
              <div className="card-body">
                <h5 className="card-title">Humor</h5>
                <p className="card-text">Create funny and entertaining comic strips.</p>
                <a href="#" className="btn btn-primary">Explore</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm">
              <img src="https://via.placeholder.com/350x200" className="card-img-top" alt="Superhero" />
              <div className="card-body">
                <h5 className="card-title">Superhero</h5>
                <p className="card-text">Design your own superheroes and villains.</p>
                <a href="#" className="btn btn-primary">Explore</a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm">
              <img src="https://via.placeholder.com/350x200" className="card-img-top" alt="Manga" />
              <div className="card-body">
                <h5 className="card-title">Manga</h5>
                <p className="card-text">Create stunning manga-inspired comics.</p>
                <a href="#" className="btn btn-primary">Explore</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-3">
        <p>&copy; 2025 ComicBuilder | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default HomePage;
