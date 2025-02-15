/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ReactNode, useEffect } from "react";
import { ThemeProvider } from "./components/theme-provider";
import { useAuthStore } from "./lib/store/authStore";


interface userType {
  ok: boolean;
  data: string | null;
  error: string | null;
}
export function Providers({ children , user}: { children: ReactNode, user : userType }) {
  const setState = useAuthStore().setUser;
  useEffect(()=>{
    setState(user.data)
  }, [user])
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
