"use client";

import StatCard from "./StatCard";
import { useAllSongRequestsQuery } from "@/features/superuser/music-request/hooks/song-request";

function SongToBill() {
    const { data, isFetching } = useAllSongRequestsQuery({
        is_billed: false
    });

    return (
        <StatCard
            title="Songs To Bill"
            value={data?.data?.count?.toString() || "0"}
            loading={isFetching}
        />
    )
}

export default SongToBill
