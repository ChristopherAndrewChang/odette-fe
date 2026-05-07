"use client";

import classNames from "classnames";

import { useColorScheme } from "@mui/material";

import { AppConfig } from "@/configs/appConfig";

type TKanbanCard = {
    contentType: "text" | "video" | "image";
    status: "pending_payment" | "pending_review" | "approved" | "rejected" | "paid" | "played";
    table: string;
    user: string;
    donationAmount: string;
    time: string;
    compact?: boolean;
    textContent?: {
        content: string;
    };
    imageContent?: {
        image: string;
        title: string;
    };
    videoContent?: {
        title: string;
        video: string;
    }
    onAccept?: () => void;
    onReject?: () => void;
    onMarkPlayed?: () => void;
    onShowImage?: (image: string) => void;
}

const getFileTitle = (url: string) => {
    const urlArr = url.split("/");

    return urlArr[urlArr?.length - 1];
}

function KanbanCard({ contentType, imageContent, onAccept, onReject, textContent, videoContent, status, donationAmount, table, user, time, onMarkPlayed, onShowImage, compact }: TKanbanCard) {
    const { mode } = useColorScheme();

    const Content = {
        text: (
            <div className={classNames("bg-white p-2 border-l-2 border-gray-300", {
                "!bg-gray-700 !border-gray-500": mode === "dark"
            })}>
                <p className={classNames("text-black font-medium", {
                    "!text-white": mode === "dark",
                    "!text-sm !font-normal": compact
                })}>{textContent?.content || ""}</p>
            </div>
        ),
        video: (
            <div className={classNames("bg-white p-2 border-l-2 border-gray-300", {
                "!bg-gray-700 !border-gray-500": mode === "dark"
            })}>
                <a href={`${AppConfig.mediaUrl}${videoContent?.video}`} target="_blank" className={classNames("text-black block font-medium", {
                    "text-white": mode === "dark",
                    "!text-xs": compact
                })}>{getFileTitle(videoContent?.title || "") || ""}</a>
            </div>
        ),
        image: (
            <div
                onClick={() => onShowImage && onShowImage(`${AppConfig.mediaUrl}${imageContent?.image || ""}`)}
                className={classNames("bg-white p-2 border-l-2 border-gray-300 cursor-pointer", {
                    "!bg-gray-700 !border-gray-500": mode === "dark"
                })}>
                <p className={classNames("text-black block font-medium", {
                    "!text-white": mode === "dark",
                    "!text-xs": compact
                })}>{getFileTitle(imageContent?.title || "") || ""}</p>
            </div>
        )
    }

    return (
        <div className={classNames("px-4 py-2 bg-gray-50 rounded-lg border min-w-96", {
            "!bg-gray-800": mode === "dark",
        })}>
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                    {compact && (contentType === "text") ? null : (
                        <p className={classNames("text-black", {
                            "!text-white": mode === "dark"
                        })}>{textContent?.content}</p>
                    )}

                    {/* status */}
                    <div className={classNames("px-2 py-1 rounded-lg border text-xs", {
                        "border-red-200 !bg-red-100 !text-red-500": status === "rejected" && mode === "light",
                        "border-yellow-200 !bg-yellow-50 !text-yellow-600": status === "pending_payment" && mode === "light",
                        "border-green-200 !bg-green-50 text-green-600": status === "paid" && mode === "light",
                        "border-blue-200 !bg-blue-50 text-blue-600": status === "played" && mode === "light",

                        "border-red-700 !bg-red-800 !text-white": status === "rejected" && mode === "dark",
                        "border-yellow-700 !bg-yellow-800 !text-white": status === "pending_payment" && mode === "dark",
                        "border-green-700 !bg-green-800 !text-white": status === "paid" && mode === "dark",
                        "border-blue-700 !bg-blue-800 !text-white": status === "played" && mode === "dark",
                    })}>
                        {status?.replace("_", " ")?.toUpperCase()}
                    </div>
                </div>
                <p className="text-green-600 text-sm">Rp{donationAmount}</p>
            </div>

            <div className={classNames("flex gap-2 items-center mb-4", {
                "!mb-2": compact
            })}>
                <div className={classNames("px-2 py-1 bg-white rounded-lg border", {
                    "!bg-gray-700": mode === "dark"
                })}>
                    <p className="text-xs">Table {table}</p>
                </div>

                <p className="text-sm">{user}</p>

                <p className="text-sm">{time}</p>
            </div>

            {/* content */}
            {Content[contentType]}

            {status === "paid" ? (
                <div
                    onClick={onMarkPlayed}
                    className={classNames("w-full px-4 py-2 flex items-center justify-center transition-all cursor-pointer bg-blue-100 border border-blue-200 rounded-lg text-blue-500 hover:bg-blue-200 mt-4", {
                        "!bg-blue-800 hover:!bg-blue-900 !border-blue-700 !text-white": mode === "dark",
                    })}
                >
                    Mark as Played
                </div>
            ) : null}

            {status === "pending_review" ? (
                <>
                    {/* action */}
                    <div className="flex gap-4 mt-4">
                        {!!onReject ? (
                            <div onClick={onReject} className={classNames("px-4 py-2 w-full rounded-lg border bg-red-100 flex justify-center items-center cursor-pointer hover:bg-red-200", {
                                "!bg-red-800 hover:!bg-red-900": mode === "dark"
                            })}>
                                <p>Reject</p>
                            </div>
                        ) : null}

                        {!!onAccept ? (
                            <div onClick={onAccept} className={classNames("px-4 py-2 w-full rounded-lg border bg-green-100 flex justify-center items-center cursor-pointer hover:bg-green-200", {
                                "!bg-green-700 hover:!bg-green-800": mode === "dark"
                            })}>
                                <p>Accept</p>
                            </div>
                        ) : null}
                    </div>
                </>
            ) : null}
        </div>
    )
}

export default KanbanCard
