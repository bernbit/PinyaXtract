import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Types
import { AuthContextType, AuthProviderProps } from "@/types/AuthContext";

//Loader
import Loader from "@/components/Loader";

//* Create a Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//* Configure AuthContext
export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState<Record<string, any> | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true); // Track loading state

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const currentUserJSON = await AsyncStorage.getItem("currentUser");
        const currentUserParse: Record<string, any> =
          currentUserJSON != null ? JSON.parse(currentUserJSON) : null;

        const isAuthenticatedJSON =
          await AsyncStorage.getItem("isAuthenticated");
        const isAuthenticatedParse: boolean =
          isAuthenticatedJSON != null ? JSON.parse(isAuthenticatedJSON) : false;

        setCurrentUser(currentUserParse);
        setIsAuthenticated(isAuthenticatedParse);
      } catch (error) {
        // error reading value
      } finally {
        setIsLoading(false); // Mark as loaded
      }
    };

    getCurrentUser();
  }, []);

  // // !Important
  // if (isLoading || isAuthenticated === null) {
  //   return <Loader />;
  // }

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    currentUser,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <Loader /> : children}
    </AuthContext.Provider>
  );
}

//* Create Custom Hook- useAuth
export default function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
