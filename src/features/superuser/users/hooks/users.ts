import { QUERY_KEY } from "@/data/internal/query-keys";
import { useMutation, useQuery } from "@tanstack/react-query"
import { getAllUsers, patchUsers, postAddUser } from "../services/users";
import { ResponseWrapper } from "@/types/api";
import { MutateParamsType, MutationFunctionType, TPaginationResponseType } from "@ozanplanviu/planviu-core";
import { TUsers } from "../types/users";

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
