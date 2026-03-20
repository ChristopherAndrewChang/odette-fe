"use client";

import { useEffect, useState } from "react";

import { Button } from "@mui/material";

import { api } from "@/utils/api";

const postHello = async () => {
    return await api({
        method: "POST",
        urlKey: "/api/auth/login",
        data: {
            email: "superuser@aryacakra.id",
            password: "qwe123asd"
        },
        usingLocalApi: true
    });
}

function FormTest() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const onSubmit = async () => {
        setLoading(true);

        try {
            const res = await postHello();

            setLoading(false);
            setData(res);
        } catch (err) {
            console.log("something went wrong");
            setLoading(false);
        }
    }

    useEffect(() => {
        console.log("TestData", data);
    }, [data]);

    return (
        <div>
            <Button onClick={onSubmit}>Click me</Button>
            <p className="text-white">{loading ? "Loading..." : "No Loading"}</p>
        </div>
    )
}

export default FormTest
