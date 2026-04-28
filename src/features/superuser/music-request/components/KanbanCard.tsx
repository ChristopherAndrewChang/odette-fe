"use client";

import type { ReactNode } from "react";

type TKanbanCard = {
    title: string;
    artist: string;
    price: string;
    table: string;
    created: string;
    onAccept?: () => void;
    onReject?: () => void;
    renderComponent?: ReactNode;
}

function KanbanCard({ artist, created, price, table, title, onAccept, onReject, renderComponent }: TKanbanCard) {
    return (
        <div className="bg-gray-50 p-4 rounded-lg border">
            <div className="flex justify-between gap-4">
                <p className="font-medium text-black">{title}</p>
                <p className="text-green-600">Rp{price}</p>
            </div>
            <p className="text-sm mb-4">{artist}</p>

            {/* table identity */}
            <div className="flex items-center gap-2">
                <div className="px-4 py-1 flex items-center justify-center bg-gray-200 rounded-lg">
                    <p className="text-xs">Table {table}</p>
                </div>
                <p className="text-sm">{created}</p>
            </div>

            {renderComponent}

            {/* action */}
            <div className="grid grid-cols-2 gap-2 mt-4">
                {!!onReject ? (
                    <div onClick={onReject} className="px-4 py-2 w-full rounded-lg border bg-red-100 flex justify-center items-center cursor-pointer hover:bg-red-200">
                        <p>Reject</p>
                    </div>
                ) : null}

                {!!onAccept ? (
                    <div onClick={onAccept} className="px-4 py-2 w-full rounded-lg border bg-green-100 flex justify-center items-center cursor-pointer hover:bg-green-200">
                        <p>Accept</p>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default KanbanCard
