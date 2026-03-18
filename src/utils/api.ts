import type { CustomParamsSerializer, ParamsSerializerOptions, ResponseType } from "axios";
import axios from "axios"

import { AppConfig } from "@/configs/appConfig"
import type { TMethodRequest } from "@/types/api"
import { onLogout } from "./auth";

type TApi = {
    data: any;
    urlKey: string;
    method: TMethodRequest;
    additionalHeaders?: Record<any, any>;
    withAuthorization?: boolean;
    responseType?: ResponseType;
    queryParams?: Record<any, any>;
    paramsSerializer?: ParamsSerializerOptions | CustomParamsSerializer | undefined;
}

const getToken = () => {
    if (window) {
        return localStorage.getItem("token");
    }

    return ""
};

export const api = async ({
    data,
    method,
    urlKey,
    additionalHeaders,
    withAuthorization = true,
    responseType = "json",
    paramsSerializer,
    queryParams
}: TApi) => {
    const token = getToken();

    const headers = {
        ...(withAuthorization && { Authorization: `Bearer ${token}` }),
        "Content-Type": "application/json",
        ...additionalHeaders
    }

    const axiosInstance = axios.create({
        baseURL: AppConfig.apiUrl,
        data: data,
        method: method,
        headers: headers,
        withCredentials: true,
        responseType: responseType,
        paramsSerializer: paramsSerializer
    });

    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response.status === 401) {

                // enable if you have remember token
                // if (localStorage.getItem(AuthConfig.rememberKey) === "1") {
                //     axios.post(`url`)
                //         .then(res => {
                //             const resData = res as AxiosResponse<{ access: string; refresh: string; }>;

                //             localStorage.setItem(AuthConfig.tokenKey, resData.data.access);
                //             localStorage.setItem(AuthConfig.refreshKey, resData.data.refresh);
                //         })
                //         .catch(() => {
                //             onLogout();
                //         })
                // }

                onLogout();
            }

            return Promise.reject(error);
        }
    );

    const response = await axiosInstance.request({
        url: urlKey,
        method: method,
        data: data,
        params: queryParams
    });

    return response.data;
}
