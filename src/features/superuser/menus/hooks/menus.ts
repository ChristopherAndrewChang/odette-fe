import { useMutation, useQuery } from "@tanstack/react-query";

import type { MutateParamsType, MutationFunctionType, TPaginationResponseType } from "@ozanplanviu/planviu-core";

import { QUERY_KEY } from "@/data/internal/query-keys";
import { deleteMenuUpload, getAllMenus, patchMenuUpload, postMenuUpload } from "../services/menus";
import type { ResponseWrapper } from "@/types/api";
import type { TMenus } from "../types/menus";

export const useMenusQuery = (params?: Record<any, any>) => {
    return useQuery<ResponseWrapper<TPaginationResponseType<TMenus[]>>>({
        queryKey: [QUERY_KEY.MENUS.INDEX, params],
        queryFn: () => getAllMenus(params),
        retry: false,
        placeholderData: data => data,
        refetchOnWindowFocus: false
    });
}

export const useMenuMutation = ({ onError, onSuccess }: MutationFunctionType<unknown>) => {
    return useMutation({
        mutationFn: ({ data, method, id }: MutateParamsType) => {
            if (method === "POST") return postMenuUpload(data);
            else if (method === "PATCH") return patchMenuUpload(id || "", data);
            else return deleteMenuUpload(id || "");
        },
        onSuccess: onSuccess,
        onError: onError
    });
}
