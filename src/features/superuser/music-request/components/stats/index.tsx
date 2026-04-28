"use client";

import { useQueryParams } from "@ozanplanviu/planviu-core";

import { AppConfig } from "@/configs/appConfig";
import { useSummarySongRequest } from "../../hooks/song-request";
import StatsCard from "@/features/superuser/shared/components/StatCard";
import { ADMIN_MUSIC_REQUEST_FETCHING_INTERVAL } from "../../data";

function MusicStats() {
    const { getParam } = useQueryParams();

    const { data, isFetching } = useSummarySongRequest({
        all: AppConfig.appMode === "development",
        date: getParam("date")
    }, ADMIN_MUSIC_REQUEST_FETCHING_INTERVAL);

    return (
        <div className="grid grid-cols-4 gap-4 mb-4">
            <StatsCard
                label="PENDING"
                value={data?.data?.pending?.toLocaleString() || ""}
                loading={isFetching}
            />

            <StatsCard
                label="DJ APPROVED"
                value={data?.data?.dj_approved?.toLocaleString() || ""}
                loading={isFetching}
            />

            <StatsCard
                label="WITH DJ"
                value={data?.data?.with_dj?.toLocaleString() || ""}
                loading={isFetching}
            />

            <StatsCard
                label="TOTAL DONATION"
                value={`Rp${data?.data?.total_donations?.toLocaleString() || "0"}`}
                loading={isFetching}
            />

            {/* <PendingReviewStatCard />
            <WithDJStatCard />
            <DJApprovedStatCard /> */}
        </div>
    )
}

export default MusicStats;
