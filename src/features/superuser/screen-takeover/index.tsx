"use client";

import { PvTable } from "@ozanplanviu/planviu-core";

import AppLayout from "@/components/internal/AppLayout";
import { useScreenTakeoverQuery } from "./hooks/screen-takeover";

function ScreenTakeoverPage() {
    const { data, isFetching } = useScreenTakeoverQuery();

    return (
        <AppLayout title="Screen Takeover">
            <PvTable
                columns={[]}
                rowCount={0}
                rows={[]}
                containerProps={{
                    variant: "outlined"
                }}
            />
        </AppLayout>
    )
}

export default ScreenTakeoverPage;
