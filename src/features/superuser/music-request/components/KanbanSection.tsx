"use client";

import type { ReactNode } from "react";

import classNames from "classnames";
import { CircularProgress, useColorScheme } from "@mui/material";
import { CustomTextField } from "@ozanplanviu/planviu-core";

type TKanbanSection = {
    compact?: boolean;
    loading?: boolean;
    count: number;
    children: ReactNode;
    title: string;
    search?: string;
    onSearch?: (value: string) => void;
}

function KanbanSection({ children, compact, title, count, loading, onSearch, search }: TKanbanSection) {
    const { mode } = useColorScheme();

    return (
        <div className="border-x p-4 flex flex-col gap-2 w-full min-h-0">
            <div className="flex items-center gap-2 mb-4">
                <p className={classNames("font-semibold text-black", {
                    "!text-white": mode === "dark"
                })}>{title} ({count})</p>

                {loading ? (
                    <CircularProgress size={14} />
                ) : null}
            </div>

            <CustomTextField
                placeholder="Search here"
                value={search}
                onChange={e => !!onSearch ? onSearch(e.target.value) : null}
            />

            {/* scrollable area */}
            <div className={classNames("overflow-y-auto flex-1 flex flex-col gap-4 min-h-0", {
                "!gap-2": compact
            })}>
                {children}
            </div>
        </div>
    )
}

export default KanbanSection;
