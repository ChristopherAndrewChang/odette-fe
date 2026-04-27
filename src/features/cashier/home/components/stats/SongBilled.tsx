"use client";

import StatCard from "./StatCard";
import { useAllSongRequestsQuery } from "@/features/superuser/music-request/hooks/song-request";

function SongBilled() {
    const { data, isFetching } = useAllSongRequestsQuery({
        is_billed: true
    });

    return (
        <StatCard
            title="Billed"
            value={data?.data?.count?.toString() || "0"}
            loading={isFetching}
        />
    )
}

export default SongBilled
