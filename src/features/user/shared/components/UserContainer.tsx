"use client";

import type { ReactNode } from "react";

type TUserContainer = {
    children: ReactNode;
}

function UserContainer({ children }: TUserContainer) {
    return (
        <div className="w-full h-screen fixed overflow-y-auto bg-gradient-to-tr from-[#110232] via-[#110232] to-[#2B1840] p-6 max-w-4xl md:left-1/2 md:right-1/2 md:-translate-x-1/2 scroll-smooth">
            {children}
        </div>
    )
}

export default UserContainer;
