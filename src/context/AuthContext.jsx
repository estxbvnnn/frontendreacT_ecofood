import { createContext, useContext, useState } from "react";
export const AuthContext = createContext();
export function AuthProvider({ children }) {
  // Simula un usuario para pruebas
  const [user] = useState({ uid: "demo" });
  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}