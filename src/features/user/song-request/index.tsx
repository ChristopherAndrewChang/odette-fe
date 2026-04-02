"use client";

import { useState } from "react";

import { Button, CircularProgress } from "@mui/material";

import { APP_URL } from "@/data/internal/app-route";
import UserBackButton from "../shared/components/UserBackButton";
import UserContainer from "../shared/components/UserContainer";
import { useColor } from "@/hooks/color";
import SubmitRequestDialog from "./components/SubmitRequestDialog";
import { useMySongRequestInfiniteQuery } from "./hooks/song-request";
import { useInfiniteScroll } from "@/@pv/hooks/use-infinite-scroll";

function SongRequest() {
    const { DARKBLUE, GOLD, GRAY } = useColor();

    const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useMySongRequestInfiniteQuery();
    const songs = data?.pages.flatMap(song => song?.data?.results);

    const { lastElementRef, nextPageFetchingIndicator } = useInfiniteScroll({
        onNextPage: fetchNextPage,
        props: {
            hasNextPage: hasNextPage,
            isFetching: isFetching,
            isFetchingNextPage: isFetchingNextPage,
            isLoading: isLoading
        }
    });

    const [openDialog, setOpenDialog] = useState(false);

    return (
        <>
            <SubmitRequestDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            />
            <UserContainer>
                <UserBackButton href={APP_URL.USER_HOME.INDEX} />
                <main className="flex flex-col gap-4">
                    <Button onClick={() => setOpenDialog(true)} fullWidth variant="tonal" className="bg-gray-800 text-white">New Request</Button>

                    {isFetching ? (
                        <CircularProgress size={18} className="text-white" />
                    ) : (
                        <>
                            {songs?.map((songReq, i) => (
                                <>
                                    <div key={songReq.id} style={{ backgroundColor: DARKBLUE }} className="rounded-xl p-4">
                                        <p className="font-poppins text-white">{songReq.song_title}</p>
                                        <p className="font-poppins" style={{ color: GOLD }}>{songReq.artist}</p>
                                        <p className="font-poppins" style={{ color: GRAY }}>Status: {songReq.status}</p>
                                    </div>

                                    {(((i + 1) === songs.length) && hasNextPage) ? (
                                        <div ref={lastElementRef}>
                                            {nextPageFetchingIndicator}
                                        </div>
                                    ) : null}
                                </>
                            ))}
                        </>
                    )}
                </main>
            </UserContainer>
        </>
    )
}

export default SongRequest;
