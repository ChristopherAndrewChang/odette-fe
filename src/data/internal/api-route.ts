export const API_URL = {
    SHARED: {},
    LOGIN: {
        INDEX: "/auth/login/"
    },
    TABLES: {
        INDEX: "/tables/",
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
    }
}
