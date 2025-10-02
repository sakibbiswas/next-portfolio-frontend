
const ACCESS_TOKEN_KEY = "access_token";
const USER_KEY = "user_data";

// Save token
export const setAccessToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }
};

// Get token
export const getAccessToken = (): string | null => {
  if (typeof window !== "undefined") return localStorage.getItem(ACCESS_TOKEN_KEY);
  return null;
};

// Clear auth
export const clearAuth = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    // Dispatch userChanged event
    window.dispatchEvent(new Event("userChanged"));
  }
};

// Save user
export const setUser = (user: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    // Dispatch userChanged event
    window.dispatchEvent(new Event("userChanged"));
  }
};

// Get user
export const getUser = (): any | null => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }
  return null;
};

// Check if logged in
export const isLoggedIn = (): boolean => !!getAccessToken();
