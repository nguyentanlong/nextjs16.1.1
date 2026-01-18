// src/app/login/page.tsx
"use client"; // để dùng script client-side

import Script from "next/script";
import "./style.css"; // CSS riêng cho login
import { useEffect } from "react";

export default function LoginPage() {
    useEffect(() => {
        // Script riêng cho login
        <Script src='/script-login.js'></Script>
        const form = document.getElementById("login-form") as HTMLFormElement;
        form?.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Đăng nhập thành công (demo)!");
        });
    }, []);

    return (<>
        <div className="wave-container">
            <div className="wave wave-1" />
            <div className="wave wave-2" />
            <div className="wave wave-3" />
            <div className="wave wave-4" />
        </div>
        <div className="gradient-particles">
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
            <div className="particle" />
        </div>
        <div className="login-container">
            <div className="login-card">
                <div className="card-glow" />
                <div className="login-header">
                    <div className="gradient-icon">
                        <div className="icon-wave" />
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                            <path d="M2 17l10 5 10-5" />
                            <path d="M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <h2>Welcome</h2>
                    <p>Sign in to continue your journey</p>
                </div>
                <form className="login-form" id="loginForm" >
                    <div className="form-group">
                        <div className="input-container">
                            <div className="input-bg" />
                            <input
                                type="email"
                                id="email"
                                name="email"

                                autoComplete="email"
                                placeholder=" "
                            />
                            <label htmlFor="email">Email Address</label>
                            <div className="input-wave" />
                        </div>
                        <span className="error-message" id="emailError" />
                    </div>
                    <div className="form-group">
                        <div className="input-container password-container">
                            <div className="input-bg" />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                autoComplete="current-password"
                                placeholder=" "
                            />
                            <label htmlFor="password">Password</label>
                            <button
                                type="button"
                                className="password-toggle"
                                id="passwordToggle"
                                aria-label="Toggle password visibility"
                            >
                                <div className="toggle-bg" />
                                <div className="toggle-icon">
                                    <svg
                                        className="eye-open"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx={12} cy={12} r={3} />
                                    </svg>
                                    <svg
                                        className="eye-closed"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                        <line x1={1} y1={1} x2={23} y2={23} />
                                    </svg>
                                </div>
                            </button>
                            <div className="input-wave" />
                        </div>
                        <span className="error-message" id="passwordError" />
                    </div>
                    <div className="form-options">
                        <div className="checkbox-container">
                            <input type="checkbox" id="remember" name="remember" />
                            <label htmlFor="remember" className="checkbox-label">
                                <div className="gradient-checkbox">
                                    <div className="checkbox-bg" />
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={3}
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                Remember me
                            </label>
                        </div>
                        <a href="#" className="forgot-link">
                            Forgot password?
                        </a>
                    </div>
                    <button type="submit" className="gradient-button">
                        <div className="button-bg" />
                        <div className="button-content">
                            <span className="btn-text">Sign In</span>
                            <div className="btn-loader">
                                <div className="loader-wave" />
                                <div className="loader-wave" />
                                <div className="loader-wave" />
                            </div>
                        </div>
                        <div className="button-ripple" />
                    </button>
                </form>
                <div className="divider">
                    <div className="divider-line">
                        <div className="line-gradient" />
                    </div>
                    <span>or continue with</span>
                    <div className="divider-line">
                        <div className="line-gradient" />
                    </div>
                </div>
                <div className="social-login">
                    <button type="button" className="social-btn">
                        <div className="social-bg google-bg" />
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                    </button>
                    <button type="button" className="social-btn">
                        <div className="social-bg facebook-bg" />
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                    </button>
                    <button type="button" className="social-btn">
                        <div className="social-bg apple-bg" />
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                        </svg>
                    </button>
                </div>
                <div className="signup-link">
                    <p>
                        New to our platform? <a href="#">Create account</a>
                    </p>
                </div>
                <div className="success-message" id="successMessage">
                    <div className="success-wave" />
                    <div className="success-content">
                        <div className="success-icon">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <h3>Welcome back!</h3>
                        <p>Redirecting to your dashboard...</p>
                    </div>
                </div>
            </div>
        </div>
    </>);
}
