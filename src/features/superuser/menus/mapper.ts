import dayjs from "dayjs";

import type { TMenus } from "./types/menus";

export const MenuMapper = (menus: TMenus[]) => {
    return menus?.map(menu => ({
        ...menu,
        uploaded_at: dayjs(menu?.uploaded_at).format("DD MMM YYYY, HH:mm A")
    }))
}
