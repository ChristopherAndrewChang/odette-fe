"use client";

import { CircularProgress, Typography } from "@mui/material";

type TStatContainer = {
    label: string;
    value: string;
    loading?: boolean;
}

function StatsCard({ label, value, loading }: TStatContainer) {
    return (
        <div className="bg-gray-50 border border-gray-400 p-6 rounded-lg">
            <Typography>{label}</Typography>

            {loading ? (
                <CircularProgress size={18} />
            ) : (
                <Typography>{value || 0}</Typography>
            )}
        </div>
    )
}

export default StatsCard;
