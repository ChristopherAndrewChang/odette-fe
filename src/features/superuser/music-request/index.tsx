"use client";

import { useEffect, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { Button, useColorScheme } from "@mui/material";

import { useTopLoader } from "nextjs-toploader";

import dayjs from "dayjs";

import { useQueryParams } from "@ozanplanviu/planviu-core";

import AppLayout from "@/components/internal/AppLayout";
import KanbanContainer from "./components/KanbanContainer";
import PendingPage from "./components/pending";
import WithDJ from "./components/withDj";
import DjApproved from "./components/djApproved";
import SessionFilter from "../shared/components/filter/SessionFilter";

import { QUERY_KEY } from "@/data/internal/query-keys";
import FullScreenMusicRequest from "./components/fullscreen";

function MusicRequestManagement() {
    const loader = useTopLoader();

    const { updateParams } = useQueryParams();

    const { mode } = useColorScheme();
    const queryClient = useQueryClient();

    const [isFullScreen, setIsFullScreen] = useState(false);

    const onReload = () => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.SONG_REQUEST.INDEX]
        });
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.SONG_REQUEST.SUMMARY]
        });
    }

    const onExpand = () => {
        setIsFullScreen(true);
    }

    useEffect(() => {
        loader.done();

        const now = dayjs();

        const sessionDate =
            now.hour() < 4
                ? now.subtract(1, "day").format("YYYY-MM-DD")
                : now.format("YYYY-MM-DD");

        updateParams({
            remove: ["date"],
            add: {
                date: sessionDate
            }
        });

        // updateParams({
        //     remove: ["date"],
        //     add: {
        //         date: dayjs(new Date()).format("YYYY-MM-DD")
        //     }
        // });
    }, []);

    return (
        <>
            <FullScreenMusicRequest
                onClose={() => {
                    setIsFullScreen(false);
                }}
                open={isFullScreen}
            />
            <AppLayout
                title="Song Request"
                isBottomFit
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
                {/* <main className="max-h-[75vh] overflow-y-auto"> */}
                <div className="mb-4">
                    <SessionFilter
                        darkMode={mode === "dark"}
                    />
                </div>

                <div>

                </div>
                {/* <MusicStats /> */}
                <KanbanContainer
                    dj={<WithDJ />}
                    djApproveds={<DjApproved />}
                    pending={<PendingPage />}
                />
                {/* </main> */}
            </AppLayout>
        </>
    )
}

export default MusicRequestManagement;
