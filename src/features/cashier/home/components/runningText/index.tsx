"use client";

import dayjs from "dayjs";

import ScreenTakeoverContainer from "../ScreenTakeoverContainer";
import KanbanCard from "../KanbanCard";
import type { TScreenTakeover } from "@/features/superuser/screen-takeover/types/screen-takeover";

type TRunningTextSlot = {
    onMarkBilled: (screen: TScreenTakeover) => void;
}

function RunningTextSlot({ onMarkBilled }: TRunningTextSlot) {
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
                        onMarkBilled={() => {
                            onMarkBilled(screen);
                        }}
                        is_billed={screen?.is_billed}
                    />
                )}
            />
        </>
    )
}

export default RunningTextSlot;
