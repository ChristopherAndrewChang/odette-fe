"use client";

import type { ReactNode } from "react";

import { CircularProgress } from "@mui/material";

import { useScreenTakeoverInfiniteQuery } from "../../hooks/screen-takeover";
import type { TScreenTakeover } from "../../types/screen-takeover";

type TKanbanScreenTakeoverContainer = {
    type: "running_text" | "vtron_text" | "vtron_photo" | "vtron_video";
    CardComponent: (data: TScreenTakeover) => ReactNode;
    data?: TScreenTakeover[];
}

function KanbanScreenTakeoverContainer({ type, CardComponent, data: externalData }: TKanbanScreenTakeoverContainer) {
    const { data, isFetching, isFetchingNextPage } = useScreenTakeoverInfiniteQuery({
        request_type: type,
    });

    const datas = data?.pages?.flatMap(_data => _data?.data?.results);

    return (
        <>
            {(isFetching && !isFetchingNextPage) ? (
                <div className="flex justify-center">
                    <CircularProgress size={18} />
                </div>
            ) : null}
            {!!externalData ? externalData?.map(_data => CardComponent(_data)) : datas?.map(_data => CardComponent(_data))}
        </>
    )
}

export default KanbanScreenTakeoverContainer;
