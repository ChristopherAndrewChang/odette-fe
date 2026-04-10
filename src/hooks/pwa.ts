"use client";

import { useEffect, useState } from "react";

export function useIsPWA() {
    const [isPWA, setIsPWA] = useState<boolean>(false);

    useEffect(() => {
        // Cek apakah mode tampilannya adalah 'standalone' (PWA standar)
        const isStandalone = window.matchMedia("(display-mode: standalone)").matches;

        // Fallback khusus untuk iOS Safari lama yang menggunakan navigator.standalone
        // @ts-ignore - mengabaikan error TS karena navigator.standalone non-standar
        const isIOSStandalone = window.navigator.standalone === true;

        if (isStandalone || isIOSStandalone) {
            setIsPWA(true);
        }
    }, []);

    return isPWA;
}
