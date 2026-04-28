"use client";

import type { ReactNode } from "react";

type TKanbanContainer = {
    pending: ReactNode;
    dj: ReactNode;
    djApproveds: ReactNode;
}

function KanbanContainer({ djApproveds, dj, pending }: TKanbanContainer) {
    return (
        <div className="grid grid-cols-3">
            {/* section */}
            <div className="border-x p-4 flex flex-col gap-2">
                <p className="font-semibold text-black mb-4">PENDING</p>

                {/* scrollable area */}
                <div className="max-h-[50vh] overflow-auto flex flex-col gap-4">
                    {pending}
                </div>
            </div>

            {/* section 2 */}
            <div className="border-x p-4 flex flex-col gap-2">
                <p className="font-semibold text-black mb-4">WITH DJ</p>

                {/* scrollable area */}
                <div className="max-h-[50vh] overflow-auto flex flex-col gap-4">
                    {dj}
                </div>
            </div>

            {/* section 3 */}
            <div className="border-x p-4 flex flex-col gap-2">
                <p className="font-semibold text-black mb-4">DJ APPROVED</p>

                {/* scrollable area */}
                <div className="max-h-[50vh] overflow-auto flex flex-col gap-4">
                    {djApproveds}
                </div>
            </div>
        </div>
    )
}

export default KanbanContainer
