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

export const MenuDataSuperuser: VerticalMenuDataType[] = [
    {
        label: "Home",
        icon: "tabler-home",
        href: APP_URL.SUPERUSER_HOME.INDEX,
    },
    {
        label: "User",
        icon: "tabler-users",
        href: APP_URL.SUPERUSER_USERS.INDEX,
        exactMatch: false,
        activeUrl: APP_URL.SUPERUSER_USERS.INDEX
    },
    {
        label: "Table Management",
        icon: "tabler-brand-airtable",
        href: APP_URL.SUPERUSER_TABLE.INDEX,
        exactMatch: false,
        activeUrl: APP_URL.SUPERUSER_TABLE.INDEX
    },
    {
        label: "Menu",
        icon: "tabler-soup",
        href: APP_URL.SUPERUSER_MENU.INDEX,
        exactMatch: false,
        activeUrl: APP_URL.SUPERUSER_MENU.INDEX
    },
    {
        label: "Song Request",
        icon: "tabler-music-share",
        href: APP_URL.SUPERUSER_SONG_REQUEST.INDEX,
        exactMatch: false,
        activeUrl: APP_URL.SUPERUSER_SONG_REQUEST.INDEX
    },
    {
        label: "Screen Takeover",
        icon: "tabler-screen-share",
        href: APP_URL.SUPERUSER_SCREEN_TAKEOVER.INDEX,
        exactMatch: false,
        activeUrl: APP_URL.SUPERUSER_SCREEN_TAKEOVER.INDEX
    }
]
