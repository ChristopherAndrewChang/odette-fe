"use client";

import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

import toast from "react-hot-toast";
import { getErrorMessage } from "@ozanplanviu/planviu-core";

import { useQueryClient } from "@tanstack/react-query";

import { useScreenTakeoverMarkPlayedMutation } from "../hooks/screen-takeover";
import { QUERY_KEY } from "@/data/internal/query-keys";

type TMarkPlayedDialog = {
    open: boolean;
    onClose: () => void;
    id: string;
}

function MarkPlayedDialog({ onClose, open, id }: TMarkPlayedDialog) {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useScreenTakeoverMarkPlayedMutation({
        onSuccess: () => {
            toast.success("Success");
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.SCREEN_TAKEOVER.INDEX]
            });
            onClose();
        },
        onError: (err) => {
            toast.error(getErrorMessage(err));
        }
    });

    const onSubmit = () => {
        mutate({
            method: "PATCH",
            id: id
        });
    }

    return (
        <Dialog fullWidth open={open} onClose={onClose}>
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>
                <Typography>Are you sure to proceed this action? It can not be undone</Typography>
                <div className="mt-4 flex gap-2">
                    <Button variant="outlined" color="inherit" onClick={onClose}>Cancel</Button>
                    <Button variant="contained" onClick={onSubmit}>
                        {isPending ? <CircularProgress size={18} className="text-white" /> : "Proceed"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default MarkPlayedDialog
