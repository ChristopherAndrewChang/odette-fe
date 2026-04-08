import toast from "react-hot-toast";

import cookieStore from "js-cookie";

import { STORAGE_KEY } from "@/data/internal/storage";

export const onLogout = () => {
    localStorage.removeItem(STORAGE_KEY.TOKEN);
    cookieStore.remove(STORAGE_KEY.TOKEN);

    localStorage.removeItem(STORAGE_KEY.USER_SESSION);
    cookieStore.remove(STORAGE_KEY.USER_SESSION);

    localStorage.removeItem(STORAGE_KEY.USER_TABLE);
    cookieStore.remove(STORAGE_KEY.USER_TABLE);

    localStorage.removeItem(STORAGE_KEY.USER_NAME);
    cookieStore.remove(STORAGE_KEY.USER_NAME);

    toast.success("Logout success");
}
