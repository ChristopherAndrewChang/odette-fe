"use client";

import { useEffect } from "react";

import { Button, CircularProgress } from "@mui/material";
import { getErrorMessage, PvInput } from "@ozanplanviu/planviu-core";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";

import { useGetSettings, useSettingsMutation } from "../../hooks/settings";

type TRequest = {
    song_request_enabled: boolean;
    screen_request_enabled: boolean;
    menu_enabled: boolean
}

function GeneralSetting() {
    const { handleSubmit, control, reset } = useForm<TRequest>({
        defaultValues: {
            menu_enabled: true,
            screen_request_enabled: true,
            song_request_enabled: true
        }
    });

    const { data, isFetching, refetch } = useGetSettings();

    const { mutate, isPending } = useSettingsMutation({
        onSuccess: () => {
            toast.success("Success");
            refetch();
        },
        onError: (err) => {
            toast.error(getErrorMessage(err));
        }
    });

    const onSubmit = (data: TRequest) => {
        mutate({
            method: "PATCH",
            data: data
        });
    }

    const renderLoading = (
        <CircularProgress size={20} />
    )

    useEffect(() => {
        reset({
            menu_enabled: data?.data?.menu_enabled,
            screen_request_enabled: data?.data?.screen_request_enabled,
            song_request_enabled: data?.data?.song_request_enabled
        });
    }, [data]);

    return (
        isFetching ? renderLoading : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <PvInput
                    control={control}
                    name="menu_enabled"
                    label="Menu"
                    variant="switch"
                />
                <PvInput
                    control={control}
                    name="screen_request_enabled"
                    label="Screen Menu Request"
                    variant="switch"
                />
                <PvInput
                    control={control}
                    name="song_request_enabled"
                    label="Song Request"
                    variant="switch"
                />

                <Button
                    disabled={isPending}
                    variant="contained"
                    type="submit"
                    className="w-fit mt-4"
                >
                    {isPending ? <CircularProgress size={20} className="text-white" /> : "Save"}
                </Button>
            </form>
        )
    )
}

export default GeneralSetting;
