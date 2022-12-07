import React from "react";
import { AuthProvider } from "./AuthContext";

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AppProvider;
