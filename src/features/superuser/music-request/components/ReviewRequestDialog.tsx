"use client";

import { Button, CircularProgress, Dialog, DialogContent, DialogTitle } from "@mui/material";

import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { getErrorMessage } from "@ozanplanviu/planviu-core";

import { useApprovalSongRequestMutation } from "../hooks/song-request";
import { QUERY_KEY } from "@/data/internal/query-keys";

type TReviewRequestDialog = {
    open: boolean;
    onClose: () => void;

    // type: "approved" | "rejected";
    id: string;
    type: "admin_approved" | "admin_rejected"
}

function ReviewRequestDialog({ onClose, open, id, type }: TReviewRequestDialog) {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useApprovalSongRequestMutation({
        onSuccess: () => {
            toast.success("Success");
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.SONG_REQUEST.INDEX]
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
            data: {
                status: type
            }
        });
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Approval</DialogTitle>
            <DialogContent>

                <p className="mb-4">Are you sure to proceed this action, it can not be undone.</p>
                <div className="flex gap-2">
                    <Button onClick={onClose} variant="outlined" color="inherit">Cancel</Button>
                    <Button onClick={onSubmit} variant="contained">
                        {isPending ? <CircularProgress size={14} /> : "Proceed"}
                    </Button>
                </div>

                {/* <p className="font-poppins text-gray-600 mb-4">Select your action below, either APPROVE or REJECT</p>

                <div className="flex gap-2">
                    <Button
                        onClick={() => {
                            onSubmit("admin_rejected");
                        }}
                        disabled={isPending}
                        color="error"
                        variant="contained" startIcon={<i className="tabler-x"></i>}>
                        {isPending ? <CircularProgress size={20} className="text-white" /> : "Reject"}
                    </Button>
                    <Button
                        onClick={() => {
                            onSubmit("admin_approved");
                        }}
                        disabled={isPending}
                        color="success"
                        variant="contained"
                        startIcon={<i className="tabler-check"></i>}
                    >
                        {isPending ? <CircularProgress size={20} className="text-white" /> : "Approve"}
                    </Button>
                </div> */}
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
