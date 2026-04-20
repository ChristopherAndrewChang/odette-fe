"use client";

import { useState } from "react";

import AppLayout from "@/components/internal/AppLayout";
import DateFilter from "../shared/components/DateFilter";
import KanbanContainer from "./components/KanbanContainer";
import PendingPage from "./components/pending";
import WithDJ from "./components/withDj";
import DjApproved from "./components/djApproved";
import MusicStats from "./components/stats";

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
            {/* <ReviewRequestDialog
                onClose={() => {
                    setOpenApproval({
                        cond: false,
                        id: "",
                        type: "approved"
                    });
                }}
                open={openApproval.cond}

                // type={openApproval.type}
                id={openApproval.id}
            /> */}
            <AppLayout title="Song Request">
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
