"use client";

import { ADMIN_MUSIC_REQUEST_FETCHING_INTERVAL } from "../../data";
import { useAllSongRequestsQuery } from "../../hooks/song-request";
import StatContainer from "./StatContainer";

function WithDJStatCard() {
    const { data, isLoading } = useAllSongRequestsQuery({
        status: "admin_approved"
    }, ADMIN_MUSIC_REQUEST_FETCHING_INTERVAL);

    return (
        <StatContainer
            label="WITH DJ"
            value={data?.data?.count?.toLocaleString() || ""}
            loading={isLoading}
        />
    )
}

export default WithDJStatCard;
