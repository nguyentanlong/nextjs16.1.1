// src/lib/fetchWithAuth.ts
let _accessToken: string | null = null;

// ✅ Cho phép AuthContext set token vào đây
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
        const res = await fetch("/api/auth/refresh", {
            method: "POST",
            credentials: "include",
        });
        if (res.ok) {
            const data = await res.json();
            if (data.accessToken) {
                _accessToken = data.accessToken; // ✅ update token local
            }
            return true;
        }
        return false;
    } catch { return false; }
}

export async function fetchWithAuth(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    // Bước 1 — kiểm tra token sắp hết hạn
    if (_accessToken && isTokenExpiringSoon(_accessToken, 60)) {
        const ok = await doRefresh();
        if (!ok) {
            window.location.href = "/admin/login";
            return new Response(null, { status: 401 });
        }
    }

    // Bước 2 — fetch với Authorization header (dùng _accessToken nếu có)
    const headers: Record<string, string> = {
        ...(options.headers as Record<string, string> ?? {}),
        ...(_accessToken ? { Authorization: `Bearer ${_accessToken}` } : {}),
    };

    let res = await fetch(url, {
        ...options,
        headers,
        credentials: "include",
    });

    // Bước 3 — vẫn 401 → refresh và retry
    if (res.status === 401) {
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
            window.location.href = "/admin/login";
        }
    }

    return res;
}