"use client";

import { useRef, useState } from "react";

import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { getErrorMessage, PvButtonForm, PvInput } from "@ozanplanviu/planviu-core";
import type { TAutocomplete } from "@ozanplanviu/planviu-core";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useQueryClient } from "@tanstack/react-query";

import { useMenuMutation } from "../hooks/menus";
import { QUERY_KEY } from "@/data/internal/query-keys";

type TAddMenuDialog = {
    open: boolean;
    onClose: () => void;
    defaultPdfType: string;
}

type TRequest = {
    pdf_type: TAutocomplete | null;
}

function AddMenuDialog({ onClose, open, defaultPdfType }: TAddMenuDialog) {
    const queryClient = useQueryClient();

    const inputRef = useRef<HTMLInputElement>(null);
    const [menuPdf, setMenuPdf] = useState<File | null>(null);

    const { control, handleSubmit, reset } = useForm<TRequest>({
        defaultValues: {
            pdf_type: defaultPdfType ? { label: defaultPdfType, value: defaultPdfType } : null
        }
    });

    const onUploadClick = () => {
        if (!inputRef.current) return;

        inputRef.current.click();
    }

    const onDeleteFile = () => {
        setMenuPdf(null);
    }

    const _onClose = () => {
        onClose();
        setMenuPdf(null);
        reset({
            pdf_type: null
        });
    }

    const { mutate, isPending } = useMenuMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.MENUS.INDEX]
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.MENUS.PROMOS]
            });
            toast.success("Success");
            _onClose();
        },
        onError: (err) => {
            toast.error(getErrorMessage(err));
        }
    });

    const onSubmit = (data: TRequest) => {
        if (!menuPdf) {
            toast.error("File is required");

            return;
        }

        const payload = {
            pdf_type: data.pdf_type?.value || "",
            file: menuPdf
        }

        const formData = new FormData();

        formData.append("pdf_type", payload.pdf_type);
        formData.append("file", payload.file);

        mutate({
            method: "POST",
            data: formData
        });
    }

    return (
        <Dialog open={open} onClose={_onClose} fullWidth>
            <DialogTitle>Menu</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <PvInput
                        control={control}
                        name="pdf_type"
                        label="Pdf Type"
                        isSelectInput
                        selectOption={[
                            { label: "menu", value: "menu" },
                            { label: "promo", value: "promo" }
                        ]}
                    />

                    <div className="mt-4">
                        <Typography className="mb-1">Upload your menu here</Typography>
                        {/* upload input */}
                        <div onClick={onUploadClick}>
                            <input
                                ref={inputRef}
                                type="file"
                                className="hidden"
                                accept=".pdf"
                                onChange={e => {
                                    console.log(e?.target?.files?.[0]);


                                    if (!!e.target?.files?.[0]) {
                                        setMenuPdf(e.target?.files?.[0] || null);
                                    }
                                }}
                            />
                            <div className="p-6 w-full border rounded-lg flex items-center justify-center gap-2 mb-2 border-dashed cursor-pointer transition-all hover:border-blue-400 hover:border-solid">
                                <i className="tabler-file text-lg text-gray-500"></i>
                                <Typography className="text-gray-500">Select File</Typography>
                            </div>
                        </div>
                        {/* document uploaded and delete */}
                        {!!menuPdf ? (
                            <div className="flex items-start gap-2 bg-gray-50 py-1 px-2 rounded-xl border">
                                <i
                                    onClick={onDeleteFile}
                                    className="tabler-trash w-8 text-lg text-error cursor-pointer"></i>
                                <Typography className="overflow-auto"><span className="text-black w-full">{menuPdf.name}</span></Typography>
                            </div>
                        ) : null}
                    </div>

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

export default AddMenuDialog
