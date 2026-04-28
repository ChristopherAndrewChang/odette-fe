"use client";

import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import Image from "next/image";

type TShowMediaDialog = {
    open: boolean;
    onClose: () => void;
    mediaUrl: string;
    type: "photo" | "video";
}

function ShowMediaDialog({ mediaUrl, onClose, open }: TShowMediaDialog) {
    const mediaArr = mediaUrl.split("/");
    const mediaTitle = mediaArr?.[mediaArr?.length - 1];

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Media</DialogTitle>
            <DialogContent>
                <img src={mediaUrl} className="w-full h-96 object-cover" alt="Media Photo" />
                <a href={mediaUrl} download={mediaTitle} className="bg-blue-100 text-blue-800 text-center rounded-lg block w-full px-4 py-2 transition-all hover:bg-blue-200 mt-4">Download</a>
            </DialogContent>
        </Dialog>
    )
}

export default ShowMediaDialog
