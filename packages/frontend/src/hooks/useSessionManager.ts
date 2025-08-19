import { useCallback } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface JWTPayload {
  userId: string;
  email: string;
  name: string;
  company?: string;
  exp: number;
  iat: number;
}

export const useSessionManager = () => {
  const saveToken = useCallback((token: string) => {
    Cookies.set("authToken", token, {
      expires: 7,
      secure: import.meta.env.PROD,
      sameSite: "strict",
    });
  }, []);

  const getToken = useCallback((): string | null => {
    return Cookies.get("authToken") || null;
  }, []);

  const removeToken = useCallback(() => {
    Cookies.remove("authToken");
  }, []);

  const isTokenValid = useCallback((): boolean => {
    const token = getToken();

    if (!token) return false;

    try {
      const decoded = jwtDecode<JWTPayload>(token);
      const currentTime = Date.now() / 1000;

      return decoded.exp > currentTime;
    } catch {
      return false;
    }
  }, [getToken]);

  const getUserFromToken = useCallback(() => {
    const token = getToken();

    if (!token || !isTokenValid()) return null;

    try {
      const decoded = jwtDecode<JWTPayload>(token);

      return {
        id: decoded.userId,
        email: decoded.email,
        name: decoded.name,
        company: decoded.company,
      };
    } catch {
      return null;
    }
  }, [getToken, isTokenValid]);

  const isAuthenticated = useCallback((): boolean => {
    return isTokenValid();
  }, [isTokenValid]);

  const getTokenTimeRemaining = useCallback((): number => {
    const token = getToken();

    if (!token) return 0;

    try {
      const decoded = jwtDecode<JWTPayload>(token);
      const currentTime = Date.now() / 1000;

      return Math.max(0, decoded.exp - currentTime);
    } catch {
      return 0;
    }
  }, [getToken]);

  return {
    saveToken,
    getToken,
    removeToken,
    isTokenValid,
    getUserFromToken,
    isAuthenticated,
    getTokenTimeRemaining,
  };
};
