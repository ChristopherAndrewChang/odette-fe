"use client";

import type { ReactNode } from "react";

import { Card, Typography } from "@mui/material";

type TAppLayout = {
    title: string;
    children: ReactNode;
    fullContainer?: boolean;
};

function AppLayout({ children, title, fullContainer }: TAppLayout) {
    return (
        <>
            {!fullContainer && (
                <Typography
                    className='text-2xl mb-6 font-bold'
                    sx={{
                        color: theme => theme.palette.common.black
                    }}
                >
                    {title}
                </Typography>
            )}

            {fullContainer ? (
                <Card className="p-6">
                    <Typography
                        className='text-xl mb-8 font-bold'
                        sx={{
                            color: theme => theme.palette.common.black
                        }}
                    >
                        {title}
                    </Typography>
                    {children}
                </Card>
            ) : children}
        </>
    )
}

export default AppLayout
