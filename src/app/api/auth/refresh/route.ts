import { NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_API_BASE_L;
// API route để refresh token
export async function POST(req: Request) {
    try {
        // Lấy refreshToken từ cookie
        const cookieHeader = req.headers.get('cookie') || '';
        const refreshToken = cookieHeader
            .split(';')
            .map(c => c.trim())
            .find(c => c.startsWith('refreshToken='))
            ?.split('=')[1];

        if (!refreshToken) {
            return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
        }

        // Gọi backend để refresh
        const res = await fetch(`${API_BASE}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
        });

        if (!res.ok) {
            return NextResponse.json({ error: 'Refresh failed' }, { status: 401 });
        }

        const data = await res.json();

        // Tạo response và set lại cookie mới
        const response = NextResponse.json({ success: true });

        response.cookies.set('accessToken', data.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            path: '/',
            maxAge: 60 * 15, // 15 phút
        });

        response.cookies.set('refreshToken', data.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 ngày
        });

        return response;
    } catch (err) {
        console.error('Refresh error:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
