"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@mui/material";

import { useTopLoader } from "nextjs-toploader";

import { useQueryClient } from "@tanstack/react-query";

import KanbanContainer from "./components/KanbanContainer";
import SongRequest from "./components/songRequest";
import MarkBilledDialog from "./components/songRequest/MarkBilledDialog";
import VtronPhotoSlot from "./components/vtronPhoto";
import VtronVideoSlot from "./components/vtronVideo";
import RunningTextSlot from "./components/runningText";
import VtronTextSlot from "./components/vtronText";
import { getUsernameFromJWT } from "@/utils/auth";
import { STORAGE_KEY } from "@/data/internal/storage";
import { onLogout } from "@/utils/logout";
import { APP_URL } from "@/data/internal/app-route";
import { QUERY_KEY } from "@/data/internal/query-keys";
import { useColor } from "@/hooks/color";
import SessionFilter from "@/features/superuser/shared/components/filter/SessionFilter";

function CashierHome() {
    const router = useRouter();
    const loader = useTopLoader();
    const { DARKBG } = useColor();

    const queryClient = useQueryClient();

    const [markBilled, setMarkBilled] = useState<{ id: string; cond: boolean; }>({
        cond: false,
        id: ""
    });

    const _onLogout = () => {
        onLogout();
        router.push(APP_URL.GUEST_LOGIN.INDEX);
        loader.start();
    }

    const onReload = () => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.SCREEN_TAKEOVER.INDEX]
        });
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.SONG_REQUEST.INDEX]
        });
    }

    return (
        <>
            <MarkBilledDialog
                open={markBilled.cond}
                id={markBilled?.id}
                onClose={() => {
                    setMarkBilled({
                        cond: false,
                        id: ""
                    })
                }}
            />
            <div className="max-w-screen-2xl mx-auto overflow-y-auto p-6 lg:py-16 lg:px-32" style={{
                backgroundColor: DARKBG
            }}>
                <div className="pb-6 mb-6 border-b border-gray-700">
                    <div className="flex justify-between items-center gap-6 mb-6">
                        <div className="flex items-center gap-2">
                            <p className="text-xl text-gray-300">
                                Hello, {getUsernameFromJWT(localStorage.getItem(STORAGE_KEY.TOKEN) || "")}!
                            </p>

                            <div onClick={onReload} className="border rounded-lg px-4 py-1 border-gray-600 flex items-center justify-center cursor-pointer hover:bg-gray-700">
                                <i className="tabler-reload text-white text-sm"></i>
                            </div>
                        </div>

                        <Button variant="outlined" color="error" size="small" onClick={_onLogout}>Logout</Button>
                    </div>
                    {/* <StatsIndex /> */}
                </div>

                <SessionFilter
                    darkMode
                />

                <KanbanContainer
                    runningTextSlot={(
                        <RunningTextSlot />
                    )}
                    songRequestSlot={(
                        <SongRequest
                            setMarkBilled={setMarkBilled}
                        />
                    )}
                    vtronImageSlot={(
                        <VtronPhotoSlot />
                    )}
                    vtronTextSlot={(
                        <VtronTextSlot />
                    )}
                    vtronVideoSlot={(
                        <VtronVideoSlot />
                    )}
                />
            </div>
        </>
    )
}

export default CashierHome;
