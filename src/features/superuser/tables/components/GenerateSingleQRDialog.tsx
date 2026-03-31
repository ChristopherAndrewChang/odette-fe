"use client";

import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

import { getErrorMessage } from "@ozanplanviu/planviu-core";
import toast from "react-hot-toast";

import { useGenerateTableQRMutation } from "../hooks/qr";

type TGenerateSingleQRDialog = {
    open: boolean;
    onClose: () => void;
    data: {
        id: number;
        tableNumber: number;
    }
}

function GenerateSingleQRDialog({ onClose, open, data }: TGenerateSingleQRDialog) {
    const { mutate, isPending } = useGenerateTableQRMutation({
        onSuccess: (res) => {
            // TODO: make function untuk handle download/view file/gambar => taruh di planviu-core aja

            const blob = new Blob([res.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');

            link.href = url;
            link.target = "_blank";

            link.click();
            link.remove();
        },
        onError: (err) => {
            toast.error(getErrorMessage(err));
        }
    });

    const onGenerate = () => {
        mutate({
            method: "POST",
            type: "single",
            id: data?.id?.toString() || ""
        });
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Generate Table QR</DialogTitle>
            <DialogContent>
                <div className="mb-4">
                    <Typography>Are you sure you want to generate a QR code for table number {data.tableNumber}?</Typography>
                </div>

                <div className="flex gap-2">
                    <Button variant="outlined" onClick={onClose}>Cancel</Button>
                    <Button variant="contained" onClick={onGenerate}>
                        {isPending ? <CircularProgress size={14} className="text-white" /> : "Generate"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default GenerateSingleQRDialog
