"use client";

import type { ReactNode } from "react";

import { usePathname, useRouter } from "next/navigation";

import classNames from "classnames";

import { useTopLoader } from "nextjs-toploader";

import { CircularProgress } from "@mui/material";

import { useColor } from "@/hooks/color";
import { useGetSettings } from "@/features/superuser/settings/hooks/settings";

type TUserContainer = {
    children: ReactNode;
    isDj?: boolean;
}

// const USERS_MENU: { icon: string; href: string; identifier: string; }[] = [
//     { icon: "tabler-tools-kitchen", href: "/user/menus", identifier: "menu_enabled" },
//     { icon: "tabler-screen-share", href: "/user/screen-takeover", identifier: "screen_request_enabled" },
//     { icon: "tabler-music", href: "/user/song-request", identifier: "song_request_enabled" },
//     { icon: "tabler-dice", href: "/user/games", identifier: "Games" }
// ]

function UserContainer({ children, isDj }: TUserContainer) {
    const { data, isFetching } = useGetSettings();

    const { DARKBG } = useColor();

    const loader = useTopLoader();
    const router = useRouter();
    const pathname = usePathname();

    const getGridValue = () => {
        const dataSettings = data?.data as Record<string, boolean>

        const keysArr = Object.keys(data?.data || {});
        const arr = [];

        keysArr?.forEach(keyArr => {
            if (dataSettings?.[keyArr]) {
                arr.push(keyArr);
            }
        })

        return arr?.length + 1; // ini buat tambah game karena game selalu show
    }

    return (

        // <div className="w-full h-screen fixed overflow-y-auto bg-gradient-to-tr from-[#110232] via-[#110232] to-[#2B1840] p-6 max-w-4xl md:left-1/2 md:right-1/2 md:-translate-x-1/2 scroll-smooth">
        //     {children}
        // </div>
        <div className="mx-auto p-6 max-w-4xl scroll-smooth mb-20" style={{
            backgroundColor: DARKBG
        }}>
            <main>
                {children}
            </main>

            {(!isDj && !pathname.startsWith("/user/home")) ? (
                <nav
                    key={pathname}
                    className="w-full p-6 bg-white fixed bottom-0 h-16 justify-between left-1/2 right-1/2 -translate-x-1/2 max-w-4xl rounded-t-xl border-t border-gray-600"
                    style={{
                        backgroundColor: DARKBG,
                        display: "grid",
                        gridTemplateColumns: `repeat(${getGridValue()}, 1fr)`
                    }}
                >
                    {isFetching ? (
                        <CircularProgress size={20} />
                    ) : (
                        <>

                            {data?.data?.menu_enabled ? (
                                <div
                                    onClick={() => {
                                        router.push("/user/menus");
                                        loader.start();
                                    }}
                                    className="flex items-center justify-center rounded-lg gap-2">
                                    <i className={classNames("tabler-tools-kitchen", "text-white", {
                                        "!text-yellow-700": (pathname.startsWith("/user/menus"))
                                    })}></i>
                                </div>
                            ) : null}

                            {data?.data?.screen_request_enabled ? (
                                <div
                                    onClick={() => {
                                        router.push("/user/screen-takeover");
                                        loader.start();
                                    }}
                                    className="flex items-center justify-center rounded-lg gap-2">
                                    <i className={classNames("tabler-screen-share", "text-white", {
                                        "!text-yellow-700": (pathname.startsWith("/user/screen-takeover"))
                                    })}></i>
                                </div>
                            ) : null}

                            {data?.data?.song_request_enabled ? (
                                <div
                                    onClick={() => {
                                        router.push("/user/song-request");
                                        loader.start();
                                    }}
                                    className="flex items-center justify-center rounded-lg gap-2">
                                    <i className={classNames("tabler-music", "text-white", {
                                        "!text-yellow-700": (pathname.startsWith("/user/song-request"))
                                    })}></i>
                                </div>
                            ) : null}

                            <div
                                onClick={() => {
                                    router.push("/user/games");
                                    loader.start();
                                }}
                                className="flex items-center justify-center rounded-lg gap-2">
                                <i className={classNames("tabler-dice", "text-white", {
                                    "!text-yellow-700": (pathname.startsWith("/user/games"))
                                })}></i>
                            </div>

                            {/* {USERS_MENU.map((menu, i) => (
                                <div
                                    onClick={() => {
                                        router.push(menu.href);
                                        loader.start();
                                    }}
                                    key={`${menu.icon}-${i}`} className="flex items-center justify-center rounded-lg gap-2">
                                    <i className={classNames(menu.icon, "text-white", {
                                        "!text-yellow-700": (pathname.startsWith(menu.href))
                                    })}></i>
                                </div>
                            ))} */}
                        </>
                    )}
                </nav>
            ) : null}
        </div>
    )
}

export default UserContainer;
