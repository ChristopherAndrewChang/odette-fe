"use client";

import { useState } from "react";

import classNames from "classnames";

import CardItem from "../../shared/components/CardItem";
import { useAllSongRequestsInfiniteQuery } from "@/features/superuser/music-request/hooks/song-request";
import { useInfiniteScroll } from "@/@pv/hooks/use-infinite-scroll";
import { AppConfig } from "@/configs/appConfig";

function History() {
    const [tabActive, setTabActive] = useState<"dj_rejected" | "dj_approved">("dj_approved");

    const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useAllSongRequestsInfiniteQuery({
        status: tabActive,
        ...(AppConfig.appMode === "development" ? { all: true } : {}),
    });

    const { lastElementRef, nextPageFetchingIndicator } = useInfiniteScroll({
        onNextPage: fetchNextPage,
        props: {
            hasNextPage: hasNextPage,

            // isFetching: isFetching,
            isFetchingNextPage: isFetchingNextPage,
            isLoading: isLoading
        }
    });

    const songsHistory = data?.pages?.flatMap(page => page?.data?.results) || [];

    return (
        <section>
            <p className="text-xl mb-4 text-yellow-500"><i className="tabler-history text-lg"></i> History</p>

            {/* tabs */}
            <div className="grid grid-cols-2">
                <p onClick={() => {
                    setTabActive("dj_approved");
                }} className={classNames("text-gray-400 cursor-pointer transition-all text-center hover:border-b hover:border-gray-400 pb-1", {
                    "!border-b !border-yellow-500 !text-yellow-500": tabActive === "dj_approved"
                })}>Approved</p>

                <p onClick={() => {
                    setTabActive("dj_rejected");
                }} className={classNames("text-gray-400 cursor-pointer text-center hover:border-b hover:border-gray-400 pb-1", {
                    "!border-b !border-yellow-500 !text-yellow-500": tabActive === "dj_rejected"
                })}>Rejected</p>
            </div>

            {/* <Tabs
                className="mb-4"
                variant="fullWidth"
                value={tabActive}
                onChange={(_, value) => setTabActive(value)}
                indicatorColor={""}
                textColor="secondary"
            >
                <Tab value={"dj_approved"} label="Approved" />
                <Tab value={"dj_rejected"} label="Rejected" />
            </Tabs> */}

            <main>
                {songsHistory?.map((song, i) => (
                    <>
                        <CardItem
                            key={song?.id}
                            artist={song?.artist || ""}
                            songTitle={song?.song_title || ""}
                        />

                        {(((i + 1) === songsHistory?.length) && hasNextPage) ? (
                            <div ref={lastElementRef} className="flex items-center justify-center min-h-[40px] p-4">
                                {nextPageFetchingIndicator}
                            </div>
                        ) : null}
                    </>
                ))}
            </main>
        </section>
    )
}

export default History
