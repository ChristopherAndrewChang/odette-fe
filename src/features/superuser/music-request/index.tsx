"use client";

import AppLayout from "@/components/internal/AppLayout";
import { useAllSongRequestsQuery } from "./hooks/song-request";

function MusicRequestManagement() {
    const { data, isFetching } = useAllSongRequestsQuery();

    return (
        <AppLayout title="Song Request">
            <p>Hello World</p>
        </AppLayout>
    )
}

export default MusicRequestManagement;
