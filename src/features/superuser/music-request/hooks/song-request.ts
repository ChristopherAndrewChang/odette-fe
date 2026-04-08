import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query"

import type { MutateParamsType, MutationFunctionType, TPaginationResponseType } from "@ozanplanviu/planviu-core";

import { QUERY_KEY } from "@/data/internal/query-keys";
import type { ResponseWrapper } from "@/types/api";
import type { TMySongReq } from "@/features/user/song-request/types/song-request";
import { getAllMusicRequest, reviewRequest } from "../services/music-request";

export const useAllSongRequestsQuery = (params?: Record<any, any>) => {
    return useQuery<ResponseWrapper<TPaginationResponseType<TMySongReq[]>>>({
        queryKey: [QUERY_KEY.SONG_REQUEST.INDEX, params],
        queryFn: () => {
            return getAllMusicRequest(params);
        },
        retry: false,
        refetchOnWindowFocus: false,
    });
}

export const useAllSongRequestsInfiniteQuery = (params?: Record<any, any>, refetchInterval?: number) => {
    return useInfiniteQuery<ResponseWrapper<TPaginationResponseType<TMySongReq[]>>>({
        getNextPageParam: (lastPage, allPages) => lastPage?.data?.next ? (allPages.length + 1) : undefined,
        initialPageParam: 1,
        queryKey: [QUERY_KEY.SONG_REQUEST.INDEX, params],
        queryFn: ({ pageParam }) => {
            return getAllMusicRequest({
                ...params,
                page: pageParam
            });
        },
        retry: false,
        refetchOnWindowFocus: false,
        refetchInterval: refetchInterval
    });
}

export const useApprovalSongRequestMutation = ({ onError, onSuccess }: MutationFunctionType<unknown>) => {
    return useMutation({
        mutationFn: ({ id, data }: MutateParamsType) => {
            return reviewRequest(id || "", data);
        },
        onSuccess: onSuccess,
        onError: onError
    });
}
