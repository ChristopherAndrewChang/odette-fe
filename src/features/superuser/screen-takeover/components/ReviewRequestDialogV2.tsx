"use client";

import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

import toast from "react-hot-toast";

import { useQueryClient } from "@tanstack/react-query";

import { getErrorMessage } from "@ozanplanviu/planviu-core";

import { useScreenTakeoverApprovalMutation } from "../hooks/screen-takeover";
import { QUERY_KEY } from "@/data/internal/query-keys";

type T_ReviewRequestDialog = {
    open: boolean;
    onClose: () => void;
    type: "approved" | "rejected";
    id: string;
}

function ReviewRequestDialogV2({ onClose, open, type, id }: T_ReviewRequestDialog) {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useScreenTakeoverApprovalMutation({
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
            method: "POST",
            type: type === "approved" ? "pending_payment" : "rejected",
            id: id
        });
    };

    return (
        <Dialog fullWidth open={open} onClose={onClose}>
            <DialogTitle>Approval Confirmation</DialogTitle>
            <DialogContent>
                <main className="flex flex-col gap-4">
                    <Typography>Are you sure to proceed? This action can not be undone</Typography>
                    <div className="flex gap-2">
                        <Button variant="outlined" color="inherit" onClick={onClose}>Cancel</Button>
                        <Button variant="contained" onClick={onSubmit}>
                            {isPending ? <CircularProgress size={18} className="text-white" /> : "Proceed"}
                        </Button>
                    </div>
                </main>
            </DialogContent>
        </Dialog>
    )
}

export default ReviewRequestDialogV2;
