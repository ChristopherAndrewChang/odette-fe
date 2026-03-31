import type { MutateParamsType, MutationFunctionType } from "@ozanplanviu/planviu-core";
import { useMutation } from "@tanstack/react-query"

import { generateSingleTableQR } from "../services/qr";
import type { ResponseWrapper } from "@/types/api";

export const useGenerateTableQRMutation = ({ onError, onSuccess }: MutationFunctionType<ResponseWrapper<any>>) => {
    return useMutation({
        mutationFn: ({ type, id }: MutateParamsType & { type: "single" | "bulk" }) => {
            if (type === "bulk") return generateSingleTableQR(id || "");
            else return generateSingleTableQR(id || "");
        },
        onSuccess: onSuccess,
        onError: onError
    });
}
