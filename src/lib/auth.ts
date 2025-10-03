
// import { User } from "../types/user";

// const ACCESS_TOKEN_KEY = "access_token";
// const USER_KEY = "user_data";

// // Save token
// export const setAccessToken = (token: string) => {
//   if (typeof window !== "undefined") {
//     localStorage.setItem(ACCESS_TOKEN_KEY, token);
//   }
// };

// // Get token
// export const getAccessToken = (): string | null => {
//   if (typeof window !== "undefined") return localStorage.getItem(ACCESS_TOKEN_KEY);
//   return null;
// };

// // Clear auth
// export const clearAuth = () => {
//   if (typeof window !== "undefined") {
//     localStorage.removeItem(ACCESS_TOKEN_KEY);
//     localStorage.removeItem(USER_KEY);

//     // Dispatch userChanged event
//     window.dispatchEvent(new Event("userChanged"));
//   }
// };

// // Save user
// export const setUser = (user: User) => {
//   if (typeof window !== "undefined") {
//     localStorage.setItem(USER_KEY, JSON.stringify(user));

//     // Dispatch userChanged event
//     window.dispatchEvent(new Event("userChanged"));
//   }
// };

// // Get user
// export const getUser = (): User | null => {
//   if (typeof window !== "undefined") {
//     const user = localStorage.getItem(USER_KEY);
//     return user ? (JSON.parse(user) as User) : null;
//   }
//   return null;
// };

// // Check if logged in
// export const isLoggedIn = (): boolean => !!getAccessToken();













// lib/auth.ts
import { User } from "../types/user";

const ACCESS_TOKEN_KEY = "accessToken";
const USER_KEY = "user";

export const setAccessToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    window.dispatchEvent(new Event("userChanged"));
  }
};

export const getAccessToken = (): string | null => {
  if (typeof window !== "undefined") return localStorage.getItem(ACCESS_TOKEN_KEY);
  return null;
};

export const clearAuth = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    window.dispatchEvent(new Event("userChanged"));
  }
};

export const setUser = (user: User) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event("userChanged"));
  }
};

export const getUser = (): User | null => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem(USER_KEY);
    return user ? (JSON.parse(user) as User) : null;
  }
  return null;
};

export const isLoggedIn = (): boolean => !!getAccessToken();

