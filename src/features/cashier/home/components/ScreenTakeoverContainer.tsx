"use client";

import type { ReactNode } from "react";

import type { TScreenTakeover } from "@/features/superuser/screen-takeover/types/screen-takeover";
import { useScreenTakeoverInfiniteQuery } from "@/features/superuser/screen-takeover/hooks/screen-takeover";
import { useInfiniteScroll } from "@/@pv/hooks/use-infinite-scroll";

type TScreenTakeoverContainer = {
    content_type: "running_text" | "vtron_text" | "vtron_photo" | "vtron_video";
    CardComponent: (data: TScreenTakeover) => ReactNode;
}

function ScreenTakeoverContainer({ CardComponent, content_type }: TScreenTakeoverContainer) {
    const { data, isFetching, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage } = useScreenTakeoverInfiniteQuery({
        request_type: content_type,
        status: "paid",

        // all: true
    });

    const { lastElementRef, nextPageFetchingIndicator } = useInfiniteScroll({
        onNextPage: fetchNextPage,
        props: {
            hasNextPage: hasNextPage,
            isFetching: isFetching,
            isFetchingNextPage: isFetchingNextPage,
            isLoading: isLoading
        }
    });

    const screenTakeover = data?.pages?.flatMap(page => page?.data?.results) || [];

    return (
        <>
            <div className="mb-4 flex items-center gap-2">
                <p className="text-white text-xl">
                    {content_type
                        ?.replace(/_/g, " ")
                        .replace(/\w\S*/g, (txt) => txt[0].toUpperCase() + txt.slice(1).toLowerCase())
                    }
                </p>
                <div className="px-2 py-1 bg-gray-800 rounded-lg border border-gray-700">
                    <p className="text-white text-sm">{data?.pages?.[0]?.data?.count}</p>
                </div>
            </div>

            <div className="flex flex-col gap-2 max-h-[750px] overflow-y-scroll scrollbar-hide">
                {screenTakeover?.map((_screen, i) => (
                    <div key={`${content_type}-${i}`}>
                        {CardComponent(_screen)}
                        {hasNextPage && ((i + 1) === screenTakeover?.length) ? (
                            <div ref={lastElementRef}>
                                {nextPageFetchingIndicator}
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>
        </>
    )
}

export default ScreenTakeoverContainer
