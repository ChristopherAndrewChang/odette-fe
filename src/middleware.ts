import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { STORAGE_KEY } from "./data/internal/storage";
import { getRoleFromJWT } from "./utils/auth";
import { APP_URL } from "./data/internal/app-route";

export const middleware = (request: NextRequest) => {
    const { pathname } = request.nextUrl;
    const isLoginPage = pathname.startsWith("/login");
    const isUserPage = pathname.startsWith("/user");
    const isUserScanPath = pathname.startsWith(APP_URL.USER_SCAN.INDEX);

    if (isUserScanPath && request.cookies.get(STORAGE_KEY.USER_SESSION)) {
        return NextResponse.redirect(new URL("/user/home", request.url));
    } else if (isUserPage && !request.cookies.get(STORAGE_KEY.USER_SESSION)) {
        if (pathname === "/user/404" || isUserScanPath) {
            return NextResponse.next();
        }

        return NextResponse.redirect(new URL("/user/404", request.url));
    } else if (isUserPage && request.cookies.get(STORAGE_KEY.USER_SESSION)) {
        return NextResponse.next();
    }

    if (!isLoginPage && !request.cookies.get(STORAGE_KEY.TOKEN)) {
        const loginUrl = new URL("/login", request.url);

        // Opsional: Simpan halaman asal agar setelah login bisa kembali ke sini
        loginUrl.searchParams.set("from", pathname);

        return NextResponse.redirect(loginUrl);
    } else if (isLoginPage && !!request?.cookies?.get(STORAGE_KEY.TOKEN)) {
        const token = request.cookies.get(STORAGE_KEY.TOKEN);

        if (getRoleFromJWT(token?.value || "") === "superuser") {
            return NextResponse.redirect(new URL(APP_URL.SUPERUSER_HOME.INDEX, request.url));
        } else {
            return NextResponse.redirect(new URL("/home", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Lindungi semua halaman kecuali folder public, api, dan static files
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
