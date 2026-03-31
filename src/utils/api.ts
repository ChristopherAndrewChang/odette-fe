// import type { CustomParamsSerializer, ParamsSerializerOptions, ResponseType } from "axios";
// import axios from "axios"

import { RequestConfig } from "@ozanplanviu/planviu-core";

import toast from "react-hot-toast";

import { AppConfig } from "@/configs/appConfig";
import { STORAGE_KEY } from "@/data/internal/storage";

export const api = RequestConfig({
    baseUrl: AppConfig.apiUrl || "",
    getToken: () => {
        return localStorage.getItem(STORAGE_KEY.TOKEN || "");
    },
    onForceLogout: () => {
        if (location.pathname.startsWith("/login")) {
            return;
        }

        toast.error("Your session is expired, Please Login Again");
        localStorage.removeItem(STORAGE_KEY.TOKEN);
        cookieStore.delete(STORAGE_KEY.TOKEN);

        location.replace("/login");
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
