"use client";

import { useScreenTakeoverQuery } from "@/features/superuser/screen-takeover/hooks/screen-takeover";
import StatCard from "./StatCard";

function ScreenPaid() {
    const { data, isFetching } = useScreenTakeoverQuery({
        status: "paid"
    });

    return (
        <StatCard
            title={"Screen Paid"}
            value={data?.data?.count?.toString() || ""}
            loading={isFetching}
        />
    )
}

export default ScreenPaid
