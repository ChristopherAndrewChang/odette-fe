"use client";

import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { getErrorMessage, PvButtonForm, PvInput } from "@ozanplanviu/planviu-core";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { useSongRequestMutation } from "../hooks/song-request";
import { QUERY_KEY } from "@/data/internal/query-keys";
import { regNumber } from "@/@pv/utils/validation";

type TSubmitRequestDialog = {
    open: boolean;
    onClose: () => void;
}

type TRequest = {
    song_title: string;
    artist: string;
    donation_amount: string;
};

function SubmitRequestDialog({ onClose, open }: TSubmitRequestDialog) {
    const queryClient = useQueryClient();

    const { control, handleSubmit, reset } = useForm<TRequest>({
        defaultValues: {
            artist: "",
            donation_amount: "",
            song_title: ""
        }
    });

    const _onClose = () => {
        onClose();
        reset({
            artist: "",
            donation_amount: "",
            song_title: ""
        });
    }

    const { mutate, isPending } = useSongRequestMutation({
        onSuccess: () => {
            toast.success("Song is successfully requested");
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.MY_SONG_REQUEST.INDEX]
            });
            _onClose();
        },
        onError: (err) => {
            toast.error(getErrorMessage(err));
        }
    });

    const onSubmit = (data: TRequest) => {
        mutate({
            method: "POST",
            data: data
        });
    }

    return (
        <Dialog open={open} onClose={_onClose} fullWidth>
            <DialogTitle>Request A Song</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <PvInput
                        control={control}
                        name="song_title"
                        label="Song Title"
                        rules={{
                            required: { value: true, message: "This field is required" },
                        }}
                    />
                    <PvInput
                        control={control}
                        name="artist"
                        label="Artist"
                        rules={{
                            required: { value: true, message: "This field is required" },
                        }}
                    />
                    <PvInput
                        control={control}
                        name="donation_amount"
                        label="Donation Amount"
                        rules={{
                            required: { value: true, message: "This field is required" },
                            pattern: { value: regNumber, message: "Invalid Number" }
                        }}
                    />
                    <PvButtonForm
                        variant="modal"
                        isPending={isPending}
                        onClose={_onClose}
                    />
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default SubmitRequestDialog
