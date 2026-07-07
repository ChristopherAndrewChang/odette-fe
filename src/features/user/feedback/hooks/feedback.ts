import type { MutateParamsType, MutationFunctionType } from "@ozanplanviu/planviu-core";
import { useMutation } from "@tanstack/react-query"

import { postFeedback } from "../services/feedback";

export const useFeedbackUserMutation = ({ onError, onSuccess }: MutationFunctionType<unknown>) => {
    return useMutation({
        mutationFn: ({ data }: MutateParamsType) => {
            return postFeedback(data);
        },
        onSuccess: onSuccess,
        onError: onError
    });
}
