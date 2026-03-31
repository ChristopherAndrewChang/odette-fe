import type { MutateParamsType, MutationFunctionType } from "@ozanplanviu/planviu-core";
import { useMutation } from "@tanstack/react-query"

import { generateBulkTableQR, generateSingleTableQR } from "../services/qr";
import type { ResponseWrapper } from "@/types/api";

export const useGenerateTableQRMutation = ({ onError, onSuccess }: MutationFunctionType<ResponseWrapper<any>>) => {
    return useMutation({
        mutationFn: ({ type, id, data }: MutateParamsType & { type: "single" | "bulk" }) => {
            if (type === "bulk") return generateBulkTableQR(data);
            else return generateSingleTableQR(id || "");
        },
        onSuccess: onSuccess,
        onError: onError
    });
}
