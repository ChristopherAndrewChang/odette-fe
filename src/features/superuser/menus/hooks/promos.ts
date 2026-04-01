import { useQuery } from "@tanstack/react-query"

import { QUERY_KEY } from "@/data/internal/query-keys";
import { getAllPromos } from "../services/promo";
import type { ResponseWrapper } from "@/types/api";
import type { TMenus } from "../types/menus";

export const usePromosQuery = (params?: Record<any, any>) => {
    return useQuery<ResponseWrapper<TMenus[]>>({
        queryKey: [QUERY_KEY.MENUS.PROMOS, params],
        queryFn: () => {
            return getAllPromos(params);
        },
        retry: false,
        refetchOnWindowFocus: false,
        placeholderData: data => data
    });
}
