import { useQuery } from "@tanstack/react-query"

import type { TPaginationResponseType } from "@ozanplanviu/planviu-core";

import { QUERY_KEY } from "@/data/internal/query-keys";
import { getAllScreenTakeover } from "../services/screen-takeover";
import type { ResponseWrapper } from "@/types/api";

export const useScreenTakeoverQuery = (params?: Record<any, any>) => {
    return useQuery<ResponseWrapper<TPaginationResponseType<any[]>>>({
        queryKey: [QUERY_KEY.SCREEN_TAKEOVER.INDEX, params],
        queryFn: () => getAllScreenTakeover(params),
        retry: false,
        refetchOnWindowFocus: false,
        placeholderData: data => data
    });
}
