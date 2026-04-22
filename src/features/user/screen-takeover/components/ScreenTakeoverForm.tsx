"use client";

import { useEffect, useRef, useState } from "react";

import { Controller, useForm } from "react-hook-form";

import classNames from "classnames";

import { Button, CircularProgress } from "@mui/material";

import toast from "react-hot-toast";

import { getErrorMessage } from "@ozanplanviu/planviu-core";

import { useQueryClient } from "@tanstack/react-query";

import GroupTitle from "./GroupTitle";
import { useColor } from "@/hooks/color";
import { useReqScreenTakeoverMutation } from "../hooks/screen-takeover";
import { QUERY_KEY } from "@/data/internal/query-keys";

const CONTENT_TYPE_DATA: { label: string; icon: string; key: string; }[] = [
    { key: "text", label: "Text", icon: "tabler-message" },
    { key: "photo", label: "Image", icon: "tabler-photo" },
    { key: "video", label: "Video", icon: "tabler-video" }
]

type TRequest = {
    content_type: string;
    message: string;
    donation: string;
    donation_amount: string;
}

function ScreenTakeoverForm() {
    const defaultValue = {
        content_type: "text",
        message: "",
        donation_amount: "",
        donation: ""
    };

    const queryClient = useQueryClient();
    const { GOLD, DARKBG, GRAY, OLD_GOLD, DARKBLUE } = useColor();

    const [file, setFile] = useState<File | null>(null);
    const fileRef = useRef<HTMLInputElement | null>(null);

    const { control, setValue, watch, handleSubmit, reset } = useForm<TRequest>({
        defaultValues: defaultValue
    });

    const { mutate, isPending } = useReqScreenTakeoverMutation({
        onSuccess: () => {
            toast.success("Success");
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.SCREEN_TAKEOVER.INDEX]
            });
            reset(defaultValue);
        },
        onError: (err) => {
            toast.error(getErrorMessage(err));
        }
    });

    const onSubmit = (data: TRequest) => {
        if (!data?.donation || (data?.donation === "custom") && !data?.donation_amount) {
            toast.error("Invalid Donation Value");

            return;
        }

        if (data.content_type === "text") {
            mutate({
                method: "POST",
                type: data.content_type as "text" | "photo" | "video",
                data: {
                    request_type: "running_text",
                    message: data?.message,
                    donation_amount: (data?.donation === "custom") ? data?.donation_amount : data?.donation
                }
            });
        } else {
            if (!file) {
                toast.error("File is required");

                return;
            }

            const formData = new FormData();

            formData.append("request_type", data?.content_type);
            formData.append("message", data?.message);
            formData.append("donation_amount", (data?.donation === "custom") ? data?.donation_amount : data?.donation);
            formData.append("media_file", file);

            mutate({
                method: "POST",
                type: watch("content_type") as "photo" | "video",
                data: formData,
            });
        }
    }

    useEffect(() => {
        setFile(null);
    }, [watch("content_type")]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* content type */}
            <div className="mb-8">
                <GroupTitle title="Content Type" />
                <div className="grid grid-cols-3 gap-4">
                    {CONTENT_TYPE_DATA.map((contentType) => (
                        <div
                            key={contentType.key}
                            onClick={() => {
                                setValue("content_type", contentType.key);
                            }}
                            className="flex items-center justify-center gap-2 text-white p-4 border border-gray-800 rounded-xl cursor-pointer"
                            style={{
                                borderWidth: 0.2,
                                borderColor: (watch("content_type") !== contentType.key) ? `${GRAY}80` : GOLD,
                                backgroundColor: (watch("content_type") !== contentType.key) ? DARKBG : OLD_GOLD,
                                color: (watch("content_type") !== contentType.key) ? GRAY : GOLD
                            }}
                        >
                            <i className={classNames(contentType.icon, "text-lg")}></i>
                            <p className="font-poppins">{contentType.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* media */}
            {((watch("content_type") === "photo") || (watch("content_type") === "video")) ? (
                <div className="mb-8">
                    <input
                        ref={fileRef}
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                            if (!!e.target?.files?.[0]) {
                                setFile(e?.target?.files?.[0]);
                            }
                        }}
                    />
                    <GroupTitle title={`Your ${watch("content_type") === "photo" ? "Photo" : "Video"}`} />
                    <div
                        onClick={() => {
                            fileRef.current?.click();
                        }}
                        className="p-6 border rounded-xl flex items-center justify-center gap-1"
                        style={{
                            borderColor: `${GRAY}70`,
                            backgroundColor: DARKBLUE
                        }}>
                        <i className="tabler-file text-lg" style={{ color: `${GRAY}70` }}></i>
                        <p style={{ color: `${GRAY}70` }}>Upload your {watch("content_type") === "photo" ? "Photo" : "Video"}</p>
                    </div>

                    {/* file uploaded */}
                    {!!file ? (
                        <div className="flex gap-1 items-center mt-2">
                            <i onClick={() => setFile(null)} className="tabler-trash w-4 text-lg text-error"></i>
                            <p className="text-white">{file?.name}</p>
                        </div>
                    ) : null}
                    {/* end of file uploaded */}
                </div>
            ) : null}
            {/* end of media */}

            {/* message */}
            <div className="mb-8">
                <GroupTitle title="Your Message" />
                <Controller
                    control={control}
                    name="message"
                    render={({ field: { value, onChange } }) => (
                        <textarea
                            placeholder="e.g. Happy Birthday You"
                            className="block w-full p-4 rounded-xl border text-white font-poppins text-lg focus:outline-none"
                            style={{
                                backgroundColor: DARKBLUE,
                                borderWidth: 0.4,
                                borderColor: `${GRAY}70`
                            }}
                            value={value}
                            onChange={e => onChange(e.target.value)}
                        />
                    )}
                />
            </div>

            {/* sawer amount */}
            <div className="">
                <GroupTitle title="Tip Amount" />
                <div className="grid grid-cols-3 gap-4 mb-4">
                    {[10000, 25000, 50000, 100000, 250000, 500000].map(num => (
                        <div
                            key={num}
                            onClick={() => {
                                setValue("donation", num?.toString());
                            }}
                            className="py-2 px-4 rounded-xl"
                            style={{
                                borderWidth: 0.2,
                                borderColor: (watch("donation") !== num?.toString()) ? `${GRAY}80` : GOLD,
                                backgroundColor: (watch("donation") !== num?.toString()) ? DARKBLUE : OLD_GOLD,
                                color: (watch("donation") !== num?.toString()) ? GRAY : GOLD
                            }}
                        >
                            <p className="font-poppins text-center text-gray-400 font-medium">Rp{num.toLocaleString("ID")}</p>
                        </div>
                    ))}

                    <div
                        onClick={() => {
                            setValue("donation", "custom");
                        }}
                        className="py-2 px-4 rounded-xl"
                        style={{
                            borderWidth: 0.2,
                            borderColor: (watch("donation") !== "custom") ? `${GRAY}80` : GOLD,
                            backgroundColor: (watch("donation") !== "custom") ? DARKBLUE : OLD_GOLD,
                            color: (watch("donation") !== "custom") ? GRAY : GOLD
                        }}
                    >
                        <p className="font-poppins text-center text-gray-400 font-medium">Custom</p>
                    </div>

                    <Controller
                        control={control}
                        name="donation_amount"
                        render={({ field: { value, onChange } }) => (
                            <input
                                type="text"
                                placeholder="Type Custom Amount"
                                value={value}
                                onChange={onChange}
                                className="block col-span-2 w-full px-4 py-2 rounded-xl border text-white font-poppins placeholder:text-gray-400 focus:outline-none"
                                disabled={(watch("donation") !== "custom")}
                                style={{
                                    backgroundColor: (watch("donation") === "custom") ? DARKBLUE : `${GRAY}70`,
                                    borderWidth: 0.4,
                                    borderColor: `${GRAY}70`
                                }}
                            />
                        )}
                    />
                </div>
            </div>

            {/* submit button */}
            <Button
                type="submit"
                color="warning"
                size="large"
                variant="contained"
                fullWidth
                className="text-black my-3"
                style={{
                    backgroundImage: `linear-gradient(to right, ${GOLD}, ${GOLD},${GOLD}, ${GOLD}, ${GOLD},${GOLD}90)`
                }}>
                {isPending ? <CircularProgress size={18} className="text-black" /> : "Send and Pay"}
            </Button>

            <p className="text-gray-400 text-sm text-center">Min tip Rp10.000 - Subject to approval</p>
        </form>
    )
}

export default ScreenTakeoverForm;
