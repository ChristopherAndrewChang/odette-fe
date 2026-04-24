"use client";

import { useEffect } from "react";

import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { getErrorMessage, PvButtonForm, PvInput } from "@ozanplanviu/planviu-core";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { useMinimumDonationSettingsMutation } from "../../hooks/minimum-donation";
import { QUERY_KEY } from "@/data/internal/query-keys";

type TUpdateDataDialog = {
    open: boolean;
    onClose: () => void;
    data: {
        day_type: string;
        request_type: string;
        min_amount: string;
    }
}

type TRequest = {
    min_amount: string;
};

function UpdateDataDialog({ open, data, onClose }: TUpdateDataDialog) {
    const queryClient = useQueryClient();

    const { control, reset, handleSubmit, watch } = useForm<TRequest>({
        defaultValues: { min_amount: "" }
    });

    const { mutate, isPending } = useMinimumDonationSettingsMutation({
        onSuccess: () => {
            toast.success("Success");
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.SETTINGS_DONATION.INDEX]
            });
            onClose();
        },
        onError: (err) => {
            toast.error(getErrorMessage(err));
        }
    });

    const onSubmit = (_data: TRequest) => {
        mutate({
            method: "PATCH",
            data: {
                day_type: data.day_type,
                request_type: data.request_type,
                min_amount: _data.min_amount
            }
        });
    }

    useEffect(() => {
        reset({ min_amount: data.min_amount });
    }, [open]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Update Minimum Donation</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div>
                        <PvInput
                            control={control}
                            label="Min Amount"
                            name="min_amount"
                            rules={{
                                required: {
                                    value: true,
                                    message: "This field is required"
                                }
                            }}
                        />
                        <p className="text-xs italic text-gray-600 mt-2">Formatted: Rp{Number(watch("min_amount"))?.toLocaleString()}</p>
                    </div>

                    <PvButtonForm
                        variant="modal"
                        isPending={isPending}
                        onClose={onClose}
                    />
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateDataDialog
