"use client";

import type { ReactNode, Dispatch, SetStateAction } from "react";

import { useState } from "react";

import { CircularProgress, useColorScheme } from "@mui/material";

import { useQueryParams } from "@ozanplanviu/planviu-core";

import classNames from "classnames";

import { useScreenTakeoverInfiniteQuery } from "../../hooks/screen-takeover";
import type { TScreenTakeover } from "../../types/screen-takeover";
import { ADMIN_MUSIC_REQUEST_FETCHING_INTERVAL } from "@/features/superuser/music-request/data";
import { AppConfig } from "@/configs/appConfig";
import { useInfiniteScroll } from "@/@pv/hooks/use-infinite-scroll";
import NoDataCard from "@/features/superuser/music-request/components/NoDataCard";
import { useDebounce } from "@/@pv/hooks/use-debounce";

type TKanbanScreenTakeoverContainer = {
    title: string;
    type: "running_text" | "vtron_text" | "vtron_photo" | "vtron_video";
    CardComponent: (data: TScreenTakeover) => ReactNode;
    SearchComponent: (searchValue: string, setSearch: Dispatch<SetStateAction<string>>) => ReactNode;
    data?: TScreenTakeover[];
    search?: boolean;
    onSearch?: () => void;
}

function KanbanScreenTakeoverContainer({ type, CardComponent, data: externalData, SearchComponent, title }: TKanbanScreenTakeoverContainer) {
    const { getParam } = useQueryParams();

    const { mode } = useColorScheme();

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

            // isFetching: isFetching,
            isFetchingNextPage: isFetchingNextPage,
            isLoading: isLoading
        }
    });

    const datas = data?.pages?.flatMap(_data => _data?.data?.results);

    // return (
    //     <>
    //         <div className="flex items-center gap-2">
    //             <p className={classNames("font-poppins text-black font-semibold", {
    //                 "!text-white": mode === "dark"
    //             })}>{title} ({data?.pages?.[0]?.data?.count || 0})</p>

    //             {(isFetching && !isFetchingNextPage) ? (
    //                 <CircularProgress size={14} />
    //             ) : null}
    //         </div>
    //         {SearchComponent(search, setSearch)}

    //         {(!isFetching && !datas?.length) ? <NoDataCard /> : null}

    //         <div className="flex-1 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden flex flex-col gap-2">
    //             {!!externalData ? externalData?.map(_data => CardComponent(
    //                 _data,
    //             )) : (
    //                 datas?.map((_data, i) => (
    //                     <>
    //                         {CardComponent(
    //                             _data,
    //                         )}
    //                         {(
    //                             ((i + 1) === datas?.length) && hasNextPage
    //                         ) ? (
    //                             <div ref={lastElementRef} className="min-h-[40px] p-4 flex items-center justify-center">
    //                                 {nextPageFetchingIndicator}
    //                             </div>
    //                         ) : null}
    //                     </>
    //                 ))
    //             )}
    //         </div>
    //     </>
    // )

    return (
        <>
            <div className="flex items-center gap-2 min-w-0">
                <p className={classNames("font-poppins text-black font-semibold break-words min-w-0", {
                    "!text-white": mode === "dark"
                })}>
                    {title} ({data?.pages?.[0]?.data?.count || 0})
                </p>

                {(isFetching && !isFetchingNextPage) ? (
                    <CircularProgress size={14} />
                ) : null}
            </div>

            <div className="w-full min-w-0">
                {SearchComponent(search, setSearch)}
            </div>

            {(!isFetching && !datas?.length) ? <NoDataCard /> : null}

            <div className="flex-1 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden flex flex-col gap-2">
                {!!externalData ? externalData?.map(_data => CardComponent(_data)) : (
                    datas?.map((_data, i) => (
                        <div key={_data?.id || i}>
                            {CardComponent(_data)}

                            {((i + 1) === datas?.length) && hasNextPage ? (
                                <div ref={lastElementRef} className="min-h-[40px] p-4 flex items-center justify-center">
                                    {nextPageFetchingIndicator}
                                </div>
                            ) : null}
                        </div>
                    ))
                )}
            </div>
        </>
    )
}

export default KanbanScreenTakeoverContainer;
