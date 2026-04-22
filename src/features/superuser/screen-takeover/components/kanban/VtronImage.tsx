"use client";

import dayjs from "dayjs";

import KanbanCard from "./KanbanCard";
import KanbanScreenTakeoverContainer from "./KanbanScreenTakeoverContainer";
import { dummyByRequestType } from "../../dummy";

function VtronImage() {
    return (
        <KanbanScreenTakeoverContainer
            type="vtron_photo"
            data={dummyByRequestType.vtron_photo}
            CardComponent={(data) => (
                <KanbanCard
                    contentType="image"
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
                    imageContent={{
                        image: data.media_file || "",
                        title: data.media_file || ""
                    }}
                />
            )}
        />
    )
}

export default VtronImage
