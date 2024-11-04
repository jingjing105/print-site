import React, { useState } from 'react';
import { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence, sendPasswordResetEmail } from './firebase';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const [stayLoggedIn, setStayLoggedIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleGoogleSignIn = async () => {
        try {
            if (stayLoggedIn) {
                await setPersistence(auth, browserLocalPersistence);
            } else {
                await setPersistence(auth, browserSessionPersistence);
            }
            const result = await signInWithPopup(auth, googleProvider);
            const idToken = await result.user.getIdToken(true);
            console.log(result.user);
            await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firebaseToken: idToken }), // Send token to backend
            });
            navigate('/');
        } catch (error) {
            if (error.code === 'auth/popup-closed-by-user') {
                setError('The sign-in popup was closed before completing the process.');
            } else {
                setError(error.message);
            }
        }
    };

    const handleEmailSignIn = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Get Firebase Token
            const idToken = await user.getIdToken(true);

            // Send token to backend
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firebaseToken: idToken }), // Send token to backend
            });

            const data = await response.json();
            console.log('User synced to PostgreSQL:', data);

            setMessage('Successfully Logged In! Redirecting to homepage...');
            setError('');
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            setError('An error occurred while signing in. Please try again.');
        }
    };


    const handleForgotPassword = async () => {
        setError('');
        setMessage('');

        if (!email) {
            setError('Please enter your email address to receive a password reset link.');
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('If you have a registered account, a password reset email has been sent. Please check your inbox.');
        } catch (error) {
            if (error.code === 'auth/missing-email') {
                setError('Please enter a valid email address.');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };


    return (
        <div className="login-page">
            <div className="left-side">
                <div className="text-box">
                    <h1>Welcome Back!</h1>
                    <h2>Your creative journey continues here.</h2>
                    <img src="/images/catpainting2.png" alt="cat painting" />
                </div>
            </div>
            <div className="right-side">
                <a href="/"><img className="logo-top" src="/images/logo3.png" alt="logo" /></a>
                <div className="login-box">
                    <h2>Sign In</h2>
                    <div className="social-login">
                        <button onClick={handleGoogleSignIn} className="google-signin">
                            <img src="/images/google.png" alt="google logo" />Continue with Google
                        </button>
                    </div>

                    <div className="or-divider">
                        <span>Or</span>
                    </div>

                    <form onSubmit={handleEmailSignIn}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <div className="password-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <img
                                src={showPassword ? '/images/noview.png' : '/images/view.png'}
                                alt="Toggle Password Visibility"
                                className="toggle-password-icon"
                                onClick={togglePasswordVisibility}
                            />
                        </div>
                        <div className="form-options">
                            <div className="stay-logged-in">
                                <input
                                    type="checkbox"
                                    id="stay-logged-in"
                                    checked={stayLoggedIn}
                                    onChange={() => setStayLoggedIn(!stayLoggedIn)}
                                />
                                <label htmlFor="stay-logged-in">Stay Logged In</label>
                            </div>
                            <button type="button" className="forgot-password" onClick={handleForgotPassword}>
                                Forgot Password?
                            </button>
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        {message && <p className="success-message">{message}</p>}
                        <button type="submit" className="sign-in-btn">Sign In</button>
                        <label htmlFor="signup">Don't have an account? <a href="signup">Register Now!</a></label>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

