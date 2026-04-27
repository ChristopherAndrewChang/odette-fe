"use client";

import type { Dispatch, SetStateAction } from "react";

import dayjs from "dayjs";

import { useAllSongRequestsInfiniteQuery } from "@/features/superuser/music-request/hooks/song-request";
import KanbanCard from "../KanbanCard";
import { useInfiniteScroll } from "@/@pv/hooks/use-infinite-scroll";

type TSongRequest = {
    setMarkBilled: Dispatch<SetStateAction<{ cond: boolean; id: string }>>;
}

function SongRequest({ setMarkBilled }: TSongRequest) {
    const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useAllSongRequestsInfiniteQuery({
        status: "dj_approved"
    });

    const songRequest = data?.pages?.flatMap(_data => _data?.data?.results) || [];

    const { lastElementRef, nextPageFetchingIndicator } = useInfiniteScroll({
        onNextPage: fetchNextPage,
        props: {
            hasNextPage: hasNextPage,
            isFetching: isFetching,
            isFetchingNextPage: isFetchingNextPage,
            isLoading: isLoading
        }
    });

    return (
        <>
            <div className="mb-4 flex items-center gap-2">
                <p className="text-white text-xl">Songs</p>
                <div className="px-2 py-1 bg-gray-800 rounded-lg border border-gray-700">
                    <p className="text-white text-sm">{data?.pages?.[0]?.data?.count}</p>
                </div>
            </div>
            <div className="flex flex-col gap-2 max-h-[750px] overflow-y-scroll scrollbar-hide">
                {songRequest.map((song, i) => (
                    <>
                        <KanbanCard
                            key={`song-${song?.id?.toString}`}
                            type="songs"
                            artist={song?.artist || ""}
                            donation_amount={Number(song?.donation_amount)?.toLocaleString()}
                            table={song?.table_number || ""}
                            title={song?.song_title || ""}
                            time={dayjs(song?.created_at).format("HH:mm A")}
                            user={song?.customer_name || ""}
                            onMarkBilled={() => {
                                setMarkBilled({
                                    cond: true,
                                    id: song?.id?.toString()
                                });
                            }}
                            status={song?.status}
                            is_billed={song?.is_billed}
                        />

                        {(
                            ((i + 1) === songRequest?.length) && hasNextPage
                        ) ? (
                            <div ref={lastElementRef}>
                                {nextPageFetchingIndicator}
                            </div>
                        ) : null}
                    </>
                ))}
            </div>
        </>
    )
}

export default SongRequest;
