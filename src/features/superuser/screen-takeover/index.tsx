"use client";

import { useEffect, useState } from "react";

import dayjs from "dayjs";

import { useTopLoader } from "nextjs-toploader";

import { useQueryParams } from "@ozanplanviu/planviu-core";

import { Button, useColorScheme } from "@mui/material";

import { useQueryClient } from "@tanstack/react-query";

import AppLayout from "@/components/internal/AppLayout";

import DateFilter from "../shared/components/DateFilter";
import SessionFilter from "../shared/components/filter/SessionFilter";

import { QUERY_KEY } from "@/data/internal/query-keys";
import FullScreenScreenTakeover from "./components/fullscreen";
import ScreenTakeoverContent from "./components/content";

function ScreenTakeoverPage() {
    const queryClient = useQueryClient();
    const loader = useTopLoader();
    const { updateParams } = useQueryParams();

    const { mode } = useColorScheme();

    const [isFullScreen, setIsFullScreen] = useState(false);

    const [dateOpen, setDateOpen] = useState(false);

    const onReload = () => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.SCREEN_TAKEOVER.INDEX]
        });
    }

    const onExpand = () => {
        setIsFullScreen(true);
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

            <FullScreenScreenTakeover
                onClose={() => {
                    setIsFullScreen(false);
                }}
                open={isFullScreen}
            />

            <AppLayout
                title="Screen Takeover"
                withMaxH
                renderAction={(
                    <div className="flex items-center gap-2">
                        <Button onClick={onExpand} variant="outlined" color="primary">
                            <i className="tabler-arrows-maximize text-base"></i>
                        </Button>
                        <Button onClick={onReload} variant="outlined" color="primary">
                            <i className="tabler-reload text-base"></i>
                        </Button>
                    </div>
                )}
            >
                <SessionFilter darkMode={mode === "dark"} />
                {/* <StatsCards /> */}
                <ScreenTakeoverContent />
            </AppLayout>
        </>
    )
}

export default ScreenTakeoverPage;
