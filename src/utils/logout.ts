import toast from "react-hot-toast";

import cookieStore from "js-cookie";

import { STORAGE_KEY } from "@/data/internal/storage";

export const onLogout = () => {
    localStorage.removeItem(STORAGE_KEY.TOKEN);
    cookieStore.remove(STORAGE_KEY.TOKEN);
    toast.success("Logout success");
}
