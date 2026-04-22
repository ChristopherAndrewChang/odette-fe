"use client";

import dayjs from "dayjs";

import KanbanCard from "./KanbanCard";
import KanbanScreenTakeoverContainer from "./KanbanScreenTakeoverContainer";
import { dummyByRequestType } from "../../dummy";

function VTronVideo() {
    return (
        <KanbanScreenTakeoverContainer
            type="vtron_video"
            data={dummyByRequestType.vtron_video}
            CardComponent={(data) => (
                <KanbanCard
                    contentType="video"
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
                    videoContent={{
                        title: data?.media_file || "",
                        video: data?.media_file || ""
                    }}
                />
            )}
        />
    )
}

export default VTronVideo;
