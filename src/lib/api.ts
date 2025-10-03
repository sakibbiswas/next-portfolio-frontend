// import { getAccessToken } from "./auth";

// export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// interface ApiOptions extends RequestInit {
//   isForm?: boolean; // flag for FormData
// }

// export const apiFetch = async (url: string, options: ApiOptions = {}) => {
//   const token = getAccessToken();

//   const headers: HeadersInit = {
//     ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     ...(options.isForm ? {} : { "Content-Type": "application/json" }),
//     ...options.headers,
//   };

//   const res = await fetch(`${BASE_URL}${url}`, {
//     ...options,
//     headers,
//   });

//   if (!res.ok) {
//     const errorData = await res.json().catch(() => ({}));
//     throw new Error(errorData.message || "API Error");
//   }

//   return res.json();
// };













// lib/api.ts
import { getAccessToken } from "./auth";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface ApiOptions extends RequestInit {
  isForm?: boolean;
}

export const apiFetch = async (url: string, options: ApiOptions = {}) => {
  const token = getAccessToken();

  const headers: HeadersInit = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.isForm ? {} : { "Content-Type": "application/json" }),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    // try to parse JSON error, but fall back to status text
    const errorData = await res.json().catch(() => null);
    const message = errorData?.message || res.statusText || "API Error";
    throw new Error(message);
  }

  // try to parse json, but if no content return null
  if (res.status === 204) return null;
  return res.json();
};
