// src/app/login/layout.tsx
"use client";
import Script from "next/script";
import "./stype-login.css";
// import { AuthProvider } from "@/context/AuthContext";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (<>
    {/* // <AuthProvider> */}
    {children}
    <Script src="./script-login.js" />
    {/* <Script src="./script-login-1.js" /> */}
    <Script src="./script-alt.js" />
    {/* // </AuthProvider></> */}
  </>
  );
}
