import { ReactNode } from "react";

export interface AuthContextType {
  isAuthenticated: boolean | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
  isLoading: boolean;
  currentUser?: Record<string, any> | null;
  setCurrentUser?: React.Dispatch<
    React.SetStateAction<Record<string, any> | null>
  >;
}

interface AuthProviderProps {
  children: ReactNode;
}
