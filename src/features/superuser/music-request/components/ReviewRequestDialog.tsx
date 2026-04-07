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
}

function ReviewRequestDialog({ onClose, open, id }: TReviewRequestDialog) {
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

    const onSubmit = (type: "admin_approved" | "admin_rejected") => {
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
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>

                <div className="flex gap-2">
                    <Button
                        onClick={() => {
                            onSubmit("admin_rejected");
                        }}
                        color="error"
                        variant="contained" startIcon={<i className="tabler-x"></i>}>
                        {isPending ? <CircularProgress size={16} className="text-white" /> : "Reject"}
                    </Button>
                    <Button
                        onClick={() => {
                            onSubmit("admin_approved");
                        }}
                        color="success"
                        variant="contained"
                        startIcon={<i className="tabler-check"></i>}
                    >
                        {isPending ? <CircularProgress size={16} className="text-white" /> : "Approve"}
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
