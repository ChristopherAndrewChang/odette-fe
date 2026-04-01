"use client";

import { Typography } from "@mui/material";

type TColumnFile = {
    value: string;
}

// TODO: add to planviu-core
function ColumnFile({ value }: TColumnFile) {
    const getTitle = () => {
        const valArray = value.split("/");

        return valArray[valArray.length - 1];
    }

    return (
        <div className="w-fit flex items-center h-full">
            <a href={value} target="_blank" className="px-4 py-2 flex items-center justify-center bg-blue-50 border border-blue-100 gap-2 rounded-lg cursor-pointer transition-all hover:bg-blue-200">
                <i className="tabler-file text-base"></i>
                <Typography className="text-sm font-medium">{getTitle()}</Typography>
            </a>
        </div>
    )
}

export default ColumnFile
