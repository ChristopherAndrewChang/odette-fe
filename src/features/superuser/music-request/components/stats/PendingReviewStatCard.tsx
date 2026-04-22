"use client";

import { ADMIN_MUSIC_REQUEST_FETCHING_INTERVAL } from "../../data";
import { useAllSongRequestsQuery } from "../../hooks/song-request";
import StatsCard from "../../../shared/components/StatCard";

function PendingReviewStatCard() {
    const { data, isLoading } = useAllSongRequestsQuery({
        status: "pending"
    }, ADMIN_MUSIC_REQUEST_FETCHING_INTERVAL);

    return (
        <StatsCard
            label="PENDING"
            value={data?.data?.count?.toLocaleString() || ""}
            loading={isLoading}
        />
    )
}

export default PendingReviewStatCard;
