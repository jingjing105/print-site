import React from 'react';
import Navbar from './Navbar'; 
import Home from './Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage'; 
import SignUpPage from './SignUpPage'
import PosterPage from './PosterPage';
import PhotographerPage from './PhotographerPage';
import Privacy from './PrivacyPage';
import TermsService from './TermsService';
import ReviewSection from './ReviewSection';
import SubmitReview from './SubmitReview';
import './App.css';

function App() {
  return (
    <Router>
    <Routes>
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/posters" element={<PosterPage />} />
        <Route path="/photographer" element={<PhotographerPage />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms" element={<TermsService />} />
        <Route path="/submit-review" element={<SubmitReview />} />
        <Route path="/reviews" element={<ReviewSection />} />
    </Routes>
</Router>
  );
}

export default App;
