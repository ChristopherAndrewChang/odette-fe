import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    // 1. Ambil parameter 'url' dari query string (misal: /api/download?url=https://...)
    const url = request.nextUrl.searchParams.get("url");

    if (!url) {
        return new NextResponse("URL parameter is missing", { status: 400 });
    }

    try {
        // 2. Server Next.js melakukan fetch ke server media asli (TIDAK AKAN KENA CORS)
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch media: ${response.statusText}`);
        }

        // 3. Ekstrak nama file dari URL asal
        const urlParts = url.split("/");
        const fileName = urlParts[urlParts.length - 1] || "downloaded-media";

        // 4. Dapatkan tipe konten asli (misal: image/jpeg atau video/mp4)
        const contentType = response.headers.get("content-type") || "application/octet-stream";

        // 5. Kembalikan data biner (body) ke browser dengan header "attachment"
        // Header ini adalah instruksi wajib bagi browser untuk langsung mendownload file
        return new NextResponse(response.body, {
            headers: {
                "Content-Disposition": `attachment; filename="${fileName}"`,
                "Content-Type": contentType,
            },
        });

    } catch (error) {
        console.error("Error downloading file via API:", error);

        return new NextResponse("Failed to download file", { status: 500 });
    }
}
