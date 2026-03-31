import type { MutateParamsType, MutationFunctionType } from "@ozanplanviu/planviu-core";
import { useMutation } from "@tanstack/react-query";

import { closeNight, openNight } from "../services/night";

export const useOpenNightMutation = ({ onError, onSuccess }: MutationFunctionType<unknown>) => {
    return useMutation({
        mutationFn: ({ data }: MutateParamsType) => {
            return openNight(data);
        },
        onSuccess: onSuccess,
        onError: onError
    });
};

export const useCloseNightMutation = ({ onError, onSuccess }: MutationFunctionType<unknown>) => {
    return useMutation({
        mutationFn: ({ data }: MutateParamsType) => {
            return closeNight(data);
        },
        onSuccess: onSuccess,
        onError: onError
    });
};
