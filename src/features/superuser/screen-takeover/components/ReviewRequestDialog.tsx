"use client";

import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { getErrorMessage } from "@ozanplanviu/planviu-core";

import { QUERY_KEY } from "@/data/internal/query-keys";
import { useScreenTakeoverApprovalMutation } from "../hooks/screen-takeover";

type TReviewRequestDialog = {
    open: boolean;
    onClose: () => void;
    type: "approved" | "rejected";
    id: string;
}

function ReviewRequestDialog({ onClose, open, type, id }: TReviewRequestDialog) {
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
            method: "PATCH",
            id: id,
            type: type
        });
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>
                <Typography>Are you sure to {(type === "approved") ? "approve" : "reject"} this request?</Typography>
                <div className="mt-4 flex gap-2">
                    <Button variant="outlined" onClick={onClose}>Cancel</Button>
                    <Button variant="contained" onClick={onSubmit}>
                        {isPending ? <CircularProgress size={16} className="text-white" /> : "Confirm"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ReviewRequestDialog
