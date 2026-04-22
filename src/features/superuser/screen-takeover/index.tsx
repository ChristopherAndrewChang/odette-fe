"use client";

import { useEffect, useState } from "react";

import dayjs from "dayjs";

import { useTopLoader } from "nextjs-toploader";

import { useQueryParams } from "@ozanplanviu/planviu-core";

import AppLayout from "@/components/internal/AppLayout";

import ReviewRequestDialog from "./components/ReviewRequestDialog";
import DateFilter from "../shared/components/DateFilter";
import SessionFilter from "../shared/components/filter/SessionFilter";
import StatsCards from "./components/stats";
import KanbanScreenTakeover from "./components/kanban";
import RunningTextKanban from "./components/kanban/RunningTextKanban";
import VTronTextKanban from "./components/kanban/VTronTextKanban";
import VtronImage from "./components/kanban/VtronImage";
import VTronVideo from "./components/kanban/VtronVideo";

function ScreenTakeoverPage() {
    const loader = useTopLoader();
    const { updateParams } = useQueryParams();

    const [dateOpen, setDateOpen] = useState(false);

    const [openApproval, setOpenApproval] = useState<{ cond: boolean; id: string; type: "approved" | "rejected" }>({
        cond: false,
        id: "",
        type: "approved"
    });

    useEffect(() => {
        loader.done();

        updateParams({
            remove: ["date"],
            add: {
                date: dayjs(new Date()).format("YYYY-MM-DD")
            }
        });
    }, []);

    return (
        <>
            <DateFilter
                open={dateOpen}
                onClose={() => {
                    setDateOpen(false);
                }}
            />
            <ReviewRequestDialog
                id={openApproval?.id}
                open={openApproval?.cond}
                onClose={() => {
                    setOpenApproval({
                        cond: false,
                        id: "",
                        type: "approved"
                    });
                }}
            />
            <AppLayout title="Screen Takeover">
                <SessionFilter />
                <StatsCards />
                <KanbanScreenTakeover
                    runningTextSlot={{
                        content: <RunningTextKanban />
                    }}
                    vtronImageSlot={{
                        content: <VtronImage />
                    }}
                    vtronTextSlot={{
                        content: <VTronTextKanban />
                    }}
                    vtronVideoSlot={{
                        content: <VTronVideo />
                    }}
                />
            </AppLayout>
        </>
    )
}

export default ScreenTakeoverPage;
