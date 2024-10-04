import React, { useState } from 'react';
import { auth, googleProvider, signInWithPopup } from './firebase';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const [stayLoggedIn, setStayLoggedIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log(result.user);
            if (stayLoggedIn) {
                await auth.setPersistence(auth.Auth.Persistence.LOCAL);
            } else {
                await auth.setPersistence(auth.Auth.Persistence.SESSION);
            }
            navigate('/');
        } catch (error) {
            console.error("Google Sign-In Error:", error);
        }
    };

    return (
        <div className="login-page">
            <div className="left-side">
                <div className="text-box">
                    <h1>Welcome Back to Let's Print!</h1>
                    <h2>Your creative journey continues here.</h2>
                    <img src="/images/catpainting2.png" alt="cat painting" />
                </div>
            </div>
            <div className="right-side">
                <div className="login-box">
                    <h2>Sign In</h2>
                    <div className="social-login">
                        <button onClick={handleGoogleSignIn} className="google-signin"><img src="/images/google.png" alt="google logo" />Continue with Google</button>
                        <button className="apple-signin"><img src="/images/apple.png" alt="apple logo" />Continue with Apple</button>
                    </div>

                    <div className="or-divider">
                        <span>Or</span>
                    </div>

                    <form>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email" required />
                        <label htmlFor="password">Password</label>
                        <div className="password-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Enter your password"
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
                            <label htmlFor="forgot-password" className="forgot-password">
                                <a href="/forgot-password">Forgot Password?</a>
                            </label>
                        </div>
                        <button type="submit">Sign In</button>
                        <label htmlFor="signup">Don't have an account? <a href="signup">Register Now!</a></label>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
