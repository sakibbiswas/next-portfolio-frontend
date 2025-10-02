"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import Toast from "./ui/Toast";
import { AuthProvider } from "../context/AuthContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Toast />
        {children}
      </AuthProvider>
    </Provider>
  );
}
