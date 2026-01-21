// src/app/login/layout.tsx
import Script from "next/script";
import "./stype-login.css";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (

    <main>{children}
      <Script src="./script-login.js" />
      <Script src="./script-login-1.js" />
      <Script src="./script-alt.js" />
    </main>
  );
}
