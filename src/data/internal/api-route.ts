export const API_URL = {
    SHARED: {},
    ME: {
        INDEX: "/users/me/"
    },
    SETTINGS: {
        INDEX: "/core/settings/"
    },
    SETTINGS_DONATION: {
        INDEX: "/core/settings/donation/admin/",
        PUBLIC: "/core/settings/donation/"
    },
    SETTINGS_BAD_WORDS: {
        INDEX: "/core/banned-words/"
    },
    LOGIN: {
        INDEX: "/auth/login/"
    },
    USERS: {
        INDEX: "/users/admins/",
        DETAILS: "/users/admins/:id/"
    },
    DJ_SONG_APPROVAL: {
        DETAILS: "/songs/:id/dj-review/"
    },
    USER_SCAN: {
        INDEX: "/tables/scan/"
    },
    TABLES: {
        INDEX: "/tables/",
        DETAIL: "/tables/:id/",
        CLOSE_NIGHT: "/tables/close-night/",
        OPEN_NIGHT: "/tables/open-night/",
        BULK: "/tables/bulk/",
        SINGLE_GENERATE_QR: "/tables/:id/generate-qr/",
        BULK_GENERATE_QR: "/tables/bulk-qr/"
    },
    MENU: {
        INDEX: "/menu/pdf/:type/",
        UPLOAD: "/menu/pdf/upload/",
        TOGGLE: "/menu/pdf/:id/toggle/"
    },
    SCREEN_TAKEOVER: {
        INDEX: "/screen/",
        APPROVAL: "/screen/:id/review/"
    },
    SONG_REQUEST: {
        INDEX: "/songs/",
        APPROVAL: "/songs/:id/admin-review/",
        MARK_BILLED: "/songs/:id/bill/"
    }
}
