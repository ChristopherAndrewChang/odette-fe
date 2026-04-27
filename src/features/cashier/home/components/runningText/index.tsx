"use client";

import dayjs from "dayjs";

import ScreenTakeoverContainer from "../ScreenTakeoverContainer";
import KanbanCard from "../KanbanCard";

function RunningTextSlot() {
    return (
        <>
            <ScreenTakeoverContainer
                content_type="running_text"
                CardComponent={(screen) => (
                    <KanbanCard
                        donation_amount={Number(screen?.donation_amount)?.toLocaleString()}
                        status={screen?.status}
                        table={screen?.table_number?.toString()}
                        time={dayjs(screen.created_at).format("HH:mm A")}
                        title={screen?.message}
                        type="running_text"
                        user={screen?.customer_name}
                    />
                )}
            />
        </>
    )
}

export default RunningTextSlot;
