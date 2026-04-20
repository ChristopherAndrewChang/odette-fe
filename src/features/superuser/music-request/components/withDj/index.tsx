"use client";

import { useState } from "react";

import dayjs from "dayjs";

import { CustomTextField } from "@ozanplanviu/planviu-core";

import { Typography } from "@mui/material";

import { useAllSongRequestsInfiniteQuery } from "../../hooks/song-request";
import KanbanCard from "../KanbanCard";
import { useDebounce } from "@/@pv/hooks/use-debounce";
import { useInfiniteScroll } from "@/@pv/hooks/use-infinite-scroll";
import { ADMIN_MUSIC_REQUEST_FETCHING_INTERVAL } from "../../data";

function WithDJ() {
    const [search, setSearch] = useState("");
    const searchDebounced = useDebounce(search, 500);

    const { data, isFetching, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } = useAllSongRequestsInfiniteQuery({
        status: "admin_approved",
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

    const withDjs = data?.pages?.flatMap(_data => _data?.data?.results) || [];

    return (
        <>
            <CustomTextField
                placeholder="Search here"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            {(withDjs.length > 0) ? withDjs?.map((withDj, i) => (
                <>
                    <KanbanCard
                        key={withDj?.id}
                        artist={withDj?.artist || ""}
                        created={dayjs(withDj?.created_at).format("HH:mm A")}
                        price={Number(withDj?.donation_amount)?.toLocaleString()}
                        table={withDj?.table_number?.toString()}
                        title={withDj?.song_title}

                    // renderComponent={(
                    //     <div className="px-4 py-1 bg-red-50 border border-red-200 text-red-500 text-sm rounded-lg w-fit mt-4">
                    //         Rejected
                    //     </div>
                    // )}
                    />

                    {((withDjs.length === (i + 1)) && hasNextPage) ? (
                        <div ref={lastElementRef} className="flex justify-center">
                            {nextPageFetchingIndicator}
                        </div>
                    ) : null}
                </>
            )) : (
                <div className="p-6 bg-gray-50 rounded-lg border flex items-center justify-center">
                    <Typography>No data</Typography>
                </div>
            )}
        </>
    )
}

export default WithDJ;
