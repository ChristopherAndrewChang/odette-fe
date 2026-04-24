"use client";

import { useState } from "react";

import { CircularProgress, Typography } from "@mui/material";

import { useMinimumDonationSettingsQuery } from "../../hooks/minimum-donation";
import UpdateDataDialog from "./UpdateDataDialog";

function MinimumDonationSetting() {
    const [updateState, setUpdateState] = useState<{ day_type: string; request_type: string; cond: boolean; min_amount: string; }>({
        day_type: "",
        request_type: "",
        cond: false,
        min_amount: ""
    });

    const { data, isFetching } = useMinimumDonationSettingsQuery();

    if (isFetching) {
        return (
            <CircularProgress size={20} />
        )
    }

    return (
        <>
            <UpdateDataDialog
                data={({
                    day_type: updateState.day_type,
                    request_type: updateState.request_type,
                    min_amount: updateState.min_amount
                })}
                open={updateState.cond}
                onClose={() => {
                    setUpdateState({
                        cond: false,
                        day_type: "",
                        request_type: "",
                        min_amount: ""
                    });
                }}
            />
            <main className="flex flex-col">
                {data?.data?.map(_data => (
                    <div
                        key={_data?.id}
                        className="flex items-center gap-2 px-2 py-4 border-b"
                    >
                        <Typography>{_data?.request_type.replace("_", " ")} ({_data?.day_type})</Typography>
                        <Typography>:</Typography>
                        <Typography>{`Rp${_data?.min_amount?.toLocaleString()}`}</Typography>

                        <div
                            onClick={() => {
                                setUpdateState({
                                    cond: true,
                                    day_type: _data.day_type,
                                    request_type: _data.request_type,
                                    min_amount: _data?.min_amount?.toString()
                                });
                            }}
                            className="px-4 py-1 text-sm bg-blue-500 rounded-xl text-white cursor-pointer transition-all hover:bg-blue-600 ml-2"
                        >
                            Change
                        </div>
                    </div>
                ))}
            </main>
        </>
    )
}

export default MinimumDonationSetting;
