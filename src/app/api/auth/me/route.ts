
import { cookies } from "next/headers";

export async function GET() {

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    // console.log("TOKEN:", token);
    if (!token) {
        return Response.json({ user: null });
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!res.ok) {
        return Response.json({ user: null });
    }

    const data = await res.json();

    return Response.json({ user: data.user ?? data });
}