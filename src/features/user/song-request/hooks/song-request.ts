import { useMutation, useQuery } from "@tanstack/react-query"

import type { MutateParamsType, MutationFunctionType } from "@ozanplanviu/planviu-core";

import { QUERY_KEY } from "@/data/internal/query-keys";
import { getMySongRequest, submitRequest } from "../services/song-request";
import type { TMySongReq } from "../types/song-request";
import type { ResponseWrapper } from "@/types/api";

export const useMySongRequestQuery = (params?: Record<any, any>) => {
    return useQuery<ResponseWrapper<TMySongReq[]>>({
        queryKey: [QUERY_KEY.MY_SONG_REQUEST, params],
        queryFn: () => getMySongRequest(params),
        retry: false,
        refetchOnWindowFocus: false,
        placeholderData: data => data
    });
}

export const useSongRequestMutation = ({ onError, onSuccess }: MutationFunctionType<unknown>) => {
    return useMutation({
        mutationFn: ({ data }: MutateParamsType) => {
            return submitRequest(data);
        },
        onSuccess: onSuccess,
        onError: onError
    })
}
