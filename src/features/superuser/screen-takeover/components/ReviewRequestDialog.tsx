"use client";

import { Button, CircularProgress, Dialog, DialogContent, DialogTitle } from "@mui/material";

import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { getErrorMessage } from "@ozanplanviu/planviu-core";

import { QUERY_KEY } from "@/data/internal/query-keys";
import { useScreenTakeoverApprovalMutation } from "../hooks/screen-takeover";

type TReviewRequestDialog = {
    open: boolean;
    onClose: () => void;

    // type: "approved" | "rejected";
    id: string;
}

function ReviewRequestDialog({ onClose, open, id }: TReviewRequestDialog) {
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

    const onSubmit = (type: "approved" | "rejected") => {
        mutate({
            method: "PATCH",
            id: id,
            type: type
        });
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Approval</DialogTitle>
            <DialogContent>
                <p className="font-poppins mb-4 text-gray-600">Select your action below, either APPROVE or REJECT</p>
                <div className="flex gap-2">
                    <Button
                        onClick={() => onSubmit("rejected")}
                        variant="contained"
                        color="error"
                        disabled={isPending}
                    >
                        {isPending ? <CircularProgress size={20} className="text-white" /> : "Reject"}
                    </Button>
                    <Button
                        disabled={isPending}
                        onClick={() => onSubmit("approved")}
                        variant="contained"
                        color="success"
                    >
                        {isPending ? <CircularProgress size={20} className="text-white" /> : "Approve"}
                    </Button>
                </div>

                {/* <Typography>Are you sure to {(type === "approved") ? "approve" : "reject"} this request?</Typography>
                <div className="mt-4 flex gap-2">
                    <Button variant="outlined" onClick={onClose}>Cancel</Button>
                    <Button variant="contained" onClick={onSubmit}>
                        {isPending ? <CircularProgress size={16} className="text-white" /> : "Confirm"}
                    </Button>
                </div> */}
            </DialogContent>
        </Dialog>
    )
}

export default ReviewRequestDialog
