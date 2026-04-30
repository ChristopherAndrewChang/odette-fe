"use client";

import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

import toast from "react-hot-toast";

import { getErrorMessage } from "@ozanplanviu/planviu-core";

import { useQueryClient } from "@tanstack/react-query";

import { useMinimumDonationSettingsMutation } from "../../hooks/minimum-donation";
import { QUERY_KEY } from "@/data/internal/query-keys";


type TActiveDialog = {
    open: boolean;
    onClose: () => void;
    id: string;
}

function ActiveDialog({ onClose, open, id }: TActiveDialog) {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMinimumDonationSettingsMutation({
        onSuccess: () => {
            toast.success("Succces");
            onClose();
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.SETTINGS_DONATION.INDEX]
            });
        },
        onError: (err) => {
            toast.error(getErrorMessage(err));
        }
    });

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>
                <Typography className="mb-4">Are you sure?</Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" color="inherit">No</Button>
                    <Button variant="contained" onClick={() => {
                        mutate({
                            method: "PATCH",
                            isActivate: true,
                            id: id
                        });
                    }}>
                        {isPending ? <CircularProgress size={18} className="text-white" /> : "Yes"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ActiveDialog
