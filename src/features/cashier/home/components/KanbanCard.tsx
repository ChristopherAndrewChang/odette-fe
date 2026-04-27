"use client";

import classNames from "classnames";

import { AppConfig } from "@/configs/appConfig";

type TKanbanCard = {
    type: "songs" | "running_text" | "vtron_text" | "vtron_photo" | "vtron_video";
    title: string;
    donation_amount: string;
    artist?: string;
    table: string;
    user: string;
    time: string;
    onMarkBilled?: () => void;
    status: string;
    is_billed?: boolean;
    mediaData?: {
        mediaUrl: string;
    }
}

function KanbanCard({ donation_amount, artist, title, table, time, user, onMarkBilled, status, is_billed, type, mediaData }: TKanbanCard) {
    const getMediaTitle = () => {
        const mediaUrlArr = mediaData?.mediaUrl?.split("/");


        return mediaUrlArr?.[mediaUrlArr?.length - 1] || "";
    }

    return (
        <div className="p-4 bg-gray-800 rounded-lg border border-gray-600">
            <div className="flex justify-between items-center">
                <p className="text-white overflow-x-auto">{title}</p>
                <p className="text-green-700 text-sm">Rp{donation_amount}</p>
            </div>

            {type === "songs" ? (
                <p className="text-gray-500 text-sm overflow-x-auto">{artist}</p>
            ) : null}

            {!!mediaData ? (
                <a target="_blank" href={`${AppConfig.mediaUrl}${mediaData?.mediaUrl}`} className="bg-gray-700 px-2 py-1 border-l-2 border-gray-400 cursor-pointer my-4 block">
                    <p className="text-xs text-white">{getMediaTitle()}</p>
                </a>
            ) : null}

            <div className="flex items-center gap-2 mt-2">
                {/* table */}
                <div className="px-2 py-1 bg-gray-700 w-fit rounded-lg">
                    <p className="text-gray-300 text-xs">Table {table}</p>
                </div>

                {/* user name */}
                <p className="text-xs text-gray-300">{user}</p>

                {/* time */}
                <p className="text-xs text-gray-300">{time}</p>
            </div>

            {/* status */}
            <div className="flex items-center gap-1 mt-4">
                <p className="text-xs text-gray-200">Status: </p>
                <div className={classNames("px-2 py-1 border border-gray-400 bg-gray-700 rounded-lg", {
                    "bg-green-900 border border-green-800": status === "paid"
                })}>
                    <p className="text-xs text-white">{status}</p>
                </div>
            </div>

            {/* billed */}
            {type === "songs" ? (
                <>
                    {(!is_billed) ? (
                        <div className="py-2 px-4 w-full flex justify-center items-center bg-gray-900 border rounded-lg border-gray-700 mt-4 transition-all cursor-pointer hover:bg-gray-950" onClick={onMarkBilled}>
                            <p className="text-white">Mark as Billed</p>
                        </div>
                    ) : (
                        <div className="py-2 px-4 w-full flex justify-center items-center border rounded-lg border-green-700 mt-4">
                            <p className="text-green-700 font-medium">Billed</p>
                        </div>
                    )}
                </>
            ) : null}
        </div>
    )
}

export default KanbanCard
