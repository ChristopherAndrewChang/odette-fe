import type { TPaginationResponseType } from "@ozanplanviu/planviu-core";

import { API_URL } from "@/data/internal/api-route";
import type { ResponseWrapper } from "@/types/api";
import { api } from "@/utils/api"
import type { TMenus } from "../types/menus";

export const getAllPromos = (params?: Record<any, any>, noAuth?: boolean): Promise<ResponseWrapper<TPaginationResponseType<TMenus[]>>> => {
    return api({
        method: "GET",
        queryParams: params,
        urlKey: API_URL.MENU.INDEX.replace(":type", "promo"),
        noAuth: noAuth
    });
}
