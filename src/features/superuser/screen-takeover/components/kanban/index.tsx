"use client";

import type { ReactNode } from "react";

import { CustomTextField } from "@ozanplanviu/planviu-core";

type TKanbanScreenTakeover = {
    runningTextSlot?: {
        content: ReactNode;
        searchValue?: string;
        onSearch?: (value: string) => void;
    };
    vtronTextSlot?: {
        content: ReactNode;
        searchValue?: string;
        onSearch?: (value: string) => void;
    };
    vtronImageSlot?: {
        content: ReactNode;
        searchValue?: string;
        onSearch?: (value: string) => void;
    };
    vtronVideoSlot?: {
        content: ReactNode;
        searchValue?: string;
        onSearch?: (value: string) => void;
    };
}

function KanbanScreenTakeover({ runningTextSlot, vtronImageSlot, vtronTextSlot, vtronVideoSlot }: TKanbanScreenTakeover) {
    return (
        <div className="grid grid-cols-2 mt-6">
            {/* card */}
            <div className="border-x border-b-2 p-6 flex flex-col gap-2">
                <p className="font-poppins text-black font-semibold">RUNNING TEXT</p>
                <CustomTextField
                    placeholder="Search"
                    className="my-2"
                    value={runningTextSlot?.searchValue}
                    onChange={(e) => {
                        runningTextSlot?.onSearch && runningTextSlot?.onSearch(e.target.value);
                    }}
                />
                {runningTextSlot?.content || null}
            </div>

            <div className="border-x p-6 border-b-2 flex flex-col gap-2">
                <p className="font-poppins text-black font-semibold">VTRON TEXT</p>
                <CustomTextField
                    placeholder="Search"
                    className="my-2"
                    value={vtronTextSlot?.searchValue}
                    onChange={(e) => {
                        vtronTextSlot?.onSearch && vtronTextSlot?.onSearch(e.target.value);
                    }}
                />
                {vtronTextSlot?.content || null}
            </div>

            <div className="border-x p-6 flex flex-col gap-2">
                <p className="font-poppins text-black font-semibold">VTRON IMAGE</p>
                <CustomTextField
                    placeholder="Search"
                    className="my-2"
                    value={vtronImageSlot?.searchValue}
                    onChange={(e) => {
                        vtronImageSlot?.onSearch && vtronImageSlot?.onSearch(e.target.value);
                    }}
                />
                {vtronImageSlot?.content || null}
            </div>

            <div className="border-x p-6 flex flex-col gap-2">
                <p className="font-poppins text-black font-semibold">VTRON VIDEO</p>
                <CustomTextField
                    placeholder="Search"
                    className="my-2"
                    value={vtronVideoSlot?.searchValue}
                    onChange={(e) => {
                        vtronVideoSlot?.onSearch && vtronVideoSlot?.onSearch(e.target.value);
                    }}
                />
                {vtronVideoSlot?.content || null}
            </div>
        </div>
    )
}

export default KanbanScreenTakeover;
