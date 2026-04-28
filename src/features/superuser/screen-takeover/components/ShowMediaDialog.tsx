"use client";

import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import { AppConfig } from "@/configs/appConfig";

type TShowMediaDialog = {
    open: boolean;
    onClose: () => void;
    mediaUrl: string;
    type: "photo" | "video";
}

function ShowMediaDialog({ mediaUrl, onClose, open, type }: TShowMediaDialog) {
    const downloadApiUrl = `/api/download?url=${encodeURIComponent(`${AppConfig.mediaUrl}${mediaUrl}`)}`;

    const handleDownload = () => {
        window.location.href = downloadApiUrl;
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Media</DialogTitle>
            <DialogContent>

                {type === "photo" ? (
                    <img src={`${AppConfig.mediaUrl}${mediaUrl}`} className="w-full h-96 object-cover" alt="Media Photo" />
                ) : (
                    <video controls src={`${AppConfig.mediaUrl}${mediaUrl}`} className="w-full h-96 object-cover"></video>
                )}
                <p onClick={handleDownload} className="bg-blue-100 cursor-pointer text-blue-800 text-center rounded-lg block w-full px-4 py-2 transition-all hover:bg-blue-200 mt-4">Download</p>
            </DialogContent>
        </Dialog>
    )
}

export default ShowMediaDialog
