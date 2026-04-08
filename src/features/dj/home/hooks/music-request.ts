import { useMutation } from "@tanstack/react-query"

import type { MutateParamsType, MutationFunctionType } from "@ozanplanviu/planviu-core";

import { patchApprovalDjMusicRequest } from "../services/music-request";

export const useMusicRequestDJApproval = ({ onError, onSuccess }: MutationFunctionType<unknown>) => {
    return useMutation({
        mutationFn: ({ id, type }: MutateParamsType & { type: "dj_approved" | "dj_rejected" }) => {
            return patchApprovalDjMusicRequest(id || "", {
                status: type
            })
        },
        onSuccess: onSuccess,
        onError: onError
    });
}
