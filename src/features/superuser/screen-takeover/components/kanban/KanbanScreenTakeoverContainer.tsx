"use client";

import type { ReactNode, Dispatch, SetStateAction } from "react";

import { useState } from "react";

import { CircularProgress } from "@mui/material";

import { useQueryParams } from "@ozanplanviu/planviu-core";

import { useScreenTakeoverInfiniteQuery } from "../../hooks/screen-takeover";
import type { TScreenTakeover } from "../../types/screen-takeover";
import { ADMIN_MUSIC_REQUEST_FETCHING_INTERVAL } from "@/features/superuser/music-request/data";
import { AppConfig } from "@/configs/appConfig";
import { useInfiniteScroll } from "@/@pv/hooks/use-infinite-scroll";
import NoDataCard from "@/features/superuser/music-request/components/NoDataCard";
import { useDebounce } from "@/@pv/hooks/use-debounce";

type TKanbanScreenTakeoverContainer = {
    type: "running_text" | "vtron_text" | "vtron_photo" | "vtron_video";
    CardComponent: (data: TScreenTakeover) => ReactNode;
    SearchComponent: (searchValue: string, setSearch: Dispatch<SetStateAction<string>>) => ReactNode;
    data?: TScreenTakeover[];
    search?: boolean;
    onSearch?: () => void;
}

function KanbanScreenTakeoverContainer({ type, CardComponent, data: externalData, SearchComponent }: TKanbanScreenTakeoverContainer) {
    const { getParam } = useQueryParams();

    const [search, setSearch] = useState("");
    const searchDebounced = useDebounce(search, 500);

    const { data, isFetchingNextPage, isLoading, fetchNextPage, hasNextPage, isFetching } = useScreenTakeoverInfiniteQuery({
        request_type: type,
        ...(AppConfig.appMode === "development" ? { all: true } : {}),
        date: getParam("date"),
        search: searchDebounced
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

    return (
        <>
            {SearchComponent(search, setSearch)}

            {(isFetching && !isFetchingNextPage) ? (
                <div className="flex justify-center min-w-96">
                    <CircularProgress size={18} />
                </div>
            ) : null}

            {(!isFetching && !datas?.length) ? <NoDataCard /> : null}

            <div className="max-h-full overflow-y-auto flex flex-col gap-2">
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
