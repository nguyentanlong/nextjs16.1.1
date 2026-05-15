import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const isProd = process.env.NODE_ENV === "production";

export async function POST() {
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get("refreshToken")?.value;

        if (!refreshToken) {
            return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
        }

        const res = await fetch(`${API_BASE}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
        });

        if (!res.ok) {
            return NextResponse.json({ error: 'Refresh failed' }, { status: 401 });
        }

        const data = await res.json();
        // data = { accessToken, refreshToken, user? }
        // console.log("Backend refresh response:", JSON.stringify(data));
        const response = NextResponse.json({
            success: true,
            accessToken: data.accessToken, // ← trả về để client có thể dùng
            user: data.user ?? null,        // ← trả về user nếu backend có
        });

        response.cookies.set('accessToken', data.accessToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "lax",
            path: '/',
            maxAge: 60 * 15,
        });

        response.cookies.set('refreshToken', data.refreshToken, {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "lax",
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;

    } catch (err) {
        console.error('Refresh error:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}