import { AuthConfig } from "@/configs/authConfig"

export const onLogout = () => {
    localStorage.removeItem(AuthConfig.tokenKey);
    localStorage.removeItem(AuthConfig.refreshKey);
    localStorage.removeItem(AuthConfig.rememberKey);
}
