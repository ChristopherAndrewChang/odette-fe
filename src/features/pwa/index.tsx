"use client";

import { useRouter } from "next/navigation";

import { Button } from "@mui/material";

import { useTopLoader } from "nextjs-toploader";

import Logo from "@/components/layout/shared/Logo";
import { useColor } from "@/hooks/color";
import { APP_URL } from "@/data/internal/app-route";
import { useIsPWA } from "@/hooks/pwa";

function PWAPage() {
    const route = useRouter();
    const loader = useTopLoader();
    const isPWA = useIsPWA();

    const onRoute = (_route: string) => {
        route.push(_route);
        loader.start();
    }

    const { DARKBG } = useColor();

    if (!isPWA) {
        return (
            <p className="font-poppins">This page only can access while in PWA mode</p>
        )
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center p-4" style={{
            backgroundColor: DARKBG
        }}>
            <div className="mb-4">
                <Logo noText />
            </div>

            <div className="p-4 bg-blue-950 rounded-lg border border-blue-900">
                <p className="text-center text-2xl font-semibold text-blue-500 font-poppins">Hello 👋</p>
                <p className="text-center text-sm text-blue-500 mt-1 font-poppins">Currently, You are using Odette App in PWA mode.</p>
            </div>
            <p className="mt-6 text-gray-400 font-poppins">{"Please choose how you'd like to continue."}</p>

            <div className="flex gap-2 mt-4">
                <Button
                    onClick={() => onRoute(APP_URL.USER_SCAN.INDEX)}
                    variant="contained"
                    className="bg-white text-black font-poppins"
                >I am a Visitor</Button>
                <Button
                    onClick={() => onRoute(APP_URL.GUEST_LOGIN.INDEX)}
                    variant="outlined"
                    className="border-white text-white font-poppins"
                >I am a Staff</Button>
            </div>
        </div>
    )
}

export default PWAPage;
