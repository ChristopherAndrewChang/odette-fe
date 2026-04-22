"use client";

import ApprovedStats from "./ApprovedStats";
import NeedReviewStats from "./NeedReviewStats";

function StatsCards() {
    return (
        <div className="grid grid-cols-2 gap-4">
            <NeedReviewStats />
            <ApprovedStats />
        </div>
    )
}

export default StatsCards;
