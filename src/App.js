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
import Help from "./Help";
import AccountPage from "./AccountPage";
import { UserProvider } from "./UserContext";
import ReviewSection from './ReviewSection';
import SubmitReview from './SubmitReview';
import './App.css';

function App() {
  return (
      <UserProvider>
    <Router>
    <Routes>
      <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/photographer" element={<PhotographerPage />} />
          <Route path="/posters" element={<PosterPage />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms" element={<TermsService />} />
         <Route path="/submit-review" element={<SubmitReview />} />
        <Route path="/reviews" element={<ReviewSection />} />
         <Route path="/help-center" element={<Help />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/*" element={<AccountPage />} />
    </Routes>
</Router>
</UserProvider>
  );
}

export default App;
