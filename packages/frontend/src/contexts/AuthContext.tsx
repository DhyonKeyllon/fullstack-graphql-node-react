import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";

import { useMutation } from "@apollo/client";

import {
  AuthContextType,
  AuthState,
  AuthAction,
  User,
  LoginResult,
} from "../types/auth";
import { LOGIN_MUTATION } from "../graphql/auth";
import { clearApolloCache } from "../lib/apollo";
import { useSessionManager } from "../hooks/useSessionManager";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };

    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const sessionManager = useSessionManager();

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = sessionManager.getUserFromToken();

        if (storedUser) {
          dispatch({ type: "SET_USER", payload: storedUser });
        } else {
          dispatch({ type: "SET_USER", payload: null });
        }
      } catch (error) {
        dispatch({ type: "SET_USER", payload: null });
      }
    };

    initializeAuth();
  }, []);

  const login = async (
    email: string,
    password: string,
  ): Promise<LoginResult> => {
    dispatch({ type: "LOGIN_START" });

    try {
      const { data } = await loginMutation({
        variables: { email, password },
      });

      if (data?.login?.success && data.login.user && data.login.token) {
        const user: User = data.login.user;
        const token: string = data.login.token;

        sessionManager.saveToken(token);

        dispatch({ type: "LOGIN_SUCCESS", payload: user });

        return {
          success: true,
          message: data.login.message,
          user,
          token,
        };
      } else {
        dispatch({ type: "LOGIN_FAILURE" });

        return {
          success: false,
          message: data?.login?.message || "Erro ao fazer login",
        };
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });

      return {
        success: false,
        message:
          "Erro de conexão com o servidor. Verifique se o backend está executando.",
      };
    }
  };

  const logout = () => {
    sessionManager.removeToken();

    clearApolloCache();

    dispatch({ type: "LOGOUT" });
  };

  const value: AuthContextType = {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
};
