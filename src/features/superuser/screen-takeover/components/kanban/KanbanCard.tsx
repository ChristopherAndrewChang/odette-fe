"use client";

import classNames from "classnames";

import { AppConfig } from "@/configs/appConfig";

type TKanbanCard = {
    contentType: "text" | "video" | "image";
    status: "pending_payment" | "pending_review" | "approved" | "rejected" | "paid" | "played";
    table: string;
    user: string;
    donationAmount: string;
    time: string;
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
}

const getFileTitle = (url: string) => {
    const urlArr = url.split("/");

    return urlArr[urlArr?.length - 1];
}

function KanbanCard({ contentType, imageContent, onAccept, onReject, textContent, videoContent, status, donationAmount, table, user, time, onMarkPlayed }: TKanbanCard) {
    const Content = {
        text: (
            <div className="bg-white p-2 border-l-2 border-gray-300 mb-4">
                <p className="text-black font-medium">{textContent?.content || ""}</p>
            </div>
        ),
        video: (
            <div className="bg-white p-2 border-l-2 border-gray-300 mb-4">
                <a href={`${AppConfig.mediaUrl}${videoContent?.video}`} target="_blank" className="text-black block font-medium">{getFileTitle(videoContent?.title || "") || ""}</a>
            </div>
        ),
        image: (
            <div className="bg-white p-2 border-l-2 border-gray-300 mb-4">
                <a href={`${AppConfig.mediaUrl}${imageContent?.image}`} target="_blank" className="text-black block font-medium">{getFileTitle(imageContent?.title || "") || ""}</a>
            </div>
        )
    }

    return (
        <div className="px-4 py-2 bg-gray-50 rounded-lg border min-w-96">
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                    <p className="text-black">{textContent?.content}</p>

                    {/* status */}
                    <div className={classNames("bg-gray-100 px-2 py-1 rounded-lg border text-xs", {
                        "border-red-200 !bg-red-100 !text-red-500": status === "rejected",
                        "border-yellow-200 !bg-yellow-50 !text-yellow-600": status === "pending_payment",
                        "border-green-200 !bg-green-50 text-green-600": status === "paid",
                        "border-blue-200 !bg-blue-50 text-blue-600": status === "played"
                    })}>
                        {status?.replace("_", " ")?.toUpperCase()}
                    </div>
                </div>
                <p className="text-green-600 text-sm">Rp{donationAmount}</p>
            </div>

            <div className="flex gap-2 items-center mb-4">
                <div className="px-2 py-1 bg-white rounded-lg border">
                    <p className="text-xs">{table}</p>
                </div>

                <p className="text-sm">{user}</p>

                <p className="text-sm">{time}</p>
            </div>

            {/* content */}
            {Content[contentType]}

            {status === "paid" ? (
                <div
                    onClick={onMarkPlayed}
                    className="w-full px-4 py-2 flex items-center justify-center transition-all cursor-pointer bg-blue-100 border border-blue-200 rounded-lg text-blue-500 hover:bg-blue-200"
                >
                    Mark as Played
                </div>
            ) : null}

            {status === "pending_review" ? (
                <>
                    {/* action */}
                    <div className="flex gap-4">
                        {!!onReject ? (
                            <div onClick={onReject} className="px-4 py-2 w-full rounded-lg border bg-red-100 flex justify-center items-center cursor-pointer hover:bg-red-200">
                                <p>Reject</p>
                            </div>
                        ) : null}

                        {!!onAccept ? (
                            <div onClick={onAccept} className="px-4 py-2 w-full rounded-lg border bg-green-100 flex justify-center items-center cursor-pointer hover:bg-green-200">
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
