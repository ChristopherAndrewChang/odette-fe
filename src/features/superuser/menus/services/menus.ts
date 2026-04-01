import { API_URL } from "@/data/internal/api-route";
import type { ResponseWrapper } from "@/types/api";
import { api } from "@/utils/api"
import type { TMenus } from "../types/menus";

export const getAllMenus = (params?: Record<any, any>): Promise<ResponseWrapper<TMenus[]>> => {
    return api({
        method: "GET",
        urlKey: API_URL.MENU.INDEX.replace(":type", "menu"),
        queryParams: params,
    });
}

export const postMenuUpload = (data?: Record<any, any>) => {
    return api({
        method: "POST",
        data: data,
        urlKey: API_URL.MENU.UPLOAD,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
}

export const patchMenuUpload = (id: string, data?: Record<any, any>) => {
    return api({
        method: "PATCH",
        data: data,
        urlKey: `${API_URL.MENU.TOGGLE.replace(":id", id)}`
    });
}

export const deleteMenuUpload = (id: string) => {
    return api({
        method: "DELETE",
        urlKey: `${API_URL.MENU.TOGGLE.replace(":id", id)}`,
    });
}
