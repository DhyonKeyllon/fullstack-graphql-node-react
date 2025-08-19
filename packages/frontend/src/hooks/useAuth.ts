import { useCallback } from "react";

import { useAuth as useAuthContext } from "../contexts/AuthContext";

export const useAuth = () => {
  const auth = useAuthContext();

  const hasPermission = useCallback(
    (_permission: string): boolean => {
      return auth.isAuthenticated;
    },
    [auth.isAuthenticated],
  );

  const belongsToCompany = useCallback(
    (company: string): boolean => {
      return auth.user?.company === company;
    },
    [auth.user?.company],
  );

  const getUserInitials = useCallback((): string => {
    if (!auth.user?.name) return "";

    return auth.user.name
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }, [auth.user?.name]);

  const getDisplayName = useCallback((): string => {
    if (!auth.user?.name) return "";

    const names = auth.user.name.split(" ");
    if (names.length === 1) return names[0];

    return `${names[0]} ${names[names.length - 1]}`;
  }, [auth.user?.name]);

  return {
    ...auth,
    hasPermission,
    belongsToCompany,
    getUserInitials,
    getDisplayName,
  };
};
