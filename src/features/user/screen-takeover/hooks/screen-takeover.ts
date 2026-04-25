import { useMutation, useQuery } from "@tanstack/react-query"

import type { MutateParamsType, MutationFunctionType, TPaginationResponseType } from "@ozanplanviu/planviu-core";

import { QUERY_KEY } from "@/data/internal/query-keys";
import { getMyScreenTakeover, postReqScreenTakeOverMedia, postReqScreenTakeOverText } from "../services/screen-takeover";
import type { ResponseWrapper } from "@/types/api";
import type { TScreenTakeOver, TScreenTakeOverResponseMutation } from "../types/screen-takeover";

export const useMyScreenTakeoverQuery = (params?: Record<any, any>) => {
    return useQuery<ResponseWrapper<TPaginationResponseType<TScreenTakeOver[]>>>({
        queryKey: [QUERY_KEY.SCREEN_TAKEOVER.INDEX, params],
        queryFn: () => {
            return getMyScreenTakeover(params)
        },
        retry: false,
        refetchOnWindowFocus: false,
        placeholderData: data => data
    });
}

export const useMyScreenTakeoverHomeQuery = (params?: Record<any, any>) => {
    return useQuery<ResponseWrapper<TPaginationResponseType<TScreenTakeOver[]>>>({
        queryKey: [QUERY_KEY.SCREEN_TAKEOVER.INDEX, params],
        queryFn: () => {
            return getMyScreenTakeover(params)
        },
        retry: false,
        refetchOnWindowFocus: true,
        placeholderData: data => data,
        refetchInterval: () => {
            // const hasPending = query.state?.data?.data?.results?.some(result => (result?.status === "pending_review") || (result?.status === "pending_review"));

            if (false) return;

            return 15000 + Math.random() * 10000;
        }
    });
}

export const useReqScreenTakeoverMutation = ({ onError, onSuccess }: MutationFunctionType<ResponseWrapper<TScreenTakeOverResponseMutation>>) => {
    return useMutation({
        mutationFn: ({ data, type }: MutateParamsType & { type: "text" | "photo" | "video" }) => {
            if (type === "text") {
                return postReqScreenTakeOverText(data);
            } else {
                return postReqScreenTakeOverMedia(data);
            }
        },
        onSuccess: onSuccess,
        onError: onError
    });
}
