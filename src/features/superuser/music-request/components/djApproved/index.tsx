"use client";

import { useState } from "react";

import dayjs from "dayjs";

import { CustomTextField, useQueryParams } from "@ozanplanviu/planviu-core";

import { Typography } from "@mui/material";

import { useAllSongRequestsInfiniteQuery } from "../../hooks/song-request";
import KanbanCard from "../KanbanCard";
import { useDebounce } from "@/@pv/hooks/use-debounce";
import { useInfiniteScroll } from "@/@pv/hooks/use-infinite-scroll";
import { ADMIN_MUSIC_REQUEST_FETCHING_INTERVAL, STATUS_COLOR_DATA } from "../../data";
import { AppConfig } from "@/configs/appConfig";

function DjApproved() {
    const [search, setSearch] = useState("");
    const searchDebounced = useDebounce(search, 500);
    const { getParam } = useQueryParams();

    const { data, isFetching, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } = useAllSongRequestsInfiniteQuery({
        all: AppConfig.appMode === "development",
        status: "dj_approved",
        search: searchDebounced,
        date: getParam("date") || dayjs(new Date()).format("YYYY-MM-DD")
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
                        created={dayjs(djApproved?.created_at).format("DD/MM/YYYY HH:mm A")}
                        price={Number(djApproved?.donation_amount)?.toLocaleString()}
                        table={djApproved?.table_number?.toString()}
                        title={djApproved?.song_title}
                        renderComponent={(
                            <div className="mt-4 border w-fit px-2 py-1 text-xs rounded-lg" style={STATUS_COLOR_DATA[djApproved.status]}>
                                {djApproved?.status_display}
                            </div>
                        )}
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
