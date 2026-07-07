import { useInfiniteQuery, useMutation } from "@tanstack/react-query"

import type { MutateParamsType, MutationFunctionType, TPaginationResponseType } from "@ozanplanviu/planviu-core";

import { getFeedbacksForStaff, patchFeedbackMarkAsRead } from "../services/feedback";
import { QUERY_KEY } from "@/data/internal/query-keys";
import type { TFeedbacks } from "../types/feedback";
import type { ResponseWrapper } from "@/types/api";

export const useFeedbacksForStaffInfiniteQuery = (params?: Record<any, any>) => {
    return useInfiniteQuery<ResponseWrapper<TPaginationResponseType<TFeedbacks[]>>>({
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => !!lastPage?.data?.next ? allPages?.length + 1 : undefined,
        queryKey: [QUERY_KEY.FEEDBACKS_STAFF.INDEX, params],
        queryFn: ({ pageParam }) => {
            return getFeedbacksForStaff({
                page: pageParam,
                ...params
            })
        },
        placeholderData: data => data
    });
}

export const useFedbacksStaffMutation = ({ onError, onSuccess }: MutationFunctionType<unknown>) => {
    return useMutation({
        mutationFn: ({ id }: MutateParamsType) => {
            return patchFeedbackMarkAsRead(id || "")
        },
        onSuccess: onSuccess,
        onError: onError
    });
}
