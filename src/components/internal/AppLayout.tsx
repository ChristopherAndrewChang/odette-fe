"use client"

import { type ReactNode } from "react";

import { Typography } from "@mui/material"

type TAppLayout = {
    title: string;
    children: ReactNode;
    renderAction?: ReactNode;
}

function AppLayout({ title, children, renderAction }: TAppLayout) {
    return (
        <>
            {/* <p className="w-full text-end mb-2 text-gray-500">{isFetching ? "Fetching IP Data..." : `IP: ${data?.data?.ip}`}</p> */}
            <div className='bg-white p-6 !pb-0 rounded-lg border'>
                <div className="flex justify-between items-center mb-6">
                    <Typography className="text-xl font-poppins text-black">{title}</Typography>
                    <div className="flex gap-2 items-center">
                        {renderAction}
                        {/* <div className="flex items-center gap-2 bg-green-50 px-2 py-1 rounded-lg border border-green-300">
                            <div className="w-2 h-2 rounded-full bg-green-600" />
                            {isFetching ? <CircularProgress size={18} className="text-green-600" /> : (
                                <Typography>IP: {data?.data?.ip}</Typography>
                            )}
                        </div> */}
                    </div>
                </div>
                {children}
            </div>
        </>
    )
}

export default AppLayout
