"use client";

import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

import toast from "react-hot-toast";

import { useQueryClient } from "@tanstack/react-query";

import { useOpenNightMutation } from "../hooks/night";
import { QUERY_KEY } from "@/data/internal/query-keys";

type TOpenNightDialog = {
    open: boolean;
    onClose: () => void;
}

function OpenNightDialog({ open, onClose }: TOpenNightDialog) {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useOpenNightMutation({
        onSuccess: () => {
            toast.success("Night session is successfully open");
            onClose();
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.TABLES.INDEX]
            })
        },
        onError: (err) => {
            toast.error(err.response?.data?.detail || err.message);
        }
    });

    const onCloseNight = () => {
        mutate({
            method: "POST",
        });
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Open Night</DialogTitle>
            <DialogContent>
                <Typography>Are you sure you want to open the night? This action cannot be undone</Typography>
                <div className="mt-6 flex gap-2">
                    <Button variant="outlined" size="small" onClick={onClose}>Cancel</Button>
                    <Button variant="contained" size="small" onClick={onCloseNight}>
                        {isPending ? <CircularProgress size={16} className="text-white" /> : "Yes"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default OpenNightDialog;
