import type { CSSProperties } from "react";

export const ADMIN_MUSIC_REQUEST_FETCHING_INTERVAL = 10000;

export const STATUS_COLOR_DATA = ({ darkMode }: { darkMode?: boolean }): Record<string, CSSProperties> => ({
    pending: {
        backgroundColor: darkMode ? "#3B2F00" : "#FFF3CD",
        borderColor: darkMode ? "#665200" : "#FFECB5",
        color: darkMode ? "#FFE69C" : "#856404",
    },
    admin_rejected: {
        backgroundColor: darkMode ? "#3A0D11" : "#F8D7DA",
        borderColor: darkMode ? "#842029" : "#F5C2C7",
        color: darkMode ? "#F5C2C7" : "#842029",
    },
    admin_approved: {
        backgroundColor: darkMode ? "#0F2A20" : "#D1E7DD",
        borderColor: darkMode ? "#1E7E5A" : "#BADBCC",
        color: darkMode ? "#75E0B3" : "#0F5132",
    },
    dj_rejected: {
        backgroundColor: darkMode ? "#3A0D11" : "#F8D7DA",
        borderColor: darkMode ? "#842029" : "#F5C2C7",
        color: darkMode ? "#F5C2C7" : "#842029",
    },
    dj_approved: {
        backgroundColor: darkMode ? "#0F2A20" : "#D1E7DD",
        borderColor: darkMode ? "#1E7E5A" : "#BADBCC",
        color: darkMode ? "#75E0B3" : "#0F5132",
    },
});
