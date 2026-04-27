"use client";

import { Button, CircularProgress, Dialog, DialogContent, DialogTitle } from "@mui/material";

import toast from "react-hot-toast";
import { getErrorMessage } from "@ozanplanviu/planviu-core";

import { useQueryClient } from "@tanstack/react-query";

import { useMarkBilledSongMutation } from "../../hooks/song";
import { QUERY_KEY } from "@/data/internal/query-keys";

type TMarkBilledDialog = {
    open: boolean;
    onClose: () => void;
    id: string;
}

function MarkBilledDialog({ onClose, open, id }: TMarkBilledDialog) {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMarkBilledSongMutation({
        onSuccess: () => {
            toast.success("Success");
            onClose();
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.SONG_REQUEST.INDEX]
            });
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
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>
                <p className="mb-4">Are you sure to proceed this action? It can not be undone.</p>

                <div className="flex items-center gap-2">
                    <Button variant="outlined" color="inherit" onClick={onClose}>Cancel</Button>
                    <Button onClick={onSubmit} variant="contained">
                        {isPending ? <CircularProgress size={18} className="text-white" /> : "Proceed"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default MarkBilledDialog
