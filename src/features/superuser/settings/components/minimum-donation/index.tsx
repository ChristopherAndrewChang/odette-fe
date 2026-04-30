"use client";

import { useState } from "react";

import { Button, CircularProgress, Typography } from "@mui/material";

import classNames from "classnames";

import { useMinimumDonationSettingsQuery } from "../../hooks/minimum-donation";
import UpdateDataDialog from "./UpdateDataDialog";
import AddNewDialog from "./AddNewDialog";
import ActiveDialog from "./ActiveDialog";

function MinimumDonationSetting() {
    const [openCreate, setOpenCreate] = useState(false);

    const [activate, setActve] = useState<{ cond: boolean; id: string }>({
        cond: false,
        id: ""
    })

    const [updateState, setUpdateState] = useState<{
        id: string;
        name: string;
        cond: boolean;
        min_amount: string;
    }>({
        id: "",
        name: "",
        cond: false,
        min_amount: ""
    });

    const { data, isFetching } = useMinimumDonationSettingsQuery();

    const dataGrouped = () => {
        return data?.data;
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
                    id: updateState.id,
                    name: updateState.name,
                    min_amount: updateState.min_amount
                })}
                open={updateState.cond}
                onClose={() => {
                    setUpdateState({
                        id: "",
                        cond: false,
                        name: "",
                        min_amount: ""
                    });
                }}
            />

            <AddNewDialog
                onClose={() => {
                    setOpenCreate(false);
                }}
                open={openCreate}
            />

            <ActiveDialog
                id={activate.id}
                onClose={() => {
                    setActve({
                        cond: false,
                        id: ""
                    });
                }}
                open={activate.cond}
            />

            <Button variant="contained" className="w-fit mb-4" fullWidth={false} onClick={() => {
                setOpenCreate(true);
            }}>Add New</Button>
            <section>
                {dataGrouped()?.map(_data => (
                    <div
                        key={_data?.id}
                        className={classNames("flex items-center gap-2 px-2 py-4 border-b")}
                    >
                        <Typography className={classNames({
                            "!text-green-700": _data.is_active
                        })}>{_data?.request_type.replace("_", " ")} ({_data?.name})</Typography>
                        <Typography>:</Typography>
                        <Typography>{`Rp${_data?.min_amount?.toLocaleString()}`}</Typography>

                        <div
                            onClick={() => {
                                setUpdateState({
                                    cond: true,
                                    id: _data?.id?.toString(),
                                    name: _data?.name,
                                    min_amount: _data?.min_amount?.toString()
                                });
                            }}
                            className="px-4 py-1 text-sm bg-blue-500 rounded-xl text-white cursor-pointer transition-all hover:bg-blue-600 ml-2"
                        >
                            Change
                        </div>

                        <div
                            onClick={() => {
                                setActve({
                                    cond: true,
                                    id: _data?.id?.toString()
                                });
                            }}
                            className="px-4 py-1 text-sm bg-green-600 rounded-xl text-white cursor-pointer transition-all hover:bg-green-700 ml-2"
                        >
                            Activate
                        </div>
                    </div>
                ))}
            </section>
        </>
    )
}

export default MinimumDonationSetting;
