// src/app/login/page.tsx
/*"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const { login } = useAuth(); // lấy hàm login từ AuthContext
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");
        try {
            const res = await fetch(`/api/auth/login`,
                {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });
            if (!res.ok) { throw new Error("Sai tài khoản hoặc mật khẩu"); }
            const data = await res.json();
            // Lưu token vào cookie (client-side demo) 
            // document.cookie = `authToken=${data.accessToken}; path=/;`;
            // SetCookie: authToken=`${data.accessToken}; path=/;`; HttpOnly; Secure; SameSite=Strict
            // Redirect sang account 
            // window.location.href = "/admin";
            router.push("/admin");

        }
        catch (err: any) {
            setError(err.message);
        }
        finally { setLoading(false); }
    }*/
"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Link from "next/link";
export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth(); // ✅ lấy hàm login từ AuthContext 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // if (loading) return; // chặn double click 
        // setLoading(true);
        try { // ✅ Gọi API login 
            await login(email, password); // ✅ Redirect sang admin 
            router.push("/admin");
        }
        catch (err) { console.error("Login error:", err, "   data   "); }
    }
    return (<>
        {/* <Script src='/script-login.js' strategy="afterInteractive" ></Script> */}
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>Xin Chào!!</h2>
                    <p>Đăng nhập tài khoản</p>
                </div>
                <form className="login-form" id="loginForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className="input-wrapper">
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={email} onChange={(e) => setEmail(e.target.value)}
                                name="email"
                                required
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
                                placeholder="Mật khẩu"
                                value={password} onChange={(e) => setPassword(e.target.value)}
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
                                👁️
                                {/* <span className="eye-icon" /> */}
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
                        <span className="btn-text"></span>
                        <span className="btn-loader" />

                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                    {error && <p className="error">{error}</p>}
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
                        Bạn chưa có tài khoản? <Link href="/register">Đăng ký</Link>
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
