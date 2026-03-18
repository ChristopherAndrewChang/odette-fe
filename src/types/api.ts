import type { AxiosError } from "axios";

export type TMethodRequest = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type TPaginationResponseType<T> = {
    "count": number,
    "next": number | null,
    "current": number,
    "previous": number | null,
    "limit": number,
    "results": T
}

export type ErrorType = AxiosError<any & {
    detail: string;
}>;
