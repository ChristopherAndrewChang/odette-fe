"use client";

import { CircularProgress } from "@mui/material";

type TStatCard = {
    title: string;
    value: string;
    loading?: boolean;
}

function StatCard({ title, value, loading }: TStatCard) {
    return (
        <div className="p-6 rounded-lg border-2 border-gray-700">
            <p className="text-gray-400">{title}</p>

            {loading ? (
                <CircularProgress size={18} className="text-white mt-2" />
            ) : (
                <p className="text-4xl font-semibold text-white">{value}</p>
            )}
        </div>
    )
}

export default StatCard
