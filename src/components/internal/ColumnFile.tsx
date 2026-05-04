"use client";

import { Typography } from "@mui/material";
import classNames from "classnames";

type TColumnFile = {
    value: string;
    darkMode?: boolean;
}

// TODO: add to planviu-core
function ColumnFile({ value, darkMode }: TColumnFile) {
    const getTitle = () => {
        const valArray = value.split("/");

        return valArray[valArray.length - 1];
    }

    if (!value) {
        return <></>
    }

    return (
        <div className="w-fit flex items-center h-full" onClick={(e) => { e.stopPropagation() }}>
            <a href={value} target="_blank" className={classNames("px-4 py-2 flex items-center justify-center bg-blue-50 border border-blue-100 gap-2 rounded-lg cursor-pointer transition-all hover:bg-blue-200", {
                "!bg-gray-800 !border-gray-700 hover:!bg-gray-900 !text-white": darkMode
            })}>
                <i className="tabler-file text-base"></i>
                <Typography className="text-sm font-medium">{getTitle()}</Typography>
            </a>
        </div>
    )
}

export default ColumnFile
