"use client";

import dayjs from "dayjs";

import { useQueryParams } from "@ozanplanviu/planviu-core";

import { ADMIN_MUSIC_REQUEST_FETCHING_INTERVAL } from "../../data";
import { useAllSongRequestsQuery } from "../../hooks/song-request";
import StatsCard from "../../../shared/components/StatCard";

function DJApprovedStatCard() {
    const { getParam } = useQueryParams();

    const { data, isLoading } = useAllSongRequestsQuery({
        status: "dj_approved",
        date: getParam("date") || dayjs(new Date()).format("YYYY-MM-DD")
    }, ADMIN_MUSIC_REQUEST_FETCHING_INTERVAL);

    return (
        <StatsCard
            label="DJ APPROVED"
            value={data?.data?.count?.toLocaleString() || ""}
            loading={isLoading}
        />
    )
}

export default DJApprovedStatCard;
