// src/app/login/page.tsx
"use client"; // để dùng script client-side

// import Script from "next/script";
// import "./style.css"; // CSS riêng cho login
import { useEffect } from "react";

export default function LoginPage() {
    useEffect(() => {
        // Script riêng cho login

        // const form = document.getElementById("login-form") as HTMLFormElement;
        // form?.addEventListener("submit", (e) => {
        //     e.preventDefault();
        //     alert("Đăng nhập thành công (demo)!");
        // });
    }, []);

    return (<>
        {/* <Script src='/script-login.js' strategy="afterInteractive" ></Script> */}
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>Xin Chào!!</h2>
                    <p>Đăng nhập tài khoản</p>
                </div>
                <form className="login-form" id="loginForm" >
                    <div className="form-group">
                        <div className="input-wrapper">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                autoComplete="email"
                            />
                            <label htmlFor="email">Địa chỉ Email</label>
                            <span className="focus-border" />
                        </div>
                        <span className="error-message" id="emailError" />
                    </div>
                    <div className="form-group">
                        <div className="input-wrapper password-wrapper">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                autoComplete="current-password"
                            />
                            <label htmlFor="password">Mật khẩu</label>
                            <button
                                type="button"
                                className="password-toggle"
                                id="passwordToggle"
                                aria-label="Toggle password visibility"
                            >
                                <span className="eye-icon" />
                            </button>
                            <span className="focus-border" />
                        </div>
                        <span className="error-message" id="passwordError" />
                    </div>
                    <div className="form-options">
                        <label className="remember-wrapper">
                            <input type="checkbox" id="remember" name="remember" />
                            <span className="checkbox-label">
                                <span className="checkmark" />
                                Ghi nhớ đăng nhập
                            </span>
                        </label>
                        <a href="#" className="forgot-password">
                            Quên mật khẩu?
                        </a>
                    </div>
                    <button type="submit" className="login-btn btn">
                        <span className="btn-text">Đăng Nhập</span>
                        <span className="btn-loader" />
                    </button>
                </form>
                <div className="divider">
                    <span>hoặc đăng nhập với?</span>
                </div>
                <div className="social-login">
                    <button type="button" className="social-btn google-btn">
                        <span className="social-icon google-icon" />
                        Google
                    </button>
                    <button type="button" className="social-btn github-btn">
                        <span className="social-icon github-icon" />
                        Facebook
                    </button>
                </div>
                <div className="signup-link">
                    <p>
                        Bạn chưa có tài khoản? <a href="#">Đăng ký</a>
                    </p>
                </div>
                <div className="success-message" id="successMessage">
                    <div className="success-icon">✓</div>
                    <h3>Đăng nhập thành công!</h3>
                    <p>Đi đến bảng điều khiển...</p>
                </div>
            </div>
        </div>
    </>);
}
