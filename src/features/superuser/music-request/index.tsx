"use client";

import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@mui/material";

import AppLayout from "@/components/internal/AppLayout";
import KanbanContainer from "./components/KanbanContainer";
import PendingPage from "./components/pending";
import WithDJ from "./components/withDj";
import DjApproved from "./components/djApproved";
import MusicStats from "./components/stats";
import SessionFilter from "../shared/components/filter/SessionFilter";

import { QUERY_KEY } from "@/data/internal/query-keys";

function MusicRequestManagement() {
    const queryClient = useQueryClient();

    const onReload = () => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.SONG_REQUEST.INDEX]
        });
    }

    return (
        <AppLayout
            title="Song Request"
            renderAction={(
                <Button onClick={onReload} variant="tonal" color="secondary">
                    <i className="tabler-reload text-base"></i>
                </Button>
            )}
        >
            <SessionFilter />

            <MusicStats />
            <KanbanContainer
                dj={<WithDJ />}
                djApproveds={<DjApproved />}
                pending={<PendingPage />}
            />
        </AppLayout>
    )
}

export default MusicRequestManagement;
