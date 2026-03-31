import { jwtDecode } from "jwt-decode";

import { AuthConfig } from "@/configs/authConfig"

export const onLogout = () => {
    localStorage.removeItem(AuthConfig.tokenKey);
    localStorage.removeItem(AuthConfig.refreshKey);
    localStorage.removeItem(AuthConfig.rememberKey);
}

export const getRoleFromJWT = (jwtToken: string) => {
    const jwtResponse = jwtDecode(jwtToken) as { role: string };
    const role = jwtResponse.role;

    return role;
}
