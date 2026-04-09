import { useMutation, useQuery } from "@tanstack/react-query"

import type { MutateParamsType, MutationFunctionType, TPaginationResponseType } from "@ozanplanviu/planviu-core";

import { QUERY_KEY } from "@/data/internal/query-keys";
import { getAllUsers, getMe, patchUsers, postAddUser } from "../services/users";
import type { ResponseWrapper } from "@/types/api";


import type { TUsers } from "../types/users";
import type { TMe } from "../types/me";

export const useMeQuery = (disabled?: boolean) => {
    return useQuery<ResponseWrapper<TMe>>({
        queryKey: [QUERY_KEY.ME.INDEX],
        queryFn: () => getMe(),
        retry: false,
        refetchOnWindowFocus: false,
        enabled: !disabled
    });
}

export const useUsersQuery = (params?: Record<any, any>) => {
    return useQuery<ResponseWrapper<TPaginationResponseType<TUsers[]>>>({
        queryKey: [QUERY_KEY.USERS.INDEX, params],
        queryFn: () => getAllUsers(params),
        retry: false,
        refetchOnWindowFocus: false,
        placeholderData: data => data
    });
}

export const useUsersMutation = ({ onError, onSuccess }: MutationFunctionType<unknown>) => {
    return useMutation({
        mutationFn: ({ method, data, id }: MutateParamsType) => {
            if (method === "PATCH") return patchUsers(id || "", data);
            else if (method === "POST") return postAddUser(data);
            else return patchUsers(id || "", data);
        },
        onSuccess: onSuccess,
        onError: onError
    });
}
