// TODO: please cari tau, kalo ini tidak ada disini, itu tidak jalan dengan baik ColumnStatus yang dari planviu-core

"use client"

import { Typography } from "@mui/material";
import classNames from "classnames";

type TColumnStatus = {
    status: boolean | string;
    color?: "success" | "error" | "info" | "primary" | "secondary"
    icon?: string;
};

export function ColumnStatus({ status, color, icon }: TColumnStatus) {
    if (typeof status === "string") {
        return (
            <div className="h-full flex items-center">
                <div className={classNames("flex items-center gap-1 px-6 rounded-md border", {
                    "bg-green-50 border-success": color === "success",
                    "bg-red-50 border-error": color === "error" || color === "primary",
                    "bg-blue-50 border-info": color === "info",
                    "bg-gray-50 border-secondary": color === "secondary"
                })}>
                    {icon && (
                        <i className={classNames(icon, "text-sm", {
                            "text-success": color === "success",
                            "text-error": color === "error",
                            "text-primary": color === "primary",
                            "text-info": color === "info",
                            "text-secondary": color === "secondary"
                        })}></i>
                    )}
                    <Typography className={classNames("uppercase text-sm font-semibold", {
                        "text-success": color === "success",
                        "text-error": color === "error",
                        "text-primary": color === "primary",
                        "text-info": color === "info",
                        "text-secondary": color === "secondary"
                    })}>{status}</Typography>
                </div>
            </div>
        )
    }

    if (status) {
        return (
            <div className="h-full flex items-center">
                <div className="bg-green-50 flex items-center gap-1 px-6 rounded-md border border-success">
                    <i className="tabler-circle-check text-sm text-success"></i>
                    <Typography className="text-success text-sm font-semibold">Yes</Typography>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full flex items-center">
            <div className="bg-red-50 flex items-center gap-1 px-6 rounded-md border border-error">
                <i className="tabler-circle-x text-sm text-error"></i>
                <Typography className="text-error text-sm font-semibold">No</Typography>
            </div>
        </div>
    )
}
