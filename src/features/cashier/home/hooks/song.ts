import type { MutateParamsType, MutationFunctionType } from "@ozanplanviu/planviu-core";
import { useMutation } from "@tanstack/react-query";

import { patchMarkBilled } from "../services/song";

export const useMarkBilledSongMutation = ({ onError, onSuccess }: MutationFunctionType<unknown>) => {
    return useMutation({
        mutationFn: ({ id }: MutateParamsType) => {
            return patchMarkBilled(id || "");
        },
        onSuccess: onSuccess,
        onError: onError
    });
}
