import { cookies } from 'next/headers';

import { api } from "@/utils/api";

export async function POST(request: Request) {
    const body = await request.json();

    try {
        const res = await api({
            method: "POST",
            urlKey: "/token/",
            data: body,
            withAuthorization: false
        });

        cookies().set({
            name: "access_token",
            value: res?.access || "",
            httpOnly: true,
            maxAge: 60 * 60 * 24,
        });

        return Response.json(res);
    } catch (err) {
        console.error(err);

        return Response.json(
            {
                message: "Failed",
            },
            {
                status: 503
            }
        );
    }
}
