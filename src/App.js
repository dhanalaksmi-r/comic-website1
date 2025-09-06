import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Navbar from './components/navbar';
import HomePage from './components/homepage';
import LoginPage from './components/login';
import CreatorPage from './components/creator';
import GalleryPage from './components/gallery';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/creator" element={<CreatorPage/>}/>
        <Route path="/gallery" element={<GalleryPage/>}/>

      </Routes>
    </Router>
  );
};

export default App;

