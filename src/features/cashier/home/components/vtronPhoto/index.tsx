"use client";

import dayjs from "dayjs";

import ScreenTakeoverContainer from "../ScreenTakeoverContainer";
import KanbanCard from "../KanbanCard";
import type { TScreenTakeover } from "@/features/superuser/screen-takeover/types/screen-takeover";

type TVtronPhotoSlot = {
    onMarkBilled: (screen: TScreenTakeover) => void;
}

function VtronPhotoSlot({ onMarkBilled }: TVtronPhotoSlot) {
    return (
        <>
            <ScreenTakeoverContainer
                content_type="vtron_photo"
                CardComponent={(screen) => (
                    <KanbanCard
                        donation_amount={Number(screen?.donation_amount)?.toLocaleString()}
                        status={screen?.status}
                        table={screen?.table_number?.toString()}
                        time={dayjs(screen.created_at).format("DD/MM/YYYY HH:mm A")}
                        title={screen?.message}
                        type="running_text"
                        user={screen?.customer_name}
                        onMarkBilled={() => {
                            onMarkBilled(screen);
                        }}
                        mediaData={{
                            mediaUrl: screen?.media_file || ""
                        }}
                        is_billed={screen?.is_billed}
                    />
                )}
            />
        </>
    )
}

export default VtronPhotoSlot;
