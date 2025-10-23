import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type User = {
  email: string;
  firstName?: string;
  lastName?: string;
  // Back-compat for previously stored shape
  name?: string;
};

type AuthContextValue = {
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
  updateUser: (partial: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "auth:user";

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as any;
        // Accept old shape { name, email } and new { firstName, lastName, email }
        if (parsed && parsed.email) setUser(parsed as User);
      }
    } catch {
      // ignore parse/storage errors
    }
  }, []);

  const signIn = (next: User) => {
    setUser(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  };

  const signOut = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore storage errors
    }
  };

  const updateUser = (partial: Partial<User>) => {
    setUser((prev) => {
      const next = { ...(prev ?? { name: "", email: "" }), ...partial } as User;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  const value = useMemo(() => ({ user, signIn, signOut, updateUser }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};

