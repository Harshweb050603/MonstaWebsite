import axios from "axios";

let accessToken = null;
let tokenChangeListener = null;

// Access Token update
export const updateAccessToken = (token) => {
    accessToken = token;

    // AuthContext ko bhi updated token ki information milegi
    tokenChangeListener?.(token);
};

// AuthContext ko subscribe karne ke liye
export const subscribeToAccessToken = (listener) => {
    tokenChangeListener = listener;

    return () => {
        if (tokenChangeListener === listener) {
            tokenChangeListener = null;
        }
    };
};

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

// 1. Request Interceptor
api.interceptors.request.use(
    (config) => {
        // Refresh API par purana access token nahi bhejna
        if (
            accessToken &&
            !config.url?.includes("/api/auth/refresh_token")
        ) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);


// 2. Response Interceptor

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((request) => {
        if (error) {
            request.reject(error);
        } else {
            request.resolve(token);
        }
    });

    failedQueue = [];
};

api.interceptors.response.use(
    (response) => {
        return response;
    },

    async (error) => {
        const originalRequest = error.config;

        const requestUrl = originalRequest?.url || "";

        const isLoginRequest = requestUrl.includes("/api/auth/login");
        const isRefreshRequest = requestUrl.includes("/api/auth/refresh_token");

        // Sirf 401 response par refresh try karna hai
        if (
            error.response?.status !== 401 ||
            !originalRequest ||
            originalRequest._retry ||
            isLoginRequest ||
            isRefreshRequest
        ) {
            return Promise.reject(error);
        }

        // Same request ko baar-baar retry hone se rokna
        originalRequest._retry = true;

        // Agar refresh already chal raha hai, toh wait karo
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
                .then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;

                    return api(originalRequest);
                });
        }

        isRefreshing = true;

        try {
            // Refresh API call
            const response = await api.post(
                "/api/auth/refresh_token"
            );

            const newAccessToken = response.data.accessToken;

            if (!newAccessToken) {
                throw new Error("New access token not received");
            }

            // New token update karo
            updateAccessToken(newAccessToken);

            // Waiting requests ko new token do
            processQueue(null, newAccessToken);

            // Original failed request ko new token ke saath retry karo
            originalRequest.headers.Authorization =
                `Bearer ${newAccessToken}`;

            return api(originalRequest);

        } catch (refreshError) {

            processQueue(refreshError, null);

            // Refresh fail hone par frontend session clear karo
            updateAccessToken(null);

            return Promise.reject(refreshError);

        } finally {
            isRefreshing = false;
        }
    }
);

export default api;