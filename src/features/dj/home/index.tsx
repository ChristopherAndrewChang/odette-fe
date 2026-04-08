"use client";

import { useState } from "react";

import { CircularProgress, Divider } from "@mui/material";

import dayjs from "dayjs";

import UserContainer from "@/features/user/shared/components/UserContainer";
import { useColor } from "@/hooks/color";
import { useAllSongRequestsInfiniteQuery } from "@/features/superuser/music-request/hooks/song-request";
import { useInfiniteScroll } from "@/@pv/hooks/use-infinite-scroll";
import ApprovalDialog from "./components/ApprovalDialog";

function DjMusicRequest() {
    const { GOLD } = useColor();

    const [approvalState, setApprovalState] = useState<{ cond: boolean; id: string }>({
        cond: false,
        id: ""
    });

    const { data, hasNextPage, isFetching, isLoading, fetchNextPage, isFetchingNextPage, dataUpdatedAt } = useAllSongRequestsInfiniteQuery({}, 3000);

    const songRequestData = data?.pages?.flatMap(_data => _data?.data?.results);

    const { lastElementRef, nextPageFetchingIndicator } = useInfiniteScroll({
        onNextPage: fetchNextPage,
        props: {
            hasNextPage: hasNextPage,
            isFetching: isFetching,
            isFetchingNextPage: isFetchingNextPage,
            isLoading: isLoading
        }
    });

    const renderLoading = (
        <CircularProgress size={20} className="text-white" />
    )

    return (
        <>
            <ApprovalDialog
                open={approvalState.cond}
                onClose={() => {
                    setApprovalState({
                        cond: false,
                        id: ""
                    })
                }}
                id={approvalState.id}
            />
            <UserContainer isDj>
                {/* action */}
                <div onClick={() => { }} className="py-1 px-4 border border-red-800 w-fit rounded-lg mb-6">
                    <p className="text-error">Logout</p>
                </div>
                {/* end of logout action */}

                <p className="font-poppins text-white text-xl">Hello <span>FauzanDj 👋</span></p>
                <Divider className="my-4 border-gray-700" />
                <div className="flex flex-col gap-2">
                    <p className="font-poppins text-xl font-medium" style={{ color: GOLD }}>Song Request</p>
                    <p className="mb-4 text-gray-300 text-lg">You can see the song request list below, click the card to take an action</p>

                    <p className="text-gray-400 italic my-2">Last Updated At: {dayjs(dataUpdatedAt).format("DD MMM YYYY, HH:mm:ss A")}
                        {
                            isFetching ? <CircularProgress size={14} /> : null
                        }
                    </p>

                    <div className="p-4 bg-[#1A1406] border border-[#FACC1570] rounded-lg mb-4">
                        <p className="font-poppins text-white">⚠️ Warning </p>
                        <p className="text-white">Once you approve or reject, the song will be removed from the list</p>
                    </div>

                    {isLoading ? renderLoading : (
                        null
                    )}

                    <>
                        {songRequestData?.map((songReq, i) => (
                            <>
                                <div
                                    key={i}
                                    onClick={() => {
                                        setApprovalState({
                                            cond: true,
                                            id: songReq?.id?.toString()
                                        });
                                    }}
                                >
                                    <div className="p-4 bg-gradient-to-r from-[#1E0A35] via-[#1E0A35] to-[#230D46] rounded-lg border border-purple-950">
                                        <div className="flex items-center gap-1">
                                            <i className="tabler-music text-purple-200"></i>
                                            <p className="text-purple-100 font-medium text-xl">{songReq.song_title} - {songReq.artist}</p>
                                        </div>
                                        {/* <p className="text-gray-400">Request from: Table <span className="text-white">{songReq?.table_number}</span></p> */}
                                    </div>
                                </div>

                                {(((i + 1) === songRequestData?.length) && hasNextPage) ? (
                                    <div ref={lastElementRef}>
                                        {nextPageFetchingIndicator}
                                    </div>
                                ) : null}
                            </>
                        ))}
                    </>
                </div>
            </UserContainer>
        </>
    )
}

export default DjMusicRequest;
