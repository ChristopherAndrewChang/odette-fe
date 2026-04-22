"use client";

import { ADMIN_MUSIC_REQUEST_FETCHING_INTERVAL } from "../../data";
import { useAllSongRequestsQuery } from "../../hooks/song-request";
import StatsCard from "../../../shared/components/StatCard";

function WithDJStatCard() {
    const { data, isLoading } = useAllSongRequestsQuery({
        status: "admin_approved"
    }, ADMIN_MUSIC_REQUEST_FETCHING_INTERVAL);

    return (
        <StatsCard
            label="WITH DJ"
            value={data?.data?.count?.toLocaleString() || ""}
            loading={isLoading}
        />
    )
}

export default WithDJStatCard;
