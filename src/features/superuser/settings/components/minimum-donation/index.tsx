"use client";

import { useState } from "react";

import { CircularProgress, Typography } from "@mui/material";

import { useMinimumDonationSettingsQuery } from "../../hooks/minimum-donation";
import UpdateDataDialog from "./UpdateDataDialog";
import type { TMinimumDonation } from "../../types/minimum-donation";

function MinimumDonationSetting() {
    const [updateState, setUpdateState] = useState<{ day_type: string; request_type: string; cond: boolean; min_amount: string; }>({
        day_type: "",
        request_type: "",
        cond: false,
        min_amount: ""
    });

    const { data, isFetching } = useMinimumDonationSettingsQuery();

    const dataGrouped = () => {
        const weekdays: TMinimumDonation[] = [];
        const weekend: TMinimumDonation[] = [];

        data?.data?.forEach(_data => {
            if (_data.day_type === "weekday") {
                weekdays.push(_data);
            } else {
                weekend.push(_data);
            }
        });

        return ({
            weekdays: weekdays,
            weekend: weekend
        })
    }

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
            <main className="grid grid-cols-2">
                {/* weekdays */}
                <section className="border-r">
                    <Typography className="mb-4 text-xl font-semibold">Weekdays</Typography>
                    {dataGrouped().weekdays.map(_data => (
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
                </section>

                {/* weekend */}
                <section>
                    <Typography className="mb-4 text-xl font-semibold pl-6">Weekend</Typography>
                    {dataGrouped().weekend.map(_data => (
                        <div
                            key={_data?.id}
                            className="flex items-center gap-2 px-2 !pl-6 py-4 border-b"
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
                </section>
            </main>
        </>
    )
}

export default MinimumDonationSetting;
