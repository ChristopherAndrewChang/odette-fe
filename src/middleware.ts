import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { STORAGE_KEY } from "./data/internal/storage";
import { getRoleFromJWT } from "./utils/auth";
import { APP_URL } from "./data/internal/app-route";

export const middleware = (request: NextRequest) => {
    const { pathname } = request.nextUrl;
    const isLoginPage = pathname.startsWith("/login");
    const isUserPage = pathname.startsWith("/user");
    const isAdminPage = pathname.startsWith("/su"); // admin dan su ada di satu route
    const isDjPage = pathname.startsWith("/dj");
    const isUserScanPage = pathname.startsWith(APP_URL.USER_SCAN.INDEX);
    const is404Page = pathname.startsWith("/user/404");
    const isHomePage = pathname.startsWith("/home");
    const isPWAPage = pathname.startsWith("/pwa");

    const isUser = !!request?.cookies?.get(STORAGE_KEY.USER_SESSION);
    const isSuperuser = getRoleFromJWT(request?.cookies?.get(STORAGE_KEY.TOKEN)?.value || "") === "superuser";
    const isAdmin = getRoleFromJWT(request?.cookies?.get(STORAGE_KEY.TOKEN)?.value || "") === "admin";
    const isDJ = getRoleFromJWT(request?.cookies?.get(STORAGE_KEY.TOKEN)?.value || "") === "dj";
    const isGuest = !isUser && !isSuperuser && !isAdmin && !isDJ;

    const userDefaultPage = new URL(APP_URL.USER_HOME.INDEX, request.url);
    const superuserDefaultPage = new URL(APP_URL.SUPERUSER_USERS.INDEX, request.url);
    const adminDefaultPage = new URL(APP_URL.SUPERUSER_TABLE.INDEX, request.url);
    const djDefaultPage = new URL(APP_URL.DJ_HOME.INDEX, request.url);
    const notFoundPage = new URL("/user/404", request.url);
    const userScanPage = new URL(APP_URL.USER_SCAN.INDEX, request.url);

    if (isHomePage) {
        if (isUser) {
            return NextResponse.redirect(userDefaultPage);
        } else if (isSuperuser) {
            return NextResponse.redirect(superuserDefaultPage);
        } else if (isAdmin) {
            return NextResponse.redirect(adminDefaultPage);
        } else if (isDJ) {
            return NextResponse.redirect(djDefaultPage);
        }

        // guest
        return NextResponse.redirect(notFoundPage);
    }

    if (isPWAPage) {
        if (isGuest) {
            return NextResponse.next();
        } else if (isUser) {
            return NextResponse.redirect(userDefaultPage);
        } else if (isSuperuser) {
            return NextResponse.redirect(superuserDefaultPage);
        } else if (isAdmin) {
            return NextResponse.redirect(adminDefaultPage);
        } else if (isDJ) {
            return NextResponse.redirect(djDefaultPage);
        }
    }

    if (isUserScanPage) {
        if (isGuest || isUser) {
            return NextResponse.next();
        } else if (isSuperuser) {
            return NextResponse.redirect(superuserDefaultPage);
        } else if (isAdmin) {
            return NextResponse.redirect(adminDefaultPage);
        } else if (isDJ) {
            return NextResponse.redirect(djDefaultPage);
        }
    }

    if (is404Page) {
        return NextResponse.next();
    }

    // login page = only for guest
    if (isLoginPage) {
        // jika user ada di halaman login page
        if (isUser) {
            return NextResponse.redirect(userDefaultPage);
        } else if (isSuperuser) {
            // jika superuser ada di halaman login page => diarahkan ke /su/users
            return NextResponse.redirect(superuserDefaultPage);
        } else if (isAdmin) {
            // jika admin ada di halaman login page
            return NextResponse.redirect(adminDefaultPage);
        } else if (isDJ) {
            // jika dj ada di halaman login page
            return NextResponse.redirect(djDefaultPage);
        }
    }

    // userpage: only for user
    if (isUserPage) {
        if (isGuest) {
            return NextResponse.redirect(userScanPage);
        } else if (isSuperuser) {
            return NextResponse.redirect(superuserDefaultPage);
        } else if (isAdmin) {
            return NextResponse.redirect(adminDefaultPage);
        } else if (isDJ) {
            return NextResponse.redirect(djDefaultPage);
        }
    }

    // admin page: only for admin and superuser
    if (isAdminPage) {
        if (isGuest) {
            return NextResponse.redirect(notFoundPage);
        } else if (isUser) {
            return NextResponse.redirect(userDefaultPage);
        } else if (isDJ) {
            return NextResponse.redirect(djDefaultPage);
        }
    }

    // dj page: only for dj
    if (isDjPage) {
        if (isUser) {
            return NextResponse.redirect(userDefaultPage);
        } else if (isSuperuser) {
            // jika superuser ada di halaman login page => diarahkan ke /su/users
            return NextResponse.redirect(superuserDefaultPage);
        } else if (isAdmin) {
            // jika admin ada di halaman login page
            return NextResponse.redirect(adminDefaultPage);
        } else if (isGuest) {
            // jika dj ada di halaman login page
            return NextResponse.redirect(notFoundPage);
        }
    }

    return NextResponse.next();

    // function getClientIP(req: any): string {
    //     const ip =
    //         req.headers["x-forwarded-for"]?.split(",")[0] ||
    //         req.headers["x-real-ip"] ||
    //         req.socket?.remoteAddress ||
    //         "";

    //     if (!ip) return "unknown";

    //     // localhost IPv6
    //     if (ip === "::1") return "127.0.0.1";

    //     // IPv6 mapped IPv4
    //     if (ip.startsWith("::ffff:")) {
    //         return ip.replace("::ffff:", "");
    //     }

    //     return ip;
    // }

    // console.log("mywifi-ip", request.headers.get("x-forwarded-for"));
    // console.log("real-ip", request.headers.get("x-real-ip"));
    // console.log("ip", request.ip);
    // console.log("gpt", getClientIP(request));

    // if (isUserPage && !request.cookies.get(STORAGE_KEY.USER_SESSION)) {
    //     if (pathname === "/user/404" || isUserScanPath) {
    //         return NextResponse.next();
    //     }

    //     return NextResponse.redirect(new URL("/user/404", request.url));
    // } else if (isUserPage && request.cookies.get(STORAGE_KEY.USER_SESSION)) {
    //     return NextResponse.next();
    // }

    // if (!isLoginPage && !request.cookies.get(STORAGE_KEY.TOKEN)) {
    //     const homeUrl = new URL('/user/404', request.url);

    //     return NextResponse.redirect(homeUrl);
    // } else if (isLoginPage && !!request?.cookies?.get(STORAGE_KEY.TOKEN)) {
    //     const token = request.cookies.get(STORAGE_KEY.TOKEN);

    //     if (getRoleFromJWT(token?.value || "") === "superuser") {
    //         return NextResponse.redirect(new URL(APP_URL.SUPERUSER_USERS.INDEX, request.url));
    //     } else if (getRoleFromJWT(token?.value || "") === "admin") {
    //         return NextResponse.redirect(new URL(APP_URL.SUPERUSER_TABLE.INDEX, request.url));
    //     } else if (getRoleFromJWT(token?.value || "") === "dj") {
    //         return NextResponse.redirect(new URL(APP_URL.DJ_HOME.INDEX, request.url));
    //     } else {
    //         return NextResponse.redirect(new URL("/home", request.url));
    //     }
    // }


    return NextResponse.next();
}

export const config = {
    matcher: [
        // Lindungi semua halaman kecuali folder public, api, dan static files
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
