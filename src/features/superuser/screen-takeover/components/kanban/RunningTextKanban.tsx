"use client";

import dayjs from "dayjs";

import KanbanCard from "./KanbanCard";
import KanbanScreenTakeoverContainer from "./KanbanScreenTakeoverContainer";
import { dummyByRequestType } from "../../dummy";

type TRunningTextKanban = {
    onAccept: (id: string) => void;
    onReject: (id: string) => void;
}

function RunningTextKanban({ onAccept, onReject }: TRunningTextKanban) {
    return (
        <KanbanScreenTakeoverContainer
            type="running_text"
            data={dummyByRequestType.running_text}
            CardComponent={(_data) => (
                <KanbanCard
                    key={_data?.id || ""}
                    contentType="text"
                    donationAmount={Number(_data?.donation_amount)?.toLocaleString()}
                    status={_data.status as "pending" | "approved" | "rejected"}
                    table={`T${_data?.table_number?.toString()}`}
                    time={dayjs(_data?.created_at).format("HH:mm A")}
                    user={_data?.customer_name || ""}
                    onAccept={() => onAccept(_data?.id?.toString())}
                    onReject={() => onReject(_data?.id?.toString())}
                    textContent={{
                        content: _data?.message
                    }}
                />
            )}
        />
    )
}

export default RunningTextKanban
