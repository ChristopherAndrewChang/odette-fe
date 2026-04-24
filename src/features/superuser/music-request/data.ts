import type { CSSProperties } from "react";

export const ADMIN_MUSIC_REQUEST_FETCHING_INTERVAL = 10000;

export const STATUS_COLOR_DATA: Record<string, CSSProperties> = {
    pending: {
        backgroundColor: "#FFF3CD", // soft yellow
        borderColor: "#FFECB5",
        color: "#856404",
    },
    admin_rejected: {
        backgroundColor: "#F8D7DA", // soft red
        borderColor: "#F5C2C7",
        color: "#842029",
    },
    admin_approved: {
        backgroundColor: "#D1E7DD", // soft green
        borderColor: "#BADBCC",
        color: "#0F5132",
    },
    dj_rejected: {
        backgroundColor: "#F8D7DA",
        borderColor: "#F5C2C7",
        color: "#842029",
    },
    dj_approved: {
        backgroundColor: "#D1E7DD",
        borderColor: "#BADBCC",
        color: "#0F5132",
    },
};
