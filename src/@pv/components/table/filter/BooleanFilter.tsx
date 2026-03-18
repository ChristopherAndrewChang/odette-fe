"use client";

import { useEffect, useState } from "react";

import { Autocomplete, Typography } from "@mui/material";

import classNames from "classnames";

import { useQueryParams } from "@/@pv/hooks/use-query-params";
import BorderlessTextField from "./BorderlessInput";

type TBooleanFilter = {
    label: string;
    valueKey: string;
};

function BooleanFilter({ label, valueKey }: TBooleanFilter) {
    const { addParam, removeParam, hasParam, getParam } = useQueryParams();
    const paramValue = getParam(valueKey);

    const [value, setValue] = useState("All");

    useEffect(() => {
        if (value === "All") {
            removeParam(valueKey);
        } else if (value === "Yes") {
            addParam(valueKey, "true");
        } else {
            addParam(valueKey, "false");
        }
    }, [addParam, removeParam, value, valueKey]);

    useEffect(() => {
        if (hasParam(valueKey)) {
            if (getParam(valueKey) === "true") {
                setValue("Yes");
            } else {
                setValue("No");
            }
        } else {
            setValue("All");
        }
    }, [paramValue]);

    return (
        <div className={classNames("flex items-center gap-2 p-2 shadow-xs rounded-xl border", {
            "border-gray-200": value === "All",
            "border-gray-500": value !== "All"
        })}>
            <Typography className="text-black font-semibold">{label}</Typography>
            <div className="w-1 h-full border-r" />
            <Autocomplete
                options={["All", "Yes", "No"]}
                size="small"
                disableClearable
                value={value || "All"}
                onChange={(_, _value) => {
                    setValue(_value);
                }}
                renderInput={(params) => (
                    <BorderlessTextField {...params} />
                )}
                className="flex-1"
            />
        </div>
    )
}

export default BooleanFilter
