import type { VerticalMenuDataType } from "@/types/menuTypes";
import { APP_URL } from "../internal/app-route";

export const MenuData: VerticalMenuDataType[] = [
    {
        label: "Home",
        icon: "tabler-home",
        href: APP_URL.ADMIN_HOME.INDEX,
    },
    {
        label: "Table",
        icon: "tabler-table",
        href: APP_URL.ADMIN_TABLE.INDEX,
        exactMatch: false,
        activeUrl: APP_URL.ADMIN_TABLE.INDEX
    }
]
