"use client";

import { useRef, useState } from "react";

import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { getErrorMessage, PvButtonForm } from "@ozanplanviu/planviu-core";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

import { useQueryClient } from "@tanstack/react-query";

import { useTableImportMutation } from "../../hooks/tables";
import DownloadTemplate from "./DownloadTemplate";
import { QUERY_KEY } from "@/data/internal/query-keys";
import FillingGuidlines from "./FillingGuidlines";
import FillingGuideContent from "./FillingGuideContent";

type TImportTablesDialog = {
    open: boolean;
    onClose: () => void;
}

function ImportTablesDialog({ onClose, open }: TImportTablesDialog) {
    const queryClient = useQueryClient();
    const inputRef = useRef<HTMLInputElement>(null);
    const { handleSubmit } = useForm<{}>();
    const [isShowFillingInstruction, setIsShowFillingInstruction] = useState(false);

    const [fileUploaded, setFileUploaded] = useState<File | undefined>(undefined);

    const onClickAddFile = () => {
        if (!!inputRef?.current) {
            inputRef.current.click();
        }
    }

    const _onClose = () => {
        onClose();
        setFileUploaded(undefined);
        setIsShowFillingInstruction(false);
    }

    const onRemoveFile = () => {
        setFileUploaded(undefined);
    }

    const { mutate, isPending } = useTableImportMutation({
        onSuccess: () => {
            toast.success("Import is success");
            _onClose();
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.TABLES.INDEX]
            });
        },
        onError: (err) => {
            getErrorMessage(err);
        }
    });

    const onSubmit = () => {
        if (!fileUploaded) {
            toast.error("File is required");

            return;
        }

        const formData = new FormData();

        formData.append("file", fileUploaded);
        mutate({
            method: "POST",
            data: formData
        });
    }

    return (
        <Dialog fullWidth open={open} onClose={_onClose}>
            <DialogTitle>Import Tables</DialogTitle>
            <DialogContent>

                {isShowFillingInstruction ? (
                    <FillingGuideContent
                        onBack={() => {
                            setIsShowFillingInstruction(false);
                        }}
                    />
                ) : (
                    <>
                        {/* header */}
                        <div className="mb-4">
                            <Typography>To avoid errors during import, you can download the template we’ve provided (<DownloadTemplate />). You can also read the instructions for filling it out (
                                <FillingGuidlines onClick={() => {
                                    setIsShowFillingInstruction(true);
                                }} />
                                )</Typography>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* file input */}
                            <div>
                                <div className="p-6 border rounded-lg border-dashed cursor-pointer transition-all hover:border-blue-700">
                                    <div onClick={onClickAddFile} className="flex items-center gap- justify-center">
                                        <i className="tabler-file"></i>
                                        <Typography>Click to add your file</Typography>
                                    </div>
                                </div>
                                <input
                                    ref={inputRef}
                                    type="file"
                                    accept=".csv"
                                    className="hidden"
                                    onChange={(e) => {
                                        setFileUploaded(e?.target?.files?.[0]);
                                    }}
                                />

                                {/* file uploaded */}
                                {!!fileUploaded ? (
                                    <div className="px-2 py-1 border rounded-lg flex items-center gap-2 mt-2 bg-blue-50 border-blue-200">
                                        <Typography>Uploaded</Typography>
                                        <Typography className="text-black font-medium">{fileUploaded?.name} ({fileUploaded?.size})</Typography>
                                        <i
                                            onClick={onRemoveFile}
                                            className="tabler-trash text-lg text-error cursor-pointer hover:text-red-600"
                                        ></i>
                                    </div>
                                ) : null}
                            </div>

                            <PvButtonForm
                                variant="modal"
                                onClose={_onClose}
                                isPending={isPending}
                            />
                        </form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default ImportTablesDialog;
