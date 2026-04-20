"use client";

import DJApprovedStatCard from "./DJApprovedStatCard";
import PendingReviewStatCard from "./PendingReviewStatCard";
import WithDJStatCard from "./WithDJStatCard";

function MusicStats() {
    return (
        <div className="grid grid-cols-3 gap-4 mb-4">
            <PendingReviewStatCard />
            <WithDJStatCard />
            <DJApprovedStatCard />
        </div>
    )
}

export default MusicStats;
