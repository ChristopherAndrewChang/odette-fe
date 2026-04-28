import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query"

import type { MutateParamsType, MutationFunctionType, TPaginationResponseType } from "@ozanplanviu/planviu-core";

import { QUERY_KEY } from "@/data/internal/query-keys";
import { getAllScreenTakeover, patchApprovalScreenTakeover, patchMarkAsPlayedScreenTakeover } from "../services/screen-takeover";
import type { ResponseWrapper } from "@/types/api";
import type { TScreenTakeover } from "../types/screen-takeover";

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

export const useScreenTakeoverInfiniteQuery = (params?: Record<any, any>, interval?: number) => {
    return useInfiniteQuery<ResponseWrapper<TPaginationResponseType<TScreenTakeover[]>>>({
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => lastPage?.data?.next ? allPages.length + 1 : undefined,
        queryKey: [QUERY_KEY.SCREEN_TAKEOVER.INDEX, params],
        queryFn: ({ pageParam }) => getAllScreenTakeover({
            ...params,
            page: pageParam
        }),
        retry: false,
        refetchOnWindowFocus: false,
        placeholderData: data => data,
        refetchInterval: interval
    });
}

export const useScreenTakeoverApprovalMutation = ({ onSuccess, onError }: MutationFunctionType<unknown>) => {
    return useMutation({
        mutationFn: ({ id, type }: MutateParamsType & { type: "pending_payment" | "rejected" }) => {
            return patchApprovalScreenTakeover(id || "", {
                status: type
            })
        },
        onSuccess: onSuccess,
        onError: onError
    });
}

export const useScreenTakeoverMarkPlayedMutation = ({ onError, onSuccess }: MutationFunctionType<unknown>) => {
    return useMutation({
        mutationFn: ({ id }: MutateParamsType) => {
            return patchMarkAsPlayedScreenTakeover(id || "");
        },
        onSuccess: onSuccess,
        onError: onError
    });
}
