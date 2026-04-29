"use client";

import { Typography } from "@mui/material";

function NoDataCard() {
    return (
        <div className="p-6 bg-gray-50 rounded-lg border flex items-center justify-center min-w-72 lg:min-w-96">
            <Typography>No data</Typography>
        </div>
    )
}

export default NoDataCard
