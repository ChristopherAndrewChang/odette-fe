"use client"

import { type ReactNode } from "react";

import { CircularProgress, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query";

import axios from "axios";

import type { ResponseWrapper } from "@/types/api";

type TAppLayout = {
    title: string;
    children: ReactNode;
}

const useGetIpQuery = () => {
    return useQuery<ResponseWrapper<{ ip: string; }>>({
        queryKey: ["ip-get"],
        queryFn: () => {
            return axios.get("/api/net/")
        }
    });
}

function AppLayout({ title, children }: TAppLayout) {
    const { data, isFetching } = useGetIpQuery();

    return (
        <div className='bg-white p-6 rounded-lg border'>
            <div className="flex justify-between items-center mb-6">
                <Typography className="text-xl font-poppins text-black">{title}</Typography>

                <div className="flex items-center gap-2 bg-green-50 px-2 py-1 rounded-lg border border-green-300">
                    <div className="w-2 h-2 rounded-full bg-green-600" />
                    {isFetching ? <CircularProgress size={18} className="text-green-600" /> : (
                        <Typography>IP: {data?.data?.ip}</Typography>
                    )}
                </div>
            </div>
            {children}
        </div>
    )
}

export default AppLayout
