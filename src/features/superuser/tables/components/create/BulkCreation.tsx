"use client";

import { useForm } from "react-hook-form";

import { getErrorMessage, PvButtonForm } from "@ozanplanviu/planviu-core";

import toast from "react-hot-toast";

import { useQueryClient } from "@tanstack/react-query";

import { Typography } from "@mui/material";

import InputCustomized from "@/@pv/components/form/InputCustomized";
import { useTablesMutation } from "../../hooks/tables";
import { QUERY_KEY } from "@/data/internal/query-keys";

type TRequest = {
    numbers: string;
}

type TBulkCreation = {
    onClose: (clearForm: () => void) => void;
}

function BulkCreation({ onClose }: TBulkCreation) {
    const queryClient = useQueryClient();

    const { control, handleSubmit, reset } = useForm<TRequest>({
        defaultValues: { numbers: "" }
    });

    const clearForm = () => {
        reset({
            numbers: ""
        });
    }

    const isHasCommaBehind = (_numbers: string) => {
        // TODO: Handle ketika ada koma di belakang (misal 1,2,3,)

        let accept = false;

        const numberArray = _numbers.split(",");

        console.log(numberArray);

        if (numberArray[numberArray.length - 1] === "") {
            accept = true;
        }

        return accept;
    }

    const convertIntoSuitablePayload = (datas: string) => {
        const datasArr = datas.split(",");

        return datasArr.map(_dataArr => _dataArr.trim());
    }

    // const validateNumberArray = (_numbers: any[]) => {
    //     let isValid = true;

    //     _numbers.forEach(_number => {
    //         if (typeof _number !== "number") isValid = false;
    //     });

    //     return isValid;
    // }

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
        if (isHasCommaBehind(data.numbers)) {
            toast.error("Invalid Input (There is a comma behind)");

            return;
        }

        mutate({
            method: "POST",
            type: "bulk",
            data: {
                numbers: convertIntoSuitablePayload(data?.numbers || "")
            }
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* helper */}
                <div className="p-4 border border-blue-300 bg-blue-50 rounded-xl mb-4">
                    <Typography className="font-font-poppins text-blue-800 font-semibold mb-2">
                        Filling Instructions
                    </Typography>
                    <Typography>
                        1. Enter table numbers separated by commas, for example: 1,2,3,4
                    </Typography>
                    <Typography>
                        2. Letters are not allowed in the input, for example 1,2,a (this will cause an Invalid Number error)
                    </Typography>
                    <Typography>
                        3. Do not place a comma at the end, for example 1,2, (this will cause an Invalid Number error)
                    </Typography>
                    <Typography>
                        4. The input only allows numbers (otherwise, an Invalid Number error will occur)
                    </Typography>
                </div>
                {/* end of helper */}

                <InputCustomized
                    control={control}
                    name="numbers"
                    label="Table Numbers"
                    rules={{
                        required: {
                            value: true,
                            message: "This field is required"
                        }
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
        </div>
    )
}

export default BulkCreation;
