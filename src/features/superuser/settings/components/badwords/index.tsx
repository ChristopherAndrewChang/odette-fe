"use client";

import { Button, CircularProgress } from "@mui/material";
import { getErrorMessage, PvInput } from "@ozanplanviu/planviu-core";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

import { useBadWordsSettingsMutation } from "../../hooks/bad-words";

type TRequest = {
    word: string;
}

function BadwordsSettings() {
    const { control, handleSubmit, reset } = useForm<TRequest>({
        defaultValues: { word: "" }
    });

    const { mutate, isPending } = useBadWordsSettingsMutation({
        onSuccess: () => {
            toast.success("Success");
            reset({
                word: ""
            });
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <PvInput
                control={control}
                name="word"
                label="Word"
                rules={{
                    required: { value: true, message: "This field is required" }
                }}
            />

            <Button variant="contained" type="submit" disabled={isPending}>
                {isPending ? <CircularProgress size={18} className="text-white" /> : "Save"}
            </Button>
        </form>
    )
}

export default BadwordsSettings;
