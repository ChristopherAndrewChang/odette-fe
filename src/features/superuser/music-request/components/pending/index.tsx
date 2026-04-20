"use client";

import { useState } from "react";

import dayjs from "dayjs";

import { CustomTextField } from "@ozanplanviu/planviu-core";

import { Typography } from "@mui/material";

import { useAllSongRequestsInfiniteQuery } from "../../hooks/song-request";
import KanbanCard from "../KanbanCard";
import { useDebounce } from "@/@pv/hooks/use-debounce";
import { useInfiniteScroll } from "@/@pv/hooks/use-infinite-scroll";
import ReviewRequestDialog from "../ReviewRequestDialog";
import { ADMIN_MUSIC_REQUEST_FETCHING_INTERVAL } from "../../data";

function PendingPage() {
    const [search, setSearch] = useState("");
    const searchDebounced = useDebounce(search, 500);

    const [openReview, setOpenReview] = useState<{ id: string; open: boolean; type: "admin_approved" | "admin_rejected" }>({
        id: "",
        open: false,
        type: "admin_approved"
    });

    const { data, isFetching, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } = useAllSongRequestsInfiniteQuery({
        status: "pending",
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

    const pendingsItem = data?.pages?.flatMap(_data => _data?.data?.results) || [];

    return (
        <>
            <ReviewRequestDialog
                id={openReview?.id}
                onClose={() => {
                    setOpenReview({
                        id: "",
                        open: false,
                        type: "admin_approved"
                    });
                }}
                open={openReview?.open}
                type={openReview.type}
            />
            <CustomTextField
                placeholder="Search here"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            {(pendingsItem.length > 0) ? pendingsItem?.map((pendingItem, i) => (
                <>
                    <KanbanCard
                        key={pendingItem?.id}
                        artist={pendingItem?.artist || ""}
                        created={dayjs(pendingItem?.created_at).format("HH:mm A")}
                        price={Number(pendingItem?.donation_amount)?.toLocaleString()}
                        table={pendingItem?.table_number?.toString()}
                        title={pendingItem?.song_title}
                        onAccept={() => {
                            setOpenReview({
                                id: pendingItem?.id?.toString(),
                                open: true,
                                type: "admin_approved"
                            });
                        }}
                        onReject={() => {
                            setOpenReview({
                                id: pendingItem?.id?.toString(),
                                open: true,
                                type: "admin_rejected"
                            });
                        }}
                    />

                    {((pendingsItem.length === (i + 1)) && hasNextPage) ? (
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

export default PendingPage;
