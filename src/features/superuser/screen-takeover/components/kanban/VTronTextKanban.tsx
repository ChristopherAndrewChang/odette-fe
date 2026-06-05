"use client";

import dayjs from "dayjs";

import { CustomTextField } from "@ozanplanviu/planviu-core";

import KanbanCard from "./KanbanCard";
import KanbanScreenTakeoverContainer from "./KanbanScreenTakeoverContainer";

type TVTronTextKanban = {
    compact?: boolean;
    onAccept: (id: string) => void;
    onReject: (id: string) => void;
    onMarkPlayed: (id: string) => void;
}

function VTronTextKanban({ compact, onAccept, onReject, onMarkPlayed }: TVTronTextKanban) {
    return (
        <KanbanScreenTakeoverContainer
            title="VTRON TEXT"
            type="vtron_text"
            SearchComponent={(search, setSearch) => (
                <CustomTextField
                    placeholder="Search"
                    className="my-2 w-full"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
            )}
            CardComponent={(data) => (
                <KanbanCard
                    contentType="text"
                    compact={compact}
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
