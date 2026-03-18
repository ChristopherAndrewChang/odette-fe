import { APP_URL } from "@/data/internal/app-route"

export const AuthConfig = {
    tokenKey: "access-token",
    refreshKey: "refresh-token",
    rememberKey: "remember",
    roles: {
        admin: "is_admin",
    }
}

export const AuthRedirecting = {
    guest: APP_URL.GUEST_LOGIN.INDEX,
    admin: APP_URL.ADMIN_HOME.INDEX,
}

export const matcher = {
    guest: [
        APP_URL.GUEST_LOGIN.INDEX,
    ],
    admin: [
        APP_URL.ADMIN_HOME.INDEX,
        APP_URL.ADMIN_TABLE.INDEX,
    ],
}
