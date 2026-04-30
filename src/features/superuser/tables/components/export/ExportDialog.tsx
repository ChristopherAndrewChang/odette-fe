"use client";

import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

import toast from "react-hot-toast";

import dayjs from "dayjs";

import { useTableExportQuery } from "../../hooks/tables";

type TExportDialog = {
    open: boolean;
    onClose: () => void;
}

function ExportDialog({ onClose, open }: TExportDialog) {
    const { refetch, isFetching } = useTableExportQuery();

    const onExport = async () => {
        try {
            const res = await refetch();

            if (!res.data?.data) {
                toast.error("Something went wrong");

                return;
            }

            toast.success("Success");
            const url = URL.createObjectURL(res.data.data);

            const a = document.createElement("a");

            const date = new Date();

            a.href = url;
            a.download = `odette_table_export_${dayjs(date).format("DDMMYYYY")}_${dayjs(date).format("HHmm")}`;
            a.click();
        } catch (e) {
            toast.error("Failed to export, something went wrong");
        }
    }

    return (
        <Dialog fullWidth open={open} onClose={onClose}>
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>
                <Typography>Are you sure to export the existing data?</Typography>
                <div className="flex gap-2 mt-4">
                    <Button variant="outlined" color="inherit" onClick={onClose}>Cancel</Button>
                    <Button variant="contained" onClick={onExport}>
                        {isFetching ? <CircularProgress size={18} className="text-white" /> : "Export"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ExportDialog
