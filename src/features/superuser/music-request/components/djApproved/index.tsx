"use client";

import { useState } from "react";

import dayjs from "dayjs";

import { useQueryParams } from "@ozanplanviu/planviu-core";

import { useColorScheme } from "@mui/material";

import { useAllSongRequestsInfiniteQuery } from "../../hooks/song-request";
import KanbanCard from "../KanbanCard";
import { useDebounce } from "@/@pv/hooks/use-debounce";
import { useInfiniteScroll } from "@/@pv/hooks/use-infinite-scroll";
import { ADMIN_MUSIC_REQUEST_FETCHING_INTERVAL, STATUS_COLOR_DATA } from "../../data";
import { AppConfig } from "@/configs/appConfig";
import NoDataCard from "../NoDataCard";
import KanbanSection from "../KanbanSection";

type TDjApproved = {
    compact?: boolean;
}

function DjApproved({ compact }: TDjApproved) {
    const { mode } = useColorScheme();

    const [search, setSearch] = useState("");
    const searchDebounced = useDebounce(search, 500);
    const { getParam } = useQueryParams();

    const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage, isFetching } = useAllSongRequestsInfiniteQuery({
        ...(AppConfig.appMode === "development" ? { all: true } : {}),
        status: "dj_approved",
        search: searchDebounced,
        date: getParam("date") || dayjs(new Date()).format("YYYY-MM-DD")
    }, ADMIN_MUSIC_REQUEST_FETCHING_INTERVAL);

    const { lastElementRef, nextPageFetchingIndicator } = useInfiniteScroll({
        onNextPage: fetchNextPage,
        props: {
            hasNextPage: hasNextPage,
            isFetchingNextPage: isFetchingNextPage,
            isLoading: isLoading
        }
    });

    const djApproveds = data?.pages?.flatMap(_data => _data?.data?.results) || [];

    return (
        <KanbanSection
            count={data?.pages?.[0].data?.count || 0}
            title="DJ APPROVED"
            loading={isFetching && !isFetchingNextPage}
            search={search}
            onSearch={(value) => setSearch(value)}
        >
            {(djApproveds.length > 0) ? djApproveds?.map((djApproved, i) => (
                <>
                    <KanbanCard
                        key={djApproved?.id}
                        compact={compact}
                        artist={djApproved?.artist || ""}
                        created={dayjs(djApproved?.created_at).format("DD/MM/YYYY HH:mm A")}
                        price={Number(djApproved?.donation_amount)?.toLocaleString()}
                        table={djApproved?.table_number?.toString()}
                        title={djApproved?.song_title}
                        renderComponent={(
                            <div className="mt-4 border w-fit px-2 py-1 text-xs rounded-lg" style={STATUS_COLOR_DATA({ darkMode: mode === "dark" })[djApproved.status]}>
                                {djApproved?.status_display}
                            </div>
                        )}
                    />

                    {((djApproveds?.length === (i + 1)) && hasNextPage) ? (
                        <div ref={lastElementRef} className="flex justify-center min-h-[40px] p-4">
                            {nextPageFetchingIndicator}
                        </div>
                    ) : null}
                </>
            )) : (
                <NoDataCard />
            )}
        </KanbanSection>
    )
}

export default DjApproved;
