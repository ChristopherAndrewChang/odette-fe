// import type { CustomParamsSerializer, ParamsSerializerOptions, ResponseType } from "axios";
// import axios from "axios"

// TODO: make it into planviu-core
import toast from "react-hot-toast";

import type { CustomParamsSerializer, ParamsSerializerOptions, ResponseType } from "axios";
import axios from "axios";

import cookieStore from "js-cookie";

import { AppConfig } from "@/configs/appConfig";
import { STORAGE_KEY } from "@/data/internal/storage";
import { APP_URL } from "@/data/internal/app-route";

export type T_PV_REQUEST_METHOD = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

export type TRequestService = {
    method: T_PV_REQUEST_METHOD;
    urlKey?: string;
    data?: Record<string, any>;
    queryParams?: Record<any, any>;
    noAuth?: boolean;
    headers?: Record<string, any>;
    responseType?: ResponseType;
    paramsSerializer?: ParamsSerializerOptions | CustomParamsSerializer | undefined;
}

export type TRequestConfig = {
    baseUrl: string;
    getToken?: () => string | null;
    onForceLogout?: () => void;
}

export const RequestConfig = ({
    baseUrl,
    onForceLogout,
    getToken
}: TRequestConfig) => {
    const instance = axios.create({
        baseURL: baseUrl,
        withCredentials: true,
    });

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error?.response?.status === 401) {
                onForceLogout ? onForceLogout() : (() => { })
            }

            return Promise.reject(error);
        }
    );

    const requestService = async<T>(params: TRequestService): Promise<T> => {
        const token = getToken ? getToken() : "";

        const DEFAULT_HEADER = ({
            "Content-Type": "application/json",
            ...(params.noAuth ? {} : { Authorization: `Bearer ${token}` })
        })

        return await instance.request({
            url: params.urlKey,
            data: params.data,
            method: params.method,
            params: params.queryParams,
            paramsSerializer: params.paramsSerializer,
            headers: ({
                ...DEFAULT_HEADER,
                ...params.headers
            }),
            responseType: params.responseType,
        });
    }

    return requestService;
};

export const api = RequestConfig({
    baseUrl: AppConfig.apiUrl || "",
    getToken: () => {
        return localStorage.getItem(STORAGE_KEY.TOKEN || "");
    },
    onForceLogout: () => {
        const isFromUser = location.pathname.startsWith("/user");

        if (location.pathname.startsWith("/login")) {
            return;
        }

        toast.error("Your session is expired, Please Login Again");
        localStorage.removeItem(STORAGE_KEY.TOKEN);
        cookieStore.remove(STORAGE_KEY.TOKEN);

        localStorage.removeItem(STORAGE_KEY.USER_SESSION);
        cookieStore.remove(STORAGE_KEY.USER_SESSION);

        localStorage.removeItem(STORAGE_KEY.USER_NAME);
        localStorage.removeItem(STORAGE_KEY.USER_TABLE);

        if (isFromUser) {
            location.replace(APP_URL.USER_SCAN.INDEX);
        } else {
            location.replace("/login");
        }
    }
});

// import { AppConfig } from "@/configs/appConfig"
// import type { TMethodRequest } from "@/types/api"
// import { onLogout } from "./auth";

// type TApi = {
//     data?: any;
//     urlKey: string;
//     method: TMethodRequest;
//     additionalHeaders?: Record<any, any>;
//     withAuthorization?: boolean;
//     responseType?: ResponseType;
//     queryParams?: Record<any, any>;
//     paramsSerializer?: ParamsSerializerOptions | CustomParamsSerializer | undefined;
//     usingLocalApi?: boolean;
// }

// const getToken = () => {
//     if (!!window) {
//         return localStorage.getItem("token");
//     }

//     return ""
// };

// export const api = async ({
//     data,
//     method,
//     urlKey,
//     additionalHeaders,
//     withAuthorization = true,
//     responseType = "json",
//     paramsSerializer,
//     queryParams,
//     usingLocalApi
// }: TApi) => {
//     const token = !!withAuthorization ? getToken() : "";

//     const headers = {
//         ...(withAuthorization && { Authorization: `Bearer ${token}` }),
//         "Content-Type": "application/json",
//         ...additionalHeaders
//     }

//     const axiosInstance = axios.create({
//         baseURL: !!usingLocalApi ? "" : AppConfig.apiUrl,
//         data: data,
//         method: method,
//         headers: headers,
//         withCredentials: true,
//         responseType: responseType,
//         paramsSerializer: paramsSerializer
//     });

//     axiosInstance.interceptors.response.use(
//         (response) => response,
//         (error) => {
//             if (error.response.status === 401) {

//                 // enable if you have remember token
//                 // if (localStorage.getItem(AuthConfig.rememberKey) === "1") {
//                 //     axios.post(`url`)
//                 //         .then(res => {
//                 //             const resData = res as AxiosResponse<{ access: string; refresh: string; }>;

//                 //             localStorage.setItem(AuthConfig.tokenKey, resData.data.access);
//                 //             localStorage.setItem(AuthConfig.refreshKey, resData.data.refresh);
//                 //         })
//                 //         .catch(() => {
//                 //             onLogout();
//                 //         })
//                 // }

//                 onLogout();
//             }

//             return Promise.reject(error);
//         }
//     );

//     const response = await axiosInstance.request({
//         url: urlKey,
//         method: method,
//         data: data,
//         params: queryParams
//     });

//     return response.data;
// }
