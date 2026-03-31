import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query"

import type { MutateParamsType, MutationFunctionType, TPaginationResponseType } from "@ozanplanviu/planviu-core";

import { QUERY_KEY } from "@/data/internal/query-keys";
import { createTable, createTableBulk, getAllTables } from "../services/tables";
import type { ResponseWrapper } from "@/types/api";
import type { TTables } from "../types/tables";

export const useTablesQuery = (params?: Record<any, any>) => {
    return useQuery<ResponseWrapper<TPaginationResponseType<TTables[]>>>({
        queryKey: [QUERY_KEY.TABLES.INDEX, params],
        queryFn: () => getAllTables(params),
        retry: false,
        refetchOnWindowFocus: false,
        placeholderData: data => data
    });
}

export const useTablesInfiniteQuery = (params?: Record<any, any>) => {
    return useInfiniteQuery<ResponseWrapper<TPaginationResponseType<TTables[]>>>({
        getNextPageParam: (lastPage, allPages) => !!lastPage?.data?.next ? allPages.length + 1 : undefined,
        initialPageParam: 1,
        queryKey: [QUERY_KEY.TABLES.INDEX, params],
        queryFn: ({ pageParam }) => getAllTables({
            ...params,
            page: pageParam
        }),
        retry: false,
        refetchOnWindowFocus: false,
        placeholderData: data => data
    });
}

export const useTablesMutation = ({ onError, onSuccess }: MutationFunctionType<unknown>) => {
    return useMutation({
        mutationFn: ({ method, data, type }: MutateParamsType & { type: "single" | "bulk" }) => {
            if (method === "POST") {
                if (type === "bulk") return createTableBulk(data);
                else return createTable(data);
            } else {
                return createTable(data)
            }
        },
        onSuccess: onSuccess,
        onError: onError
    });
}
