/*import { NextRequest } from "next/server";
import { createProxyMiddleware } from "http-proxy-middleware";
import { NextApiResponse } from "next";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default function handler(req: any, res: NextApiResponse) {
    return createProxyMiddleware({
        target: process.env.NEXT_PUBLIC_API_BASE, // ví dụ https://api.tonkliplock1000.com
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: {
            "*": "", // ⚡ rewrite cookie domain về localhost
        },
    })(req, res);
}
*/