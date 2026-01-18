"use client";

import { ReactNode } from "react";
import { AuthProvider, UserProvider } from "@/contexts";

export function Providers({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <UserProvider>{children}</UserProvider>
        </AuthProvider>
    );
}
