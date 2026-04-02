import type { MutateParamsType, MutationFunctionType } from "@ozanplanviu/planviu-core";
import { useMutation } from "@tanstack/react-query";

import { userScan } from "../services/scan";
import type { TScanResponse } from "../types/scan";
import type { ResponseWrapper } from "@/types/api";

export const useUserScanMutation = ({ onError, onSuccess }: MutationFunctionType<ResponseWrapper<TScanResponse>>) => {
    return useMutation({
        mutationFn: ({ data }: MutateParamsType) => {
            return userScan(data)
        },
        onSuccess: onSuccess,
        onError: onError
    });
}
