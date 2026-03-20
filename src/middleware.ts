import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
    const { pathname } = request.nextUrl;
    const isLoginPage = pathname.startsWith("/login");

    if (!isLoginPage && !request.cookies.get("access_token")) {
        const loginUrl = new URL("/login", request.url);

        // Opsional: Simpan halaman asal agar setelah login bisa kembali ke sini
        loginUrl.searchParams.set("from", pathname);

        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        // Lindungi semua halaman kecuali folder public, api, dan static files
        '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
    ],
};
