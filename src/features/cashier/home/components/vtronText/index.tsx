"use client";

import dayjs from "dayjs";

import ScreenTakeoverContainer from "../ScreenTakeoverContainer";
import KanbanCard from "../KanbanCard";
import type { TScreenTakeover } from "@/features/superuser/screen-takeover/types/screen-takeover";

type TVtronTextSlot = {
    onMarkBilled: (screen: TScreenTakeover) => void;
}

function VtronTextSlot({ onMarkBilled }: TVtronTextSlot) {
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
                        onMarkBilled={() => {
                            onMarkBilled(screen);
                        }}
                        user={screen?.customer_name}
                        is_billed={screen?.is_billed}
                    />
                )}
            />
        </>
    )
}

export default VtronTextSlot;
