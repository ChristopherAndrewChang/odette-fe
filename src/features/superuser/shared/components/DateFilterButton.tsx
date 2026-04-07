"use client";

import { Typography } from "@mui/material";
import { useQueryParams } from "@ozanplanviu/planviu-core";
import classNames from "classnames";

type TDateFilterButton = {
    onClick: () => void;
}

function DateFilterButton({ onClick }: TDateFilterButton) {
    const { getParam } = useQueryParams();

    return (
        <div
            onClick={onClick}
            className={classNames("p-2 border rounded-lg cursor-pointer flex gap-2 items-center hover:bg-blue-50", {
                "border-black": !!getParam("date")
            })}
        >
            <i className="tabler-calendar w-4"></i>
            <Typography className="text-black">Date Filter</Typography>
        </div>
    )
}

export default DateFilterButton
