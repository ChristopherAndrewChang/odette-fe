"use client";

import { useMemo, useState } from "react";

import { Button, CircularProgress, Typography, useColorScheme } from "@mui/material";
import classNames from "classnames";

import { useMinimumDonationSettingsQuery } from "../../hooks/minimum-donation";
import UpdateDataDialog from "./UpdateDataDialog";
import AddNewDialog from "./AddNewDialog";
import ActiveDialog from "./ActiveDialog";
import { colors } from "@/hooks/color";

// Helper function untuk merapikan nama kolom
const formatColumnName = (col: string) => {
    return col
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

function MinimumDonationSetting() {
    const [openCreate, setOpenCreate] = useState(false);
    const { mode } = useColorScheme();

    const [activate, setActve] = useState<{ cond: boolean; id: string }>({
        cond: false,
        id: "",
    });

    const [updateState, setUpdateState] = useState<{
        id: string;
        name: string;
        cond: boolean;
        min_amount: string;
    }>({
        id: "",
        name: "",
        cond: false,
        min_amount: "",
    });

    const { data, isFetching } = useMinimumDonationSettingsQuery();

    // 👉 Define column order
    const columns = [
        "song_request",
        "running_text",
        "vtron_text",
        "vtron_photo",

        // "vtron_video",
    ];

    // 👉 Grouped data (memo biar gak recompute terus)
    const grouped = useMemo(() => {
        if (!data?.data) return {};

        return data.data.reduce((acc, item) => {
            if (!acc[item.request_type]) {
                acc[item.request_type] = [];
            }

            acc[item.request_type].push(item);

            return acc;
        }, {} as Record<string, typeof data.data>);
    }, [data]);

    // 👉 Max row count
    const maxRows = useMemo(() => {
        return Math.max(0, ...columns.map((col) => grouped[col]?.length || 0));
    }, [grouped]);

    if (isFetching) {
        return (
            <div className="flex justify-center py-10">
                <CircularProgress size={32} />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Dialogs */}
            <UpdateDataDialog
                data={{
                    id: updateState.id,
                    name: updateState.name,
                    min_amount: updateState.min_amount,
                }}
                open={updateState.cond}
                onClose={() =>
                    setUpdateState({
                        id: "",
                        cond: false,
                        name: "",
                        min_amount: "",
                    })
                }
            />

            <AddNewDialog onClose={() => setOpenCreate(false)} open={openCreate} />

            <ActiveDialog
                id={activate.id}
                onClose={() =>
                    setActve({
                        cond: false,
                        id: "",
                    })
                }
                open={activate.cond}
            />

            {/* Header & Add Button */}
            <div className="flex items-center justify-between">
                <div>
                    <Typography variant="h5" className={classNames("font-bold text-gray-800", {
                        "!text-white": mode === "dark"
                    })}>
                        Minimum Donation Settings
                    </Typography>
                    <Typography variant="body2" className={classNames("text-gray-500", { "text-gray-200": mode === "dark" })}>
                        Manage your donation thresholds for each request type.
                    </Typography>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    className="!rounded-lg !px-6 !py-2.5 !shadow-sm !normal-case"
                    onClick={() => setOpenCreate(true)}
                >
                    + Add New
                </Button>
            </div>

            {/* Table Section */}
            <section className={classNames("w-full overflow-hidden bg-white border border-gray-200 rounded-xl", {
                "!bg-gray-900 !border-gray-700": mode === "dark"
            })}>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead
                            className={classNames("bg-gray-50")}
                            style={{
                                ...(mode === "dark" ? { backgroundColor: colors.DARKBLUE } : {})
                            }}
                        >
                            <tr>
                                {columns.map((col) => (
                                    <th
                                        key={col}
                                        className={classNames("px-6 py-4 text-sm font-semibold tracking-wide text-left text-gray-600 uppercase whitespace-nowrap", {
                                            "!text-gray-200": mode === "dark"
                                        })}
                                    >
                                        {formatColumnName(col)}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody
                            className={classNames("bg-slate-50/30 divide-y divide-gray-100")}
                            style={{
                                ...(mode === "dark" ? { backgroundColor: colors.DARKBLUE } : {})
                            }}
                        >
                            {Array.from({ length: maxRows }).map((_, rowIndex) => (
                                <tr key={rowIndex}>
                                    {columns.map((col) => {
                                        const item = grouped[col]?.[rowIndex];

                                        return (
                                            <td
                                                key={col}
                                                className="p-3 align-top min-w-[260px]"
                                            >
                                                {item ? (

                                                    // Card UI untuk setiap item
                                                    <div
                                                        className={classNames(
                                                            "flex flex-col gap-3 p-4 bg-white border rounded-xl transition-all hover:shadow-md h-full",
                                                            item.is_active
                                                                ? "border-green-400 ring-1 ring-green-100"
                                                                : "border-gray-200",
                                                            {
                                                                "!bg-gray-800 !border-gray-600": mode === "dark" && !item.is_active,
                                                                "!bg-gray-800 !border-green-700 !ring-green-600": mode === "dark" && !!item.is_active,
                                                            }
                                                        )}
                                                    >
                                                        {/* Name & Active Badge */}
                                                        <div className="flex items-start justify-between gap-2">
                                                            <Typography className={classNames("font-medium text-gray-800 line-clamp-2 text-sm", {
                                                                "text-white": mode === "dark"
                                                            })}>
                                                                {item.name}
                                                            </Typography>
                                                            {item.is_active && (
                                                                <span className={classNames("px-2.5 py-0.5 text-[10px] font-bold text-green-700 bg-green-100 rounded-full uppercase tracking-wider", {
                                                                    "!bg-green-700 !text-white": mode === "dark"
                                                                })}>
                                                                    Active
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* Amount */}
                                                        <Typography className={classNames("text-lg font-bold text-gray-900", {
                                                            "!text-gray-200": mode === "dark"
                                                        })}>
                                                            Rp{" "}
                                                            {item.min_amount.toLocaleString(
                                                                "id-ID"
                                                            )}
                                                        </Typography>

                                                        {/* Actions */}
                                                        <div className={classNames("flex gap-2 pt-3 mt-auto border-t border-gray-100", {
                                                            "!border-gray-600": mode === "dark"
                                                        })}>
                                                            <button
                                                                onClick={() => {
                                                                    setUpdateState({
                                                                        cond: true,
                                                                        id: item.id.toString(),
                                                                        name: item.name,
                                                                        min_amount: item.min_amount.toString(),
                                                                    });
                                                                }}
                                                                className={classNames("cursor-pointer flex-1 px-3 py-1.5 text-xs font-semibold text-blue-700 transition-colors bg-blue-50 rounded-lg hover:bg-blue-100", {
                                                                    "!bg-blue-700 hover:!bg-blue-800 !text-white": mode === "dark"
                                                                })}
                                                            >
                                                                Edit
                                                            </button>

                                                            {!item.is_active && (
                                                                <button
                                                                    onClick={() => {
                                                                        setActve({
                                                                            cond: true,
                                                                            id: item.id.toString(),
                                                                        });
                                                                    }}
                                                                    className={classNames("cursor-pointer flex-1 px-3 py-1.5 text-xs font-semibold text-green-700 transition-colors bg-green-50 rounded-lg hover:bg-green-100", {
                                                                        "!bg-green-700 hover:!bg-green-800 !text-white": mode === "dark"
                                                                    })}
                                                                >
                                                                    Activate
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                ) : (

                                                    // Placeholder untuk cell kosong agar grid tetap rapi
                                                    <div className={classNames("h-full min-h-[140px] rounded-xl border border-dashed border-gray-200 bg-transparent", {
                                                        "border-gray-600": mode === "dark"
                                                    })}></div>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default MinimumDonationSetting;
