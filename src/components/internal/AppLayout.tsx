"use client"

import { type ReactNode } from "react";

import { Typography, useColorScheme } from "@mui/material"
import classNames from "classnames";

import { colors } from "@/hooks/color";

type TAppLayout = {
    title: string;
    children: ReactNode;
    renderAction?: ReactNode;
    renderMiddleAction?: ReactNode;
    isBottomFit?: boolean;
    withMaxH?: boolean;
}

function AppLayout({ title, children, renderAction, isBottomFit, renderMiddleAction, withMaxH }: TAppLayout) {
    const { mode } = useColorScheme();

    return (
        <>
            <div

                // className={classNames('bg-white overflow-y-auto p-6 rounded-lg border flex flex-col', {
                //     "!pb-0": isBottomFit,
                //     "max-h-[85vh]": withMaxH
                // })}

                className={classNames('bg-white overflow-hidden p-4 md:p-6 rounded-lg border flex flex-col w-full min-w-0', {
                    "!pb-0": isBottomFit,
                    "h-[calc(100dvh-120px)]": withMaxH
                })}
                style={mode === "dark" ? {
                    backgroundColor: colors.DARKBLUE
                } : {}}
            >
                <div className="mb-6 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                    <Typography
                        className={classNames("text-xl font-poppins text-black", {
                            "!text-white": mode === "dark"
                        })}
                    >{title}</Typography>
                    {renderMiddleAction}
                    <div className="flex w-full items-center gap-2 xl:w-auto xl:justify-end">
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
