"use client";

import { useState } from "react";

import AppLayout from "@/components/internal/AppLayout";
import DateFilter from "../shared/components/DateFilter";
import KanbanContainer from "./components/KanbanContainer";
import PendingPage from "./components/pending";
import WithDJ from "./components/withDj";
import DjApproved from "./components/djApproved";
import MusicStats from "./components/stats";
import SessionFilter from "../shared/components/filter/SessionFilter";

function MusicRequestManagement() {
    const [openDateFilter, setOpenDateFilter] = useState(false);

    return (
        <>
            <DateFilter
                open={openDateFilter}
                onClose={() => {
                    setOpenDateFilter(false);
                }}
            />
            <AppLayout title="Song Request">
                <SessionFilter />

                <MusicStats />
                <KanbanContainer
                    dj={<WithDJ />}
                    djApproveds={<DjApproved />}
                    pending={<PendingPage />}
                />
            </AppLayout>
        </>
    )
}

export default MusicRequestManagement;
