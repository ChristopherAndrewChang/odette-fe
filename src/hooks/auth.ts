import type { AuthRedirecting } from "@/configs/authConfig";
import { AuthConfig } from "@/configs/authConfig"

export const useAuth = () => {
    const roles = Object.keys(AuthConfig.roles) as Array<keyof typeof AuthConfig.roles>;

    const hasPermission = (role: keyof typeof AuthConfig.roles) => {
        if (!!roles.includes(role)) {
            const roleValue = AuthConfig.roles[role] as string;

            return (localStorage.getItem(roleValue) === "1")
        }
    }

    const currentRole = (): (keyof typeof AuthRedirecting | "guest") => {
        let roleNow = "guest";

        for (const _role of roles) {
            if (localStorage.getItem(AuthConfig.roles[_role]) === "1") {
                roleNow = _role;
                break;
            }
        }

        return roleNow as keyof typeof AuthRedirecting | "guest";
    }

    return {
        roles,
        hasPermission,
        currentRole
    }
}
