"use client";

import type { ReactNode } from "react";

import { usePathname, useRouter } from "next/navigation";

import classNames from "classnames";

import { useTopLoader } from "nextjs-toploader";

import { useColor } from "@/hooks/color";

type TUserContainer = {
    children: ReactNode;
    isDj?: boolean;
}

const USERS_MENU: { icon: string; href: string; }[] = [
    { icon: "tabler-tools-kitchen", href: "/user/menus" },
    { icon: "tabler-screen-share", href: "/user/screen-takeover" },
    { icon: "tabler-music", href: "/user/song-request" },
    { icon: "tabler-dice", href: "/user/games" }
]

function UserContainer({ children, isDj }: TUserContainer) {
    const { DARKBG } = useColor();

    const loader = useTopLoader();
    const router = useRouter();
    const pathname = usePathname();

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
                    className="w-full p-6 bg-white fixed bottom-0 h-16 grid grid-cols-4 left-1/2 right-1/2 -translate-x-1/2 max-w-4xl rounded-t-xl border-t border-gray-600"
                    style={{
                        backgroundColor: DARKBG
                    }}
                >
                    <>
                        {USERS_MENU.map((menu, i) => (
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
                        ))}
                    </>
                </nav>
            ) : null}
        </div>
    )
}

export default UserContainer;
