"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Button, CircularProgress, Dialog, DialogContent, Typography } from "@mui/material";
import { getErrorMessage, PvInput, useQueryParams } from "@ozanplanviu/planviu-core";

import toast from "react-hot-toast";

import { useForm } from "react-hook-form";

import Cookies from "js-cookie";

import { useTopLoader } from "nextjs-toploader";

import { useUserScanMutation } from "./hooks/scan";
import { useColor } from "@/hooks/color";
import Logo from "@/components/layout/shared/Logo";
import { STORAGE_KEY } from "@/data/internal/storage";
import { APP_URL } from "@/data/internal/app-route";

type TRequest = {
    customer_name: string;
};

function UserScan() {
    const { DARKBLUE } = useColor();
    const [openPage,] = useState(true);

    const { getParam } = useQueryParams();
    const router = useRouter();
    const loader = useTopLoader();

    const { control, handleSubmit } = useForm<TRequest>({
        defaultValues: {
            customer_name: ""
        }
    });

    const { mutate, isPending } = useUserScanMutation({
        onSuccess: (res) => {
            toast.success("Success");
            localStorage.setItem(STORAGE_KEY.USER_SESSION, res?.data?.session_token);
            localStorage.setItem(STORAGE_KEY.USER_NAME, res?.data?.customer_name);
            localStorage.setItem(STORAGE_KEY.USER_TABLE, res?.data?.table_number?.toString());

            Cookies.set(STORAGE_KEY.USER_SESSION, res?.data?.session_token);

            router.push(APP_URL.USER_HOME.INDEX);
            loader.start();
        },
        onError: (err) => {
            toast.error(getErrorMessage(err));
        }
    });

    const onSubmit = (data: TRequest) => {
        mutate({
            method: "POST",
            data: {
                ...data,
                token: getParam("token")
            }
        });
    }

    const renderNoToken = (
        <div>
            <Typography>Your session has ended or no token was found. Please scan the QR code to start a new session.</Typography>
        </div>
    );

    return (
        <Dialog open={openPage} fullWidth className="p-4" style={{
            backgroundColor: DARKBLUE
        }}>
            <DialogContent>
                {getParam("token") ? (
                    <div>
                        <div className="flex justify-center mb-2">
                            <Logo noText />
                        </div>
                        <Typography className="font-outfit text-xl font-semibold text-black text-center mb-4">Welcome to Odette</Typography>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                            <PvInput
                                control={control}
                                name="customer_name"
                                label="Enter your name"
                                required
                                rules={{
                                    required: { value: true, message: "This field is required" }
                                }}
                            />
                            <Button disabled={isPending} type="submit" fullWidth variant="contained" className="bg-gray-900">
                                {isPending ? <CircularProgress size={18} className="text-white" /> : "Proceed"}
                            </Button>
                        </form>
                    </div>
                ) : (renderNoToken)}
            </DialogContent>
        </Dialog>
    )
}

export default UserScan;
