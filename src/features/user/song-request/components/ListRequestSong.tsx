"use client";

import { CircularProgress } from "@mui/material";

import { useColor } from "@/hooks/color";
import { useMySongRequestQuery } from "../hooks/song-request";

function ListRequestSong() {
    const { data, isFetching } = useMySongRequestQuery();

    const { DARKBLUE, GOLD, GRAY } = useColor();

    if (isFetching) {
        return (
            <div className="w-full h-16 flex items-center justify-center">
                <CircularProgress size={18} className="text-white" />
            </div>
        )
    }

    if (data?.data?.count === 0) {
        return (
            <div className="w-full h-16 flex items-center justify-center bg-gray-800 rounded-lg border border-gray-600">
                <p className="text-gray-400">Data not found</p>
            </div>
        )
    }

    return (
        <>
            {data?.data?.results?.map(song => (
                <div key={song?.id} style={{ backgroundColor: `${DARKBLUE}10` }} className="rounded-xl p-4 border border-gray-500">
                    <p className="font-poppins text-white">{song?.song_title}</p>
                    <p className="font-poppins" style={{ color: GOLD }}>{song?.artist}</p>
                    <p className="font-poppins" style={{ color: GRAY }}>Status: {song?.status}</p>
                </div>
            ))}

            {/* {(((i + 1) === songs.length) && hasNextPage) ? (
                    <div ref={lastElementRef}>
                        {nextPageFetchingIndicator}
                    </div>
                ) : null} */}
        </>
    )
}

export default ListRequestSong
