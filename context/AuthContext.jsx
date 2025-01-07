import React, { createContext, useContext, useEffect, useState } from "react";

//* Create a Context
const AuthContext = createContext();

//* Configure AuthContext
export function AuthProvider({ children }) {
  const value = {};

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

//* Create Custom Hook- useAuth
export default function useAuth() {
  return useContext(AuthContext);
}
