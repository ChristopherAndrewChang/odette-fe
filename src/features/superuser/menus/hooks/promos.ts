import { useQuery } from "@tanstack/react-query"

import type { TPaginationResponseType } from "@ozanplanviu/planviu-core";

import { QUERY_KEY } from "@/data/internal/query-keys";
import { getAllPromos } from "../services/promo";
import type { ResponseWrapper } from "@/types/api";
import type { TMenus } from "../types/menus";

export const usePromosQuery = (params?: Record<any, any>, noAuth?: boolean) => {
    return useQuery<ResponseWrapper<TPaginationResponseType<TMenus[]>>>({
        queryKey: [QUERY_KEY.MENUS.PROMOS, params],
        queryFn: () => {
            return getAllPromos(params, noAuth);
        },
        retry: false,
        refetchOnWindowFocus: false,
        placeholderData: data => data
    });
}
