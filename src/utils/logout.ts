import toast from "react-hot-toast";

import { STORAGE_KEY } from "@/data/internal/storage";

export const onLogout = () => {
    localStorage.removeItem(STORAGE_KEY.TOKEN);
    cookieStore.delete(STORAGE_KEY.TOKEN);
    toast.success("Logout success");
}
