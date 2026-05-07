"use client";

import type { ReactNode } from "react";

import { useColorScheme } from "@mui/material";
import classNames from "classnames";

type TKanbanContainer = {
    pending: ReactNode;
    dj: ReactNode;
    djApproveds: ReactNode;
    compact?: boolean;
}

function KanbanContainer({ djApproveds, dj, pending, compact }: TKanbanContainer) {
    const { mode } = useColorScheme();

    return (
        <div className="flex overflow-auto border-t flex-1">
            {/* section */}
            <div className="border-x p-4 flex flex-col gap-2 w-full">
                <p className={classNames("font-semibold text-black mb-4", {
                    "!text-white": mode === "dark"
                })}>PENDING</p>

                {/* scrollable area */}
                <div className={classNames("overflow-auto max-h-full flex flex-col gap-4", {
                    "!gap-2": compact
                })}>
                    {pending}
                </div>
            </div>

            {/* section 2 */}
            <div className="border-x p-4 flex flex-col gap-2 w-full">
                <p className={classNames("font-semibold text-black mb-4", {
                    "!text-white": mode === "dark"
                })}>WITH DJ</p>

                {/* scrollable area */}
                <div className={classNames("overflow-auto max-h-full flex flex-col gap-4", {
                    "!gap-2": compact
                })}>
                    {dj}
                </div>
            </div>

            {/* section 3 */}
            <div className="border-x p-4 flex  flex-col gap-2 w-full">
                <p className={classNames("font-semibold text-black mb-4", {
                    "!text-white": mode === "dark"
                })}>DJ APPROVED</p>

                {/* scrollable area */}
                <div className={classNames("overflow-auto max-h-full flex flex-col gap-4", {
                    "!gap-2": compact
                })}>
                    {djApproveds}
                </div>
            </div>
        </div>
    )
}

export default KanbanContainer
