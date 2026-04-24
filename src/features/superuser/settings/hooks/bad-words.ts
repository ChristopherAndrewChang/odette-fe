import type { MutateParamsType, MutationFunctionType } from "@ozanplanviu/planviu-core";
import { useMutation } from "@tanstack/react-query"

import { postAddBadWords } from "../services/bad-words";

export const useBadWordsSettingsMutation = ({ onError, onSuccess }: MutationFunctionType<unknown>) => {
    return useMutation({
        mutationFn: ({ data }: MutateParamsType) => {
            return postAddBadWords(data || {});
        },
        onSuccess: onSuccess,
        onError: onError
    });
}
