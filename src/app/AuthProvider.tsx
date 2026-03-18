"use client";

import { useEffect, useState, type ReactNode } from "react";

import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/hooks/auth";
import { AuthConfig, AuthRedirecting, matcher } from "@/configs/authConfig";

type TAuthProvider = {
    children: ReactNode;
};

function AuthProvider({ children }: TAuthProvider) {
    const pathname = usePathname();
    const router = useRouter();

    const { currentRole, hasPermission } = useAuth();

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (matcher[currentRole()].includes(pathname)) {
            setChecked(true);
        }

        if (matcher.guest.includes(pathname) && localStorage.getItem(AuthConfig.tokenKey)) {
            router.push(AuthRedirecting[currentRole()]);

            return;
        }

        if (matcher.admin.includes(pathname) && !hasPermission("admin")) {
            router.push(AuthRedirecting[currentRole()]);

            return;
        }
    }, [pathname, router]);

    if (!checked) return <></>

    return children

}

export default AuthProvider
