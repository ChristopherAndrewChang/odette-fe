"use client";

import { useState } from "react";

import { Tab, Tabs } from "@mui/material";

import UserContainer from "@/features/user/shared/components/UserContainer";
import DjHeaderPage from "../shared/components/DjHeaderPage";
import { useAllSongRequestsInfiniteQuery } from "@/features/superuser/music-request/hooks/song-request";
import { useInfiniteScroll } from "@/@pv/hooks/use-infinite-scroll";
import CardItem from "../shared/components/CardItem";

function DjHistoryPage() {
    const [tabActive, setTabActive] = useState<"dj_rejected" | "dj_approved" | "">("");

    const { data, isFetching, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useAllSongRequestsInfiniteQuery({
        status: "dj_rejected"
    });

    const { lastElementRef, nextPageFetchingIndicator } = useInfiniteScroll({
        onNextPage: fetchNextPage,
        props: {
            hasNextPage: hasNextPage,
            isFetching: isFetching,
            isFetchingNextPage: isFetchingNextPage,
            isLoading: isLoading
        }
    });

    const songsHistory = data?.pages?.flatMap(page => page?.data?.results) || [];

    return (
        <UserContainer isDj>
            <DjHeaderPage pageActive="history" />

            <Tabs
                className="mb-4"
                variant="fullWidth"
                value={tabActive}
                onChange={(_, value) => setTabActive(value)}
                indicatorColor={"secondary"}
                textColor="secondary"
            >
                <Tab value={""} label="All" />
                <Tab value={"dj_rejected"} label="Rejected" />
                <Tab value={"dj_approved"} label="Approved" />
            </Tabs>

            <main>
                {songsHistory?.map((song, i) => (
                    <>
                        <CardItem
                            key={song?.id}
                            artist={song?.artist || ""}
                            songTitle={song?.song_title || ""}
                        />

                        {(((i + 1) === songsHistory?.length) && hasNextPage) ? (
                            <div ref={lastElementRef}>
                                {nextPageFetchingIndicator}
                            </div>
                        ) : null}
                    </>
                ))}
            </main>
        </UserContainer>
    )
}

export default DjHistoryPage;
