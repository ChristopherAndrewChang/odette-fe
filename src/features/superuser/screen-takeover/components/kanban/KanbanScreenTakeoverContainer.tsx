"use client";

import type { ReactNode } from "react";

import { CircularProgress } from "@mui/material";

import { useQueryParams } from "@ozanplanviu/planviu-core";

import { useScreenTakeoverInfiniteQuery } from "../../hooks/screen-takeover";
import type { TScreenTakeover } from "../../types/screen-takeover";
import { ADMIN_MUSIC_REQUEST_FETCHING_INTERVAL } from "@/features/superuser/music-request/data";
import { AppConfig } from "@/configs/appConfig";
import { useInfiniteScroll } from "@/@pv/hooks/use-infinite-scroll";

type TKanbanScreenTakeoverContainer = {
    type: "running_text" | "vtron_text" | "vtron_photo" | "vtron_video";
    CardComponent: (data: TScreenTakeover) => ReactNode;
    data?: TScreenTakeover[];
}

function KanbanScreenTakeoverContainer({ type, CardComponent, data: externalData }: TKanbanScreenTakeoverContainer) {
    const { getParam } = useQueryParams();

    const { data, isFetchingNextPage, isLoading, fetchNextPage, hasNextPage, isFetching } = useScreenTakeoverInfiniteQuery({
        request_type: type,
        all: AppConfig.appMode === "development",
        date: getParam("date")
    }, ADMIN_MUSIC_REQUEST_FETCHING_INTERVAL);

    const { lastElementRef, nextPageFetchingIndicator } = useInfiniteScroll({
        onNextPage: fetchNextPage,
        props: {
            hasNextPage: hasNextPage,
            isFetching: isFetching,
            isFetchingNextPage: isFetchingNextPage,
            isLoading: isLoading
        }
    });

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

            <div className="max-h-[50vh] overflow-y-auto flex flex-col gap-2">
                {!!externalData ? externalData?.map(_data => CardComponent(_data)) : (
                    datas?.map((_data, i) => (
                        <>
                            {CardComponent(_data)}
                            {(
                                ((i + 1) === datas?.length) && hasNextPage
                            ) ? (
                                <div ref={lastElementRef}>
                                    {nextPageFetchingIndicator}
                                </div>
                            ) : null}
                        </>
                    ))
                )}
            </div>
        </>
    )
}

export default KanbanScreenTakeoverContainer;
