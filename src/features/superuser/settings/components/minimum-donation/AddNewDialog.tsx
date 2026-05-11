"use client";

import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import type { TAutocomplete } from "@ozanplanviu/planviu-core";
import { getErrorMessage, PvButtonForm, PvInput } from "@ozanplanviu/planviu-core";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { useMinimumDonationSettingsMutation } from "../../hooks/minimum-donation";
import { QUERY_KEY } from "@/data/internal/query-keys";
import { regNumberWithDecimal } from "@/@pv/utils/validation";

type TAddNewDialog = {
    open: boolean;
    onClose: () => void;
}

type TRequest = {
    request_type: TAutocomplete | null;
    name: string;
    min_amount: string;
}

function AddNewDialog({ onClose, open }: TAddNewDialog) {
    const queryClient = useQueryClient();

    const { control, handleSubmit, reset } = useForm<TRequest>({
        defaultValues: {
            min_amount: "",
            name: "",
            request_type: null
        }
    });

    const _onClose = () => {
        onClose();
        reset({
            min_amount: "",
            name: "",
            request_type: null
        });
    }

    const { mutate, isPending } = useMinimumDonationSettingsMutation({
        onSuccess: () => {
            toast.success("Succces");
            _onClose();
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.SETTINGS_DONATION.INDEX]
            });
        },
        onError: (err) => {
            toast.error(getErrorMessage(err));
        }
    });

    const onSubmit = (data: TRequest) => {
        mutate({
            method: "POST",
            data: {
                ...data,
                request_type: data?.request_type?.value
            }
        });
    }

    return (
        <Dialog fullWidth open={open} onClose={onClose}>
            <DialogTitle>New Donation Setting</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <PvInput
                        control={control}
                        label="Name"
                        name="name"
                        rules={{
                            required: { value: true, message: "This field is required" }
                        }}
                    />
                    <PvInput
                        control={control}
                        label="Min Amount"
                        name="min_amount"
                        rules={{
                            required: { value: true, message: "This field is required" },
                            pattern: {
                                value: regNumberWithDecimal,
                                message: "Invalid Number"
                            }
                        }}
                    />
                    <PvInput
                        control={control}
                        label="Type"
                        name="request_type"
                        isSelectInput
                        selectOption={[
                            { label: "Song Request", value: "song_request" },
                            { label: "Running Text", value: "running_text" },
                            { label: "Vtron Text", value: "vtron_text" },
                            { label: "Vtron Photo", value: "vtron_photo" },

                            // { label: "Vtron Video", value: "vtron_video" },
                        ]}
                        rules={{
                            required: { value: true, message: "This field is required" }
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

export default AddNewDialog
