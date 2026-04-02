"use client";

import { CircularProgress, Typography } from "@mui/material";

import { useMyScreenTakeoverQuery } from "../hooks/screen-takeover";
import { useColor } from "@/hooks/color";
import { AppConfig } from "@/configs/appConfig";

function ListMyScreenTakeover() {
    const { DARKBLUE, GOLD, GRAY } = useColor();
    const { data, isFetching } = useMyScreenTakeoverQuery();

    if (isFetching) {
        return (
            <CircularProgress size={18} className="text-white" />
        )
    }

    return (
        <div className="flex flex-col gap-4">
            {data?.data?.results?.map((screen) => (
                <div key={screen?.id} className="p-4 border rounded-lg" style={{
                    backgroundColor: DARKBLUE,
                    borderColor: `${GRAY}70`
                }}>
                    <Typography style={{
                        color: GOLD
                    }}>Type: {screen?.request_type}</Typography>
                    <Typography className="text-white font-semibold">Message: {screen?.message || "-"}</Typography>

                    <Typography className="text-gray-300">Sawer Amount: Rp{Number(screen?.donation_amount)?.toLocaleString()}</Typography>
                    <Typography className="text-gray-300">Status: {screen?.status}</Typography>
                    {(screen.request_type !== "text") ? (
                        <a href={`${AppConfig.mediaUrl}${screen?.media_file}`} target="_blank" className="mt-2 flex items-center gap-2 bg-gray-500 w-fit p-1 rounded-lg">
                            <i className="tabler-file text-lg text-white"></i>
                            <p className="text-white">File</p>
                        </a>
                    ) : null}
                </div>
            ))}
        </div>
    )
}

export default ListMyScreenTakeover
