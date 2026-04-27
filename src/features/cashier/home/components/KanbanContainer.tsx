'use client';

import type { ReactNode } from "react";

type TKanbanContainer = {
    songRequestSlot: ReactNode;
    runningTextSlot: ReactNode;
    vtronTextSlot: ReactNode;
    vtronImageSlot: ReactNode;
    vtronVideoSlot: ReactNode;
}

function KanbanContainer({ songRequestSlot, runningTextSlot, vtronImageSlot, vtronTextSlot, vtronVideoSlot }: TKanbanContainer) {
    return (
        <div className="flex overflow-x-scroll">
            <section className="min-w-72 border-r border-r-gray-700 p-2">
                {songRequestSlot}
            </section>
            <section className="min-w-72 border-r border-r-gray-700 p-2">
                {runningTextSlot}
            </section>
            <section className="min-w-72 border-r border-r-gray-700 p-2">
                {vtronTextSlot}
            </section>
            <section className="min-w-72 border-r border-r-gray-700 p-2">
                {vtronImageSlot}
            </section>
            <section className="min-w-72 border-r border-r-gray-700 p-2">
                {vtronVideoSlot}
            </section>
        </div>
    )
}

export default KanbanContainer
