import { headers } from "next/headers"

export async function GET() {
    const headersList = headers();

    const forwarded = headersList.get("x-forwarded-for");

    return Response.json({
        ip: forwarded
    });
}
