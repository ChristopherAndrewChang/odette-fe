import { useMutation, useQuery } from "@tanstack/react-query"

import type { MutateParamsType, MutationFunctionType } from "@ozanplanviu/planviu-core";

import { QUERY_KEY } from "@/data/internal/query-keys";
import { getSettings, patchSetting } from "../services/settings";
import type { TSettings } from "../types/settings";
import type { ResponseWrapper } from "@/types/api";

export const useGetSettings = () => {
    return useQuery<ResponseWrapper<TSettings>>({
        queryKey: [QUERY_KEY.SETTINGS.INDEX],
        queryFn: () => getSettings(),
        retry: false
    });
}

export const useSettingsMutation = ({ onError, onSuccess }: MutationFunctionType<unknown>) => {
    return useMutation({
        mutationFn: ({ data }: MutateParamsType) => {
            return patchSetting(data)
        },
        onSuccess: onSuccess,
        onError: onError
    });
}
