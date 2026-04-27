"use client";

import { useEffect, useState } from "react";

import dayjs from "dayjs";

import { useTopLoader } from "nextjs-toploader";

import { useQueryParams } from "@ozanplanviu/planviu-core";

import { Button } from "@mui/material";

import { useQueryClient } from "@tanstack/react-query";

import AppLayout from "@/components/internal/AppLayout";

import DateFilter from "../shared/components/DateFilter";
import SessionFilter from "../shared/components/filter/SessionFilter";
import StatsCards from "./components/stats";
import KanbanScreenTakeover from "./components/kanban";
import RunningTextKanban from "./components/kanban/RunningTextKanban";
import VTronTextKanban from "./components/kanban/VTronTextKanban";
import VtronImage from "./components/kanban/VtronImage";
import VTronVideo from "./components/kanban/VtronVideo";
import ReviewRequestDialogV2 from "./components/ReviewRequestDialogV2";

import { QUERY_KEY } from "@/data/internal/query-keys";

function ScreenTakeoverPage() {
    const queryClient = useQueryClient();
    const loader = useTopLoader();
    const { updateParams } = useQueryParams();

    const [dateOpen, setDateOpen] = useState(false);

    const [openApproval, setOpenApproval] = useState<{ cond: boolean; id: string; type: "approved" | "rejected" }>({
        cond: false,
        id: "",
        type: "approved"
    });

    const onReload = () => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.SCREEN_TAKEOVER.INDEX]
        });
    }

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
            {/* <ReviewRequestDialog
                id={openApproval?.id}
                open={openApproval?.cond}
                onClose={() => {
                    setOpenApproval({
                        cond: false,
                        id: "",
                        type: "approved"
                    });
                }}
            /> */}

            <ReviewRequestDialogV2
                onClose={() => {
                    setOpenApproval({
                        cond: false,
                        id: "",
                        type: "approved"
                    });
                }}
                open={openApproval.cond}
                type={openApproval.type}
                id={openApproval.id}
            />
            <AppLayout
                title="Screen Takeover"
                renderAction={(
                    <Button onClick={onReload} variant="tonal" color="secondary">
                        <i className="tabler-reload text-base"></i>
                    </Button>
                )}
            >
                <SessionFilter />
                <StatsCards />
                <KanbanScreenTakeover
                    runningTextSlot={{
                        content: (
                            <RunningTextKanban
                                onAccept={(id) => {
                                    setOpenApproval({
                                        cond: true,
                                        id: id,
                                        type: "approved"
                                    });
                                }}
                                onReject={(id) => {
                                    setOpenApproval({
                                        cond: true,
                                        id: id,
                                        type: "rejected"
                                    })
                                }}
                            />
                        )
                    }}
                    vtronImageSlot={{
                        content: (
                            <VtronImage
                                onAccept={(id) => {
                                    setOpenApproval({
                                        cond: true,
                                        id: id,
                                        type: "approved"
                                    });
                                }}
                                onReject={(id) => {
                                    setOpenApproval({
                                        cond: true,
                                        id: id,
                                        type: "rejected"
                                    });
                                }}
                            />
                        )
                    }}
                    vtronTextSlot={{
                        content: (
                            <VTronTextKanban
                                onAccept={(id) => {
                                    setOpenApproval({
                                        cond: true,
                                        id: id,
                                        type: "approved"
                                    });
                                }}
                                onReject={(id: string) => {
                                    setOpenApproval({
                                        cond: true,
                                        id: id,
                                        type: "rejected"
                                    });
                                }}
                            />
                        )
                    }}
                    vtronVideoSlot={{
                        content: (
                            <VTronVideo
                                onAccept={(id) => {
                                    setOpenApproval({
                                        cond: true,
                                        id: id,
                                        type: "approved"
                                    });
                                }}
                                onReject={(id: string) => {
                                    setOpenApproval({
                                        cond: true,
                                        id: id,
                                        type: "rejected"
                                    });
                                }}
                            />
                        )
                    }}
                />
            </AppLayout>
        </>
    )
}

export default ScreenTakeoverPage;
