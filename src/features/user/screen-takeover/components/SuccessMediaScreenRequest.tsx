"use client";

import { useRouter } from "next/navigation";

import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useTopLoader } from "nextjs-toploader";

import { APP_URL } from "@/data/internal/app-route";

type TSuccessMediaScreenRequest = {
    open: boolean;
    onClose: () => void;
}

function SuccessMediaScreenRequest({ onClose, open }: TSuccessMediaScreenRequest) {
    const router = useRouter();
    const loader = useTopLoader();

    const onGotoHomePage = () => {
        router.push(APP_URL.USER_HOME.INDEX);
        loader.start();
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Success</DialogTitle>
            <DialogContent>
                <div className="mb-4">
                    <p>Your request is sucessfully send to the admin. </p>
                    <p>Please wait for your request to be confirmed by the admin. Check the history or visit the home page to proceed with your payment</p>
                </div>

                <div className="flex gap-2">
                    <Button onClick={onClose} variant="outlined" color="inherit">Close</Button>
                    <Button onClick={onGotoHomePage} variant="contained">Go to homepage</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SuccessMediaScreenRequest
