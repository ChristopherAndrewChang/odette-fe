"use client";

import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import type { TAutocomplete } from "@ozanplanviu/planviu-core";
import { getErrorMessage, PvButtonForm, PvInput } from "@ozanplanviu/planviu-core";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { useUsersMutation } from "../hooks/users";
import { QUERY_KEY } from "@/data/internal/query-keys";

type TCreateUserDialog = {
    open: boolean;
    onClose: () => void;
}

type TRequest = {
    username: string;
    email: string;
    password: string;
    role: TAutocomplete | null;
};

const defaultValue = {
    email: "",
    password: "",
    role: null,
    username: ""
};

function CreateUserDialog({ onClose, open }: TCreateUserDialog) {
    const queryClient = useQueryClient();

    const { control, handleSubmit, reset } = useForm<TRequest>({
        defaultValues: defaultValue
    });

    const { mutate, isPending } = useUsersMutation({
        onSuccess: () => {
            toast.success("User is successfully added");
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.USERS.INDEX]
            });
            _onClose();
        },
        onError: (err) => {
            toast.error(getErrorMessage(err));
        }
    });

    const onSubmit = (data: TRequest) => {
        const payload = {
            ...data,
            role: data.role?.value
        }

        mutate({
            method: "POST",
            data: payload
        });
    }

    const _onClose = () => {
        onClose();
        reset(defaultValue);
    }

    return (
        <Dialog open={open} onClose={_onClose} fullWidth>
            <DialogTitle>Create User</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <PvInput
                        control={control}
                        name="username"
                        label="Username"
                        rules={{
                            required: { value: true, message: "This field is required" }
                        }}
                    />

                    <PvInput
                        control={control}
                        name="email"
                        label="Email"
                        rules={{
                            required: { value: true, message: "This field is required" }
                        }}
                    />

                    <PvInput
                        control={control}
                        name="role"
                        label="Role"
                        isSelectInput
                        selectOption={[
                            { label: "Admin", value: "admin" },
                            { label: "DJ", value: "dj" },
                            { label: "Cashier", value: "cashier" }
                        ]}
                        rules={{
                            required: { value: true, message: "This field is required" }
                        }}
                    />

                    <PvInput
                        control={control}
                        name="password"
                        label="Password"
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

export default CreateUserDialog
