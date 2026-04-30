import type { MutateParamsType, MutationFunctionType } from "@ozanplanviu/planviu-core";
import { useMutation } from "@tanstack/react-query";

import { patchBilledScreen } from "../services/screen";

export const useScreenMutation = ({ onError, onSuccess }: MutationFunctionType<unknown>) => {
    return useMutation({
        mutationFn: ({ id }: MutateParamsType) => {
            return patchBilledScreen(id || "");
        },
        onError: onError,
        onSuccess: onSuccess
    });
}
