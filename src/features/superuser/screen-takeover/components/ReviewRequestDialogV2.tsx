"use client";

import { Button, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

type T_ReviewRequestDialog = {
    open: boolean;
    onClose: () => void;
    type: "approved" | "rejected";
}

function ReviewRequestDialogV2({ onClose, open }: T_ReviewRequestDialog) {
    const onSubmit = () => { };

    return (
        <Dialog fullWidth open={open} onClose={onClose}>
            <DialogTitle>Approval Confirmation</DialogTitle>
            <DialogContent>
                <main className="flex flex-col gap-4">
                    <Typography>Are you sure to proceed? This action can not be undone</Typography>
                    <div className="flex gap-2">
                        <Button variant="outlined" color="inherit" onClick={onClose}>Cancel</Button>
                        <Button variant="contained" onClick={onSubmit}>Proceed</Button>
                    </div>
                </main>
            </DialogContent>
        </Dialog>
    )
}

export default ReviewRequestDialogV2;
