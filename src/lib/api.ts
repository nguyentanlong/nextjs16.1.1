// src/lib/api.ts
import axios from 'axios';

// Tạo axios instance dùng chung—giúp quản lý baseURL, timeout, headers bảo mật
export const api = axios.create({
    baseURL: 'https://api.tonkliplock1000.com', // Base URL của NestJS backend
    timeout: 10_000, // Timeout để tránh treo request
    headers: {
        'Content-Type': 'application/json',
        // Có thể thêm Authorization ở đây nếu sau này có token
    },
});

// Interceptor request—có thể thêm token, trace-id, hoặc locale header
api.interceptors.request.use((config) => {
    // Ví dụ: thêm header bảo mật hoặc locale nếu cần
    // config.headers['X-Client'] = 'tonkliplock-store';
    return config;
});

// Interceptor response—chuẩn hoá lỗi, logging
api.interceptors.response.use(
    (res) => res,
    (error) => {
        // Ghi log hoặc chuyển đổi lỗi về dạng dễ hiểu
        // Ví dụ: nếu 401 thì có thể trigger refresh token (sau này)
        return Promise.reject(error);
    }
);

// Fetcher cho SWR—nhận path và trả về data
export const swrFetcher = async (path: string) => {
    const res = await api.get(path);
    return res.data;
};
