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
        <div className="flex overflow-x-scroll h-full min-h-0">
            <section className="min-w-80 border-r border-r-gray-700 p-2 flex flex-col h-full min-h-0">
                {songRequestSlot}
            </section>
            <section className="min-w-80 border-r border-r-gray-700 p-2 flex flex-col h-full min-h-0">
                {runningTextSlot}
            </section>
            <section className="min-w-80 border-r border-r-gray-700 p-2 flex flex-col h-full min-h-0">
                {vtronTextSlot}
            </section>
            <section className="min-w-80 border-r border-r-gray-700 p-2 flex flex-col h-full min-h-0">
                {vtronImageSlot}
            </section>
            <section className="min-w-80 border-r border-r-gray-700 p-2 flex flex-col h-full min-h-0">
                {vtronVideoSlot}
            </section>
        </div>
    )
}

export default KanbanContainer
