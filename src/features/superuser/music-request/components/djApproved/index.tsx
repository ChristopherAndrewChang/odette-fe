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

function DjApproved() {
    const [search, setSearch] = useState("");
    const searchDebounced = useDebounce(search, 500);

    const { data, isFetching, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } = useAllSongRequestsInfiniteQuery({
        status: "dj_approved",
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

    const djApproveds = data?.pages?.flatMap(_data => _data?.data?.results) || [];

    return (
        <>
            <CustomTextField
                placeholder="Search here"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            {(djApproveds.length > 0) ? djApproveds?.map((djApproved, i) => (
                <>
                    <KanbanCard
                        key={djApproved?.id}
                        artist={djApproved?.artist || ""}
                        created={dayjs(djApproved?.created_at).format("HH:mm A")}
                        price={Number(djApproved?.donation_amount)?.toLocaleString()}
                        table={djApproved?.table_number?.toString()}
                        title={djApproved?.song_title}
                    />

                    {((djApproveds?.length === (i + 1)) && hasNextPage) ? (
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

export default DjApproved;
