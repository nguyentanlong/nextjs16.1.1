
"use client";
import Script from "next/script";
import "./stype-login.css";


export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (<>
    {children}
    <Script src="./script-login.js" />
    <Script src="./script-alt.js" />
  </>
  );
}
