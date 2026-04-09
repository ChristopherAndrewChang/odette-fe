import { useMutation, useQuery } from "@tanstack/react-query"

import type { MutateParamsType, MutationFunctionType, TPaginationResponseType } from "@ozanplanviu/planviu-core";

import { QUERY_KEY } from "@/data/internal/query-keys";
import { getAllScreenTakeover, patchApprovalScreenTakeover } from "../services/screen-takeover";
import type { ResponseWrapper } from "@/types/api";

export const useScreenTakeoverQuery = (params?: Record<any, any>, interval?: number) => {
    return useQuery<ResponseWrapper<TPaginationResponseType<any[]>>>({
        queryKey: [QUERY_KEY.SCREEN_TAKEOVER.INDEX, params],
        queryFn: () => getAllScreenTakeover(params),
        retry: false,
        refetchOnWindowFocus: false,
        placeholderData: data => data,
        refetchInterval: interval
    });
}

export const useScreenTakeoverApprovalMutation = ({ onSuccess, onError }: MutationFunctionType<unknown>) => {
    return useMutation({
        mutationFn: ({ id, type }: MutateParamsType & { type: "approved" | "rejected" }) => {
            return patchApprovalScreenTakeover(id || "", {
                status: type
            })
        },
        onSuccess: onSuccess,
        onError: onError
    });
}
