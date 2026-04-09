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

    function getClientIP(req: any): string {
        const ip =
            req.headers["x-forwarded-for"]?.split(",")[0] ||
            req.headers["x-real-ip"] ||
            req.socket?.remoteAddress ||
            "";

        if (!ip) return "unknown";

        // localhost IPv6
        if (ip === "::1") return "127.0.0.1";

        // IPv6 mapped IPv4
        if (ip.startsWith("::ffff:")) {
            return ip.replace("::ffff:", "");
        }

        return ip;
    }

    console.log("mywifi-ip", request.headers.get("x-forwarded-for"));
    console.log("real-ip", request.headers.get("x-real-ip"));
    console.log("ip", request.ip);
    console.log("gpt", getClientIP(request));

    // if (isUserScanPath && request.cookies.get(STORAGE_KEY.USER_SESSION)) {
    //     return NextResponse.redirect(new URL("/user/home", request.url));
    // } else 
    if (isUserPage && !request.cookies.get(STORAGE_KEY.USER_SESSION)) {
        if (pathname === "/user/404" || isUserScanPath) {
            return NextResponse.next();
        }

        return NextResponse.redirect(new URL("/user/404", request.url));
    } else if (isUserPage && request.cookies.get(STORAGE_KEY.USER_SESSION)) {
        return NextResponse.next();
    }

    if (!isLoginPage && !request.cookies.get(STORAGE_KEY.TOKEN)) {
        // const loginUrl = new URL("/login", request.url);

        // Opsional: Simpan halaman asal agar setelah login bisa kembali ke sini
        // loginUrl.searchParams.set("from", pathname);

        // return NextResponse.redirect(loginUrl);

        const homeUrl = new URL('/user/404', request.url);

        return NextResponse.redirect(homeUrl);
    } else if (isLoginPage && !!request?.cookies?.get(STORAGE_KEY.TOKEN)) {
        const token = request.cookies.get(STORAGE_KEY.TOKEN);

        if (getRoleFromJWT(token?.value || "") === "superuser") {
            return NextResponse.redirect(new URL(APP_URL.SUPERUSER_USERS.INDEX, request.url));
        } else if (getRoleFromJWT(token?.value || "") === "admin") {
            return NextResponse.redirect(new URL(APP_URL.SUPERUSER_TABLE.INDEX, request.url));
        } else if (getRoleFromJWT(token?.value || "") === "dj") {
            return NextResponse.redirect(new URL(APP_URL.DJ_HOME.INDEX, request.url));
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
