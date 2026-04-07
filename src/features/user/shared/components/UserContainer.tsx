"use client";

import type { ReactNode } from "react";

import { useColor } from "@/hooks/color";

type TUserContainer = {
    children: ReactNode;
}

function UserContainer({ children }: TUserContainer) {
    const { DARKBG } = useColor();

    return (

        // <div className="w-full h-screen fixed overflow-y-auto bg-gradient-to-tr from-[#110232] via-[#110232] to-[#2B1840] p-6 max-w-4xl md:left-1/2 md:right-1/2 md:-translate-x-1/2 scroll-smooth">
        //     {children}
        // </div>
        <div className="mx-auto p-6 max-w-4xl scroll-smooth" style={{
            backgroundColor: DARKBG
        }}>
            {children}
        </div>
    )
}

export default UserContainer;
