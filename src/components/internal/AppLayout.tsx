"use client"

import type { ReactNode } from "react";

import { Typography } from "@mui/material"

type TAppLayout = {
    title: string;
    children: ReactNode;
}

function AppLayout({ title, children }: TAppLayout) {
    return (
        <div className='bg-white p-6 rounded-lg border'>
            <Typography className="text-xl mb-6 font-poppins text-black">{title}</Typography>
            {children}
        </div>
    )
}

export default AppLayout
