"use client";

import { useRouter, useSearchParams } from "next/navigation";

export const useQueryParams = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const addParam = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set(key, value);
        router.push(`?${params.toString()}`);
    };

    const addParams = (paramsObj: Record<string, string>) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(paramsObj).forEach(([key, value]) => {
            params.set(key, value);
        });
        router.push(`?${params.toString()}`);
    };

    const removeParam = (key: string) => {
        const params = new URLSearchParams(searchParams.toString());

        params.delete(key);
        router.push(`?${params.toString()}`);
    };

    const removeParams = (keys: string[]) => {
        const params = new URLSearchParams(searchParams.toString());

        keys.forEach((key) => {
            params.delete(key);
        });
        router.push(`?${params.toString()}`);
    };

    const updateParams = ({
        remove = [],
        add = {}
    }: {
        remove?: string[];
        add?: Record<string, string>;
    }) => {
        const params = new URLSearchParams(searchParams.toString());

        remove.forEach((key) => {
            params.delete(key);
        });

        Object.entries(add).forEach(([key, value]) => {
            params.set(key, value);
        });

        router.push(`?${params.toString()}`);
    };


    const hasParam = (key: string) => {
        return searchParams.has(key);
    };

    const getParam = (key: string) => {
        return searchParams.get(key);
    };

    return { addParam, removeParam, hasParam, getParam, addParams, removeParams, updateParams };
};
