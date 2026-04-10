"use client"

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Button, Card, CardContent, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import Cookies from "js-cookie";

import toast from "react-hot-toast";

import { useTopLoader } from "nextjs-toploader"

import InputCustomized from "@/@pv/components/form/InputCustomized";
import Logo from "@/components/layout/shared/Logo";
import { useLoginMutation } from "./hooks/login";
import { regNoBlankspace } from "@/@pv/utils/validation";
import { STORAGE_KEY } from "@/data/internal/storage";
import { getRoleFromJWT } from "@/utils/auth";
import { APP_URL } from "@/data/internal/app-route";
import { useIsPWA } from "@/hooks/pwa";

type TRequest = {
    username: string;
    password: string;
}

function Login() {
    const isPWA = useIsPWA();

    const router = useRouter();
    const topLoader = useTopLoader();

    const [showPassword, setShowPassword] = useState(false);

    const { control, handleSubmit } = useForm<TRequest>({
        defaultValues: {
            username: "",
            password: ""
        }
    });

    const redirectToHome = (role: string) => {
        if (role === "superuser") {
            topLoader.start();
            router.push(APP_URL.SUPERUSER_USERS.INDEX);

            // TODO: [critical] Make sure role nya apa aja
        } else if (role === "admin") {
            topLoader.start();
            router.push(APP_URL.SUPERUSER_TABLE.INDEX);
        } else if (role === "user") {
            topLoader.start();
            router.push(APP_URL.ADMIN_HOME.INDEX);
        } else if (role === "dj") {
            topLoader.start();
            router.push(APP_URL.DJ_HOME.INDEX);
        }
    }

    const { mutate, isPending } = useLoginMutation({
        onSuccess: (res) => {
            toast.success("Login Success");
            const role = getRoleFromJWT(res?.data?.access || "");

            Cookies.set(STORAGE_KEY.TOKEN, res?.data?.access);
            localStorage.setItem(STORAGE_KEY.TOKEN, res.data?.access);

            redirectToHome(role || "");
        },
        onError: (err) => {
            const errMsg = err?.response?.data?.detail;

            toast.error(errMsg);
        }
    });

    const onLogin = (data: TRequest) => {
        const payload = {
            ...data
        }

        mutate({
            method: "POST",
            data: payload
        });
    }

    return (
        <div className="w-screen min-h-screen flex items-center justify-center">
            <Card className="w-full sm:w-4/5 md:w-1/2 lg:w-1/3">
                <CardContent>
                    {isPWA && <p>PWA</p>}
                    <div className="flex flex-col gap-2 items-center mb-4">
                        <Logo noText />
                        <Typography className="text-primary font-semibold text-2xl font-poppins">Login Here</Typography>
                        <Typography>Enter your credentials to access the system</Typography>
                    </div>
                    {/* end of image logo */}
                    <form onSubmit={handleSubmit(onLogin)} className="flex flex-col gap-4">
                        <InputCustomized
                            control={control}
                            name="username"
                            label="Username"
                            rules={{
                                required: {
                                    value: true,
                                    message: "This field is required"
                                },
                                validate: {
                                    noBlankSpace: value => regNoBlankspace.test(value) || "You must fill with no blankspace",
                                }
                            }}
                        />

                        <InputCustomized
                            control={control}
                            name="password"
                            isPassword
                            type={showPassword ? "text" : "password"}
                            onPasswordTypeChange={() => {
                                setShowPassword(prev => !prev);
                            }}
                            rules={{
                                required: { value: true, message: "This field is required" }
                            }}
                            label="Password"
                        />

                        <div className="flex items-center gap-2">
                            <Button fullWidth variant="contained" type="submit">
                                {isPending ? "Loading..." : "Login"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login
