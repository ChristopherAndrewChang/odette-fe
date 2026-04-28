"use client";

import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import { AppConfig } from "@/configs/appConfig";

type TShowMediaDialog = {
    open: boolean;
    onClose: () => void;
    mediaUrl: string;
    type: "photo" | "video";
}

function ShowMediaDialog({ mediaUrl, onClose, open }: TShowMediaDialog) {
    const mediaArr = mediaUrl.split("/");
    const mediaTitle = mediaArr?.[mediaArr?.length - 1];

    const handleDownload = async (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
        e.preventDefault();

        try {
            // Mengambil data file sebagai Blob (data biner)
            const response = await fetch(`${AppConfig.mediaUrl}${mediaUrl}`);
            const blob = await response.blob();

            // Membuat URL sementara dari Blob
            const blobUrl = window.URL.createObjectURL(blob);

            // Membuat elemen <a> sementara untuk men-trigger download
            const link = document.createElement("a");

            link.href = blobUrl;
            link.download = mediaTitle;
            document.body.appendChild(link);
            link.click();

            // Membersihkan elemen setelah diklik
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Gagal mendownload file, CORS mungkin memblokir:", error);

            // Fallback: jika gagal fetch (biasanya karena CORS), buka di tab baru
            window.open(`${AppConfig.mediaUrl}${mediaUrl}`, "_blank");
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Media</DialogTitle>
            <DialogContent>
                <img src={`${AppConfig.mediaUrl}${mediaUrl}`} className="w-full h-96 object-cover" alt="Media Photo" />
                <p onClick={handleDownload} className="bg-blue-100 cursor-pointer text-blue-800 text-center rounded-lg block w-full px-4 py-2 transition-all hover:bg-blue-200 mt-4">Download</p>
            </DialogContent>
        </Dialog>
    )
}

export default ShowMediaDialog
