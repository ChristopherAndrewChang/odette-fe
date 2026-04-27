"use client";

import dayjs from "dayjs";

import ScreenTakeoverContainer from "../ScreenTakeoverContainer";
import KanbanCard from "../KanbanCard";

function VtronTextSlot() {
    return (
        <>
            <ScreenTakeoverContainer
                content_type="vtron_text"
                CardComponent={(screen) => (
                    <KanbanCard
                        donation_amount={Number(screen?.donation_amount)?.toLocaleString()}
                        status={screen?.status}
                        table={screen?.table_number?.toString()}
                        time={dayjs(screen.created_at).format("HH:mm A")}
                        title={screen?.message}
                        type="vtron_text"
                        user={screen?.customer_name}
                    />
                )}
            />
        </>
    )
}

export default VtronTextSlot;
