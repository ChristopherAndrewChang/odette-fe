// PvProviderContainer.tsx
"use client";

import type { ReactNode } from "react";

import { PvProvider } from "@ozanplanviu/planviu-core";
import { Toaster } from "react-hot-toast";

export default function PvProviderContainer({ children }: { children: ReactNode }) {
    // Inisialisasi QueryClient DI DALAM Client Component
    // Kita pakai useState agar client tidak dibuat ulang setiap render

    return (
        <PvProvider>
            {children}
            <Toaster />
        </PvProvider>
    );
}
