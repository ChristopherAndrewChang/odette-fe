"use client";

import { useEffect } from "react";

import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useForm } from "react-hook-form";

import { getErrorMessage, PvButtonForm, PvInput } from "@ozanplanviu/planviu-core";

import toast from "react-hot-toast";

import { useQueryClient } from "@tanstack/react-query";

import type { TTables } from "../../types/tables";
import { useTablesMutation } from "../../hooks/tables";
import { QUERY_KEY } from "@/data/internal/query-keys";

type TEditTableDialog = {
    open: boolean;
    onClose: () => void;
    defaultValue: TTables | null;
}

type TRequest = {
    number: string;
}

function EditTableDialog({ onClose, open, defaultValue }: TEditTableDialog) {
    const queryClient = useQueryClient();

    const { control, handleSubmit, reset } = useForm<TRequest>({
        defaultValues: {
            number: ""
        }
    });

    const _onClose = () => {
        onClose();
        reset({
            number: ""
        });
    }

    const { mutate, isPending } = useTablesMutation({
        onSuccess: () => {
            toast.success("Data is successfully updated");
            _onClose();
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.TABLES.INDEX]
            });
        },
        onError: (err) => {
            toast.error(getErrorMessage(err));
        },
    });

    const onSubmit = (data: TRequest) => {
        mutate({
            method: "PATCH",
            type: "single",
            id: defaultValue?.id?.toString() || "",
            data: {
                number: data.number
            }
        });
    }

    useEffect(() => {
        reset({
            number: defaultValue?.number?.toString()
        });
    }, [defaultValue, open]);

    return (
        <Dialog open={open} onClose={_onClose} fullWidth>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <PvInput
                        control={control}
                        name="number"
                        label="Number"
                        rules={{
                            required: { value: true, message: "This field is required" }
                        }}
                    />

                    <PvButtonForm
                        variant="modal"
                        onClose={_onClose}
                        isPending={isPending}
                    />
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditTableDialog
