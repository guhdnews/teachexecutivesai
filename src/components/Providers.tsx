"use client";

import { ReactNode } from "react";
import { AuthProvider, UserProvider } from "@/contexts";
import { Toaster } from "sonner";

export function Providers({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <UserProvider>
                {children}
                <Toaster
                    position="top-center"
                    richColors
                    closeButton
                    toastOptions={{
                        duration: 5000,
                        className: "text-base",
                    }}
                />
            </UserProvider>
        </AuthProvider>
    );
}
