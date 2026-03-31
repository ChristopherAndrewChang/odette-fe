import type { MutateParamsType, MutationFunctionType } from "@ozanplanviu/planviu-core/";
import { useMutation } from "@tanstack/react-query";

import { login } from "../services/login";
import type { TLoginResponse } from "../types/login";
import type { ResponseWrapper } from "@/types/api";

export const useLoginMutation = ({ onError, onSuccess }: MutationFunctionType<ResponseWrapper<TLoginResponse>>) => {
    return useMutation({
        mutationFn: ({ data }: MutateParamsType) => login(data),
        onSuccess: onSuccess,
        onError: onError
    });
}
