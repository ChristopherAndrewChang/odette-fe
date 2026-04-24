"use client";

import { useEffect, useRef, useState } from "react";

import { Controller, useForm } from "react-hook-form";

import classNames from "classnames";

import { Button, CircularProgress, Typography } from "@mui/material";

import toast from "react-hot-toast";

import { getErrorMessage } from "@ozanplanviu/planviu-core";

import { useQueryClient } from "@tanstack/react-query";

import GroupTitle from "./GroupTitle";
import { useColor } from "@/hooks/color";
import { useReqScreenTakeoverMutation } from "../hooks/screen-takeover";
import { QUERY_KEY } from "@/data/internal/query-keys";
import { useDonationSettingsPublicQuery } from "../../shared/hooks/donation-settings";

type TCONTENT_TYPE = "running_text" | "vtron_text" | "vtron_photo" | "vtron_video";

const CONTENT_TYPE_DATA: { label: string; icon: string; key: TCONTENT_TYPE; }[] = [
    { key: "running_text", label: "Running Text", icon: "tabler-message" },
    { key: "vtron_text", label: "Vtron Text", icon: "tabler-message" },
    { key: "vtron_photo", label: "Vtron Image", icon: "tabler-photo" },
    { key: "vtron_video", label: "Vtron Video", icon: "tabler-video" }
]

type TRequest = {
    content_type: TCONTENT_TYPE;
    message: string;
    donation: string;
    donation_amount: string;
}

function ScreenTakeoverForm() {
    const defaultValue = {
        content_type: "running_text" as TCONTENT_TYPE,
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

    const { data: donations, isFetching: fetchingDonation } = useDonationSettingsPublicQuery();

    const getDonationsList = (content: TCONTENT_TYPE) => {
        if (fetchingDonation) return [];

        const adderValues = [0, 10_000, 20_000, 30_000, 40_000, 50_000, 60_000, 70_000, 80_000];

        return adderValues.map(adder => (donations?.data?.[content] || 0) + adder);
    }

    const { mutate, isPending } = useReqScreenTakeoverMutation({
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.SCREEN_TAKEOVER.INDEX]
            });
            reset(defaultValue);

            console.log(res);

            if ((res?.data?.request_type === "running_text") || (res?.data?.request_type === "vtron_text")) {
                toast.success("Success");
                window.open(res?.data?.payment_link || "", "_blank");
            } else {
                toast.success("Please wait for your request to be confirmed by the admin. Check the history or visit the home page to proceed with your payment.", {
                    duration: 5000,
                });
            }
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

        if (data?.donation === "custom" && (Number(data?.donation_amount) < (donations?.data?.[data.content_type] || 0))) {
            toast.error(`Minimum tip amount is Rp${donations?.data?.[data.content_type].toLocaleString()}`);

            return;
        }

        if (data.content_type === "running_text" || data.content_type === "vtron_text") {
            mutate({
                method: "POST",
                type: "text",
                data: {
                    request_type: data.content_type,
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
                type: watch("content_type") === "vtron_photo" ? "photo" : "video",
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
                <div className="grid grid-cols-4 gap-4">
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
            {((watch("content_type") === "vtron_photo") || (watch("content_type") === "vtron_video")) ? (
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
                    <GroupTitle title={`Your ${watch("content_type") === "vtron_photo" ? "Photo" : "Video"}`} />
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
                        <p style={{ color: `${GRAY}70` }}>Upload your {watch("content_type") === "vtron_photo" ? "Photo" : "Video"}</p>
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

                {fetchingDonation ? (
                    <div className="flex items-center gap-2">
                        <CircularProgress size={18} className="text-gray-400" />
                        <Typography className="text-gray-400">Loading Tip List</Typography>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        {getDonationsList(watch("content_type"))?.map(num => (
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
                )}
            </div>

            {/* submit button */}
            <Button
                type="submit"
                color="warning"
                size="large"
                variant="contained"
                fullWidth
                disabled={fetchingDonation}
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
