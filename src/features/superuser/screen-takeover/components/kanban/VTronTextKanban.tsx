"use client";

import dayjs from "dayjs";

import KanbanCard from "./KanbanCard";
import KanbanScreenTakeoverContainer from "./KanbanScreenTakeoverContainer";

type TVTronTextKanban = {
    onAccept: (id: string) => void;
    onReject: (id: string) => void;
    onMarkPlayed: (id: string) => void;
}

function VTronTextKanban({ onAccept, onReject, onMarkPlayed }: TVTronTextKanban) {
    return (
        <KanbanScreenTakeoverContainer
            type="vtron_text"
            CardComponent={(data) => (
                <KanbanCard
                    contentType="text"
                    donationAmount={Number(data?.donation_amount)?.toLocaleString() || ""}
                    status={data.status as any} // TODO: make the data.status type for enum, not string
                    table={data?.table_number?.toString()}
                    time={dayjs(data?.created_at).format("DD/MM/YYYY HH:mm A")}
                    user={data?.customer_name || ""}
                    onAccept={() => onAccept(data?.id?.toString())}
                    onReject={() => onReject(data?.id?.toString())}
                    onMarkPlayed={() => onMarkPlayed(data?.id?.toString())}
                    textContent={{
                        content: data?.message || ""
                    }}
                />
            )}
        />
    )
}

export default VTronTextKanban;
