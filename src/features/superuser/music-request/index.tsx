"use client";

import AppLayout from "@/components/internal/AppLayout";
import KanbanContainer from "./components/KanbanContainer";
import PendingPage from "./components/pending";
import WithDJ from "./components/withDj";
import DjApproved from "./components/djApproved";
import MusicStats from "./components/stats";
import SessionFilter from "../shared/components/filter/SessionFilter";

function MusicRequestManagement() {
    return (
        <AppLayout title="Song Request">
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
