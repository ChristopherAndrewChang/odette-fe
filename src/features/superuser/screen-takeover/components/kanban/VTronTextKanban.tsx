"use client";

import dayjs from "dayjs";

import KanbanCard from "./KanbanCard";
import KanbanScreenTakeoverContainer from "./KanbanScreenTakeoverContainer";
import { dummyByRequestType } from "../../dummy";

function VTronTextKanban() {
    return (
        <KanbanScreenTakeoverContainer
            type="vtron_text"
            data={dummyByRequestType.vtron_text}
            CardComponent={(data) => (
                <KanbanCard
                    contentType="text"
                    donationAmount={Number(data?.donation_amount)?.toLocaleString() || ""}
                    status={data.status as any} // TODO: make the data.status type for enum, not string
                    table={data?.table_number?.toString()}
                    time={dayjs(data?.created_at).format("HH:mm A")}
                    user={data?.customer_name || ""}
                    onAccept={() => { }}
                    onReject={() => { }}
                    textContent={{
                        content: data?.message || ""
                    }}
                />
            )}
        />
    )
}

export default VTronTextKanban;
