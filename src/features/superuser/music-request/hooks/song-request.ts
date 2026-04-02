import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

import type { TPaginationResponseType } from "@ozanplanviu/planviu-core";

import { QUERY_KEY } from "@/data/internal/query-keys";
import type { ResponseWrapper } from "@/types/api";
import type { TMySongReq } from "@/features/user/song-request/types/song-request";
import { __getAllMusicRequest, getAllMusicRequest } from "../services/music-request";

export const useAllSongRequestsQuery = (params?: Record<any, any>) => {
    return useQuery<ResponseWrapper<TMySongReq[]>>({
        queryKey: [QUERY_KEY.SONG_REQUEST, params],
        queryFn: () => {
            return __getAllMusicRequest(params);
        },
        retry: false,
        refetchOnWindowFocus: false,
    });
}

export const useAllSongRequestsInfiniteQuery = (params?: Record<any, any>) => {
    return useInfiniteQuery<ResponseWrapper<TPaginationResponseType<TMySongReq[]>>>({
        getNextPageParam: (lastPage, allPages) => lastPage?.data?.next ? (allPages.length + 1) : undefined,
        initialPageParam: 1,
        queryKey: [QUERY_KEY.SONG_REQUEST, params],
        queryFn: ({ pageParam }) => {
            return getAllMusicRequest({
                ...params,
                page: pageParam
            });
        },
        retry: false,
        refetchOnWindowFocus: false,
    });
}
