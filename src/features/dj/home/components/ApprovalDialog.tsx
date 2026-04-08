"use client";

import { Button, CircularProgress, Dialog, DialogContent, DialogTitle } from "@mui/material";

import toast from "react-hot-toast";

import { useQueryClient } from "@tanstack/react-query";

import { getErrorMessage } from "@ozanplanviu/planviu-core";

import { useMusicRequestDJApproval } from "../hooks/music-request";
import { QUERY_KEY } from "@/data/internal/query-keys";

type TApprovalDialog = {
    open: boolean;
    onClose: () => void;
    id: string;
}

function ApprovalDialog({ onClose, open, id }: TApprovalDialog) {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMusicRequestDJApproval({
        onSuccess: () => {
            toast.success("Success");
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.SONG_REQUEST.INDEX] });
            onClose();
        },
        onError: (err) => {
            toast.error(getErrorMessage(err));
        }
    });

    const onApproval = (type: "dj_approved" | "dj_rejected") => {
        mutate({
            method: "PATCH",
            type: type,
            id: id
        });
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Approval</DialogTitle>
            <DialogContent>
                <p className="font-poppins mb-4">Select your action to this request</p>
                <div className="flex gap-2">
                    <Button
                        color="error"
                        variant="contained"
                        disabled={isPending}
                        onClick={() => {
                            onApproval("dj_rejected");
                        }}>
                        {isPending ? <CircularProgress size={20} className="text-white" /> : "Rejected"}
                    </Button>
                    <Button
                        color="success"
                        variant="contained"
                        disabled={isPending}
                        onClick={() => {
                            onApproval("dj_approved");
                        }}>
                        {isPending ? <CircularProgress size={20} className="text-white" /> : "Approved"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ApprovalDialog
