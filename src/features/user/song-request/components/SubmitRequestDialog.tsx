"use client";

import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { getErrorMessage, PvButtonForm, PvInput } from "@ozanplanviu/planviu-core";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { useSongRequestMutation } from "../hooks/song-request";
import { QUERY_KEY } from "@/data/internal/query-keys";
import { regNumber } from "@/@pv/utils/validation";
import { useColor } from "@/hooks/color";

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
    const { DARKBLUE } = useColor();

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
                <div className="p-4 border rounded-xl mb-4" style={{ backgroundColor: DARKBLUE }}>
                    <p className="text-white font-poppins text-sm">You can only make a maximum of 5 song requests per session</p>
                </div>

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

                    <div>
                        <PvInput
                            control={control}
                            name="donation_amount"
                            label="Donation Amount (Rp)"
                            rules={{
                                required: { value: true, message: "This field is required" },
                                pattern: { value: regNumber, message: "Invalid Number" }
                            }}
                        />
                        <p className="text-xs mt-1 italic">*minimum donation is Rp10.000</p>
                    </div>
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
