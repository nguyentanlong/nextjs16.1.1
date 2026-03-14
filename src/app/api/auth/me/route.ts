/*import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
        return NextResponse.json({ user: null });
    }

    const res = await fetch(`${API_BASE}/auth/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const user = await res.json();

    return NextResponse.json({ user });
}*/
import { cookies } from "next/headers";

export async function GET() {

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
        return Response.json({ user: null });
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        return Response.json({ user: null });
    }

    const data = await res.json();

    return Response.json({ user: data.user });
}