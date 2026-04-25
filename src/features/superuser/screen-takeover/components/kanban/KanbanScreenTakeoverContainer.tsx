"use client";

import type { ReactNode } from "react";

import { CircularProgress } from "@mui/material";

import { useQueryParams } from "@ozanplanviu/planviu-core";

import { useScreenTakeoverInfiniteQuery } from "../../hooks/screen-takeover";
import type { TScreenTakeover } from "../../types/screen-takeover";
import { ADMIN_MUSIC_REQUEST_FETCHING_INTERVAL } from "@/features/superuser/music-request/data";

type TKanbanScreenTakeoverContainer = {
    type: "running_text" | "vtron_text" | "vtron_photo" | "vtron_video";
    CardComponent: (data: TScreenTakeover) => ReactNode;
    data?: TScreenTakeover[];
}

function KanbanScreenTakeoverContainer({ type, CardComponent, data: externalData }: TKanbanScreenTakeoverContainer) {
    const { getParam } = useQueryParams();

    const { data, isFetchingNextPage, isLoading } = useScreenTakeoverInfiniteQuery({
        request_type: type,
        all: true,
        date: getParam("date")
    }, ADMIN_MUSIC_REQUEST_FETCHING_INTERVAL);

    const datas = data?.pages?.flatMap(_data => _data?.data?.results);

    if (!datas?.length) {
        return (
            <div className="w-full h-32 bg-gray-100 flex items-center justify-center rounded-lg border p-6">
                <p>No Data</p>
            </div>
        )
    }

    return (
        <>
            {(isLoading && !isFetchingNextPage) ? (
                <div className="flex justify-center">
                    <CircularProgress size={18} />
                </div>
            ) : null}
            {!!externalData ? externalData?.map(_data => CardComponent(_data)) : datas?.map(_data => CardComponent(_data))}
        </>
    )
}

export default KanbanScreenTakeoverContainer;
