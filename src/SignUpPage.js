import React, { useState } from 'react';
import { auth, googleProvider, signInWithPopup, createUserWithEmailAndPassword } from './firebase';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUpPage.css';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  const ABSTRACT_API_KEY = process.env.REACT_APP_ABSTRACT_API_KEY;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = (password) => {
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*]/.test(password),
    };
    setPasswordCriteria(criteria);
  };

  const validateEmailWithAPI = async (email) => {
    try {
      const response = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.REACT_APP_ABSTRACT_API_KEY}&email=${email}`);
      if (response.data && response.data.is_valid_format && response.data.is_smtp_valid) {
        return response.data.is_valid_format.value && response.data.is_smtp_valid.value;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Email validation API error:", error);
      return false;
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
    setError('');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      navigate('/login');
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        setError('The sign-up popup was closed before completing the process.');
      } else {
        setError(error.message);
      }
      console.error("Google Sign-Up Error:", error);
    }
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();

    setError('');
    setSuccessMessage('');

    const isEmailValid = await validateEmailWithAPI(email);

    if (!isEmailValid) {
      setError('Please enter a valid email address.');
      return;
    }

    const { length, uppercase, number, specialChar } = passwordCriteria;
    if (!length || !uppercase || !number || !specialChar) {
      setError('Password does not meet the required criteria.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMessage('Account successfully created! Redirecting to login...');
      setError('');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {

      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please log in or use a different email.');
      } else if (error.code === 'auth/invalid-email') {
        setError('The email address is not valid. Please enter a valid email address.');
      } else if (error.code === 'auth/weak-password') {
        setError('The password is too weak. Please choose a stronger password.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-left-side">
        <div className="text-box">
          <h1>Join Let's Print!</h1>
          <h2>Your creative journey starts here.</h2>
          <img src="/images/catpainting2.png" alt="cat painting" />
        </div>
      </div>
      <div className="signup-right-side">
        <a href="/"><img className="logo-top" src="/images/logo3.png" alt="logo" /></a>
        <div className="signup-box">
          <h2>Sign Up</h2>
          <div className="social-login">
            <button onClick={handleGoogleSignUp} className="google-signin">
              <img src="/images/google.png" alt="google logo" />Continue with Google
            </button>
          </div>

          <div className="or-divider">
            <span>Or</span>
          </div>

          <form onSubmit={handleEmailSignUp}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <img
                src={showPassword ? '/images/noview.png' : '/images/view.png'}
                alt="Toggle Password Visibility"
                className="toggle-password-icon"
                onClick={togglePasswordVisibility}
              />
            </div>

            <div className="password-criteria">
              <div className={passwordCriteria.length ? "criteria-met" : "criteria-not-met"}>
                {passwordCriteria.length ? '✔' : '✖'} 8 characters minimum
              </div>
              <div className={passwordCriteria.uppercase ? "criteria-met" : "criteria-not-met"}>
                {passwordCriteria.uppercase ? '✔' : '✖'} 1 uppercase letter
              </div>
              <div className={passwordCriteria.number ? "criteria-met" : "criteria-not-met"}>
                {passwordCriteria.number ? '✔' : '✖'} 1 number
              </div>
              <div className={passwordCriteria.specialChar ? "criteria-met" : "criteria-not-met"}>
                {passwordCriteria.specialChar ? '✔' : '✖'} 1 special character
              </div>
            </div>

            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <button type="submit">Sign Up</button>
            <label htmlFor="signin">Already have an account? <a href="/login">Sign In Now!</a></label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
