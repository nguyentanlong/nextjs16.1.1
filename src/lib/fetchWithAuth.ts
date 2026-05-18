// src/lib/fetchWithAuth.ts

let _accessToken: string | null = null;

export function setAuthToken(token: string | null) {
    _accessToken = token;
}

function getTokenExpiry(token: string): number | null {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp ?? null;
    } catch { return null; }
}

function isTokenExpiringSoon(token: string, threshold = 60): boolean {
    const exp = getTokenExpiry(token);
    if (!exp) return true;
    const remaining = exp - Math.floor(Date.now() / 1000);
    console.log(`⏱️ Token còn ${remaining}s`);
    return remaining < threshold;
}

async function doRefresh(): Promise<boolean> {
    try {
        console.log("🔄 doRefresh() called...");

        const res = await fetch("/api/auth/refresh", {
            method: "POST",
            credentials: "include",
        });
        if (res.ok) {
            const data = await res.json();
            console.log("doRefresh response:", JSON.stringify(data));
            if (data.accessToken) {
                _accessToken = data.accessToken;
                console.log("_accessToken updated:", _accessToken);
            }
            return true;
        }
        console.log("❌ doRefresh() failed:", res.status);
        return false;
    } catch (err) {
        console.error("doRefresh() error:", err);
        return false;
    }
}

export async function fetchWithAuth(
    url: string,
    options: RequestInit = {}
): Promise<Response> {

    // Bước 0 — chưa có token → thử refresh (load lại trang, token chưa được set)
    if (!_accessToken) {
        console.log("⚠️ _accessToken null → thử refresh trước...");
        const ok = await doRefresh();
        if (!ok) {
            console.log("❌ Không có token và refresh thất bại → redirect login");
            window.location.href = "/admin/login";
            return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
        }
    }

    // Bước 1 — token sắp hết hạn → refresh trước khi fetch
    if (_accessToken && isTokenExpiringSoon(_accessToken, 60)) {
        console.log("⚠️ Token sắp hết hạn → refresh trước...");
        const ok = await doRefresh();
        if (!ok) {
            console.log("❌ Refresh thất bại → redirect login");
            window.location.href = "/admin/login";
            return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
        }
    }

    // Bước 2 — fetch với Authorization header
    const headers: Record<string, string> = {
        ...(options.headers as Record<string, string> ?? {}),
        ...(_accessToken ? { Authorization: `Bearer ${_accessToken}` } : {}),
    };
    /// ✅ Thêm log ở đây — trước khi fetch
    console.log("=== fetchWithAuth gửi request ===");
    console.log("URL:", url);
    console.log("Method:", options.method ?? "GET");
    console.log("Authorization header:", `Bearer ${_accessToken?.slice(0, 30)}...`);
    console.log("_accessToken exp:", _accessToken ? getTokenExpiry(_accessToken) : "null");
    console.log("Thời gian hiện tại (unix):", Math.floor(Date.now() / 1000));
    let res = await fetch(url, {
        ...options,
        headers,
        credentials: "include",
    });

    // Bước 3 — vẫn 401 (token hết hạn đúng lúc) → refresh và retry 1 lần
    if (res.status === 401) {
        console.log("⚠️ 401 sau fetch → thử refresh và retry...");
        const ok = await doRefresh();
        if (ok) {
            res = await fetch(url, {
                ...options,
                headers: {
                    ...headers,
                    ...(_accessToken ? { Authorization: `Bearer ${_accessToken}` } : {}),
                },
                credentials: "include",
            });
        } else {
            console.log("❌ Refresh thất bại → redirect login");
            window.location.href = "/admin/login";
        }
    }

    return res;
}