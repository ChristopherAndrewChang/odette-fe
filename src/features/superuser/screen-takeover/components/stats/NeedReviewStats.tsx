"use client";

import StatsCard from "@/features/superuser/shared/components/StatCard";

function NeedReviewStats() {
    return (
        <StatsCard
            label="NEEDS REVIEW"
            value="10"
            loading={false}
        />
    )
}

export default NeedReviewStats
