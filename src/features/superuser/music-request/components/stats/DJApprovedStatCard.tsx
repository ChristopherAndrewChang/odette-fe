"use client";

import { ADMIN_MUSIC_REQUEST_FETCHING_INTERVAL } from "../../data";
import { useAllSongRequestsQuery } from "../../hooks/song-request";
import StatContainer from "./StatContainer";

function DJApprovedStatCard() {
    const { data, isLoading } = useAllSongRequestsQuery({
        status: "dj_approved"
    }, ADMIN_MUSIC_REQUEST_FETCHING_INTERVAL);

    return (
        <StatContainer
            label="DJ APPROVED"
            value={data?.data?.count?.toLocaleString() || ""}
            loading={isLoading}
        />
    )
}

export default DJApprovedStatCard;
