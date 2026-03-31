"use client";

import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

import { useQueryClient } from "@tanstack/react-query";

import { getErrorMessage, PvButtonForm } from "@ozanplanviu/planviu-core";

import InputCustomized from "@/@pv/components/form/InputCustomized";
import { numberOnly } from "@/utils/validator";
import { useTablesMutation } from "../../hooks/tables";
import { QUERY_KEY } from "@/data/internal/query-keys";

type TRequest = {
    number: string;
}

type TSingleCreation = {
    onClose: (clearForm: () => void) => void;
}

function SingleCreation({ onClose }: TSingleCreation) {
    const queryClient = useQueryClient();

    const { control, handleSubmit, reset } = useForm<TRequest>({
        defaultValues: {
            number: ""
        }
    });

    const clearForm = () => {
        reset({
            number: ""
        });
    }

    const { mutate, isPending } = useTablesMutation({
        onSuccess: () => {
            toast.success("Table is successfully created");
            onClose(clearForm);
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.TABLES.INDEX]
            });
        },
        onError: (err) => {
            toast.error(getErrorMessage(err));
        }
    });

    const onSubmit = (data: TRequest) => {
        mutate({
            method: "POST",
            type: "single",
            data: {
                number: Number(data.number)
            }
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputCustomized
                control={control}
                name="number"
                label="Table Number"
                rules={{
                    required: { value: true, message: "This field is required" },
                    pattern: { value: numberOnly, message: "Invalid Number" }
                }}
            />

            <PvButtonForm
                variant="modal"
                onClose={() => {
                    onClose(clearForm);
                }}
                isPending={isPending}
            />
        </form>
    )
}

export default SingleCreation
