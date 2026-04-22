// src/app/regoster/layout.tsx
import Script from "next/script";
import "./style.css";

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
    return (

        <main>{children}
            <Script src="./script-register.js" />
            <Script src="./script-alt.js" />
        </main>
    );
}
