'use client';

import { useQueryParams } from "./use-query-params";

export const useFilter = (keys: string[], keysAvoidedInCount?: string[]) => {
    const temp: Record<string, string | null> = {};
    const { getParam, hasParam } = useQueryParams();

    let filterAppliedCount = 0;

    keys.forEach((_key) => {
        if (hasParam(_key)) {
            temp[_key] = getParam(_key);

            if (!keysAvoidedInCount?.find(_avoided => _avoided === _key)) {
                filterAppliedCount += 1;
            }
        }
    });

    return {
        filterParams: temp,
        filterAppliedCount
    };
}
