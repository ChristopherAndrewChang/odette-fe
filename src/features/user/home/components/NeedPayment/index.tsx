"use client";

import { CircularProgress } from "@mui/material";

import { useMyScreenTakeoverHomeQuery } from "@/features/user/screen-takeover/hooks/screen-takeover";

type TData = {
    id: number;
    donation_amount: string;
    request_type: string
    status: string;
    payment_link: string | null;
}

function NeedPaymentSection() {
    const { data: screenTakeover, isFetching: isScreenTakeoverFetching, refetch: screenTakeoverRefetch } = useMyScreenTakeoverHomeQuery();

    // const { data: songRequest, isFetching: isSongRequestFetching, refetch: songRequestRefetch } = useMySongRequestQuery();

    const datas: TData[] = [...(screenTakeover?.data?.results ?? [])];

    const isShowLoadingIndicator = isScreenTakeoverFetching;

    return (
        <section className="mt-6 flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <p className="font-outfit font-semibold text-xl text-gray-400">Need Payment</p>
                {isShowLoadingIndicator ? (
                    <CircularProgress size={16} className="text-gray-400" />
                ) : null}
            </div>
            <div className="bg-gradient-to-r from-[#1C1606] to-[#2A220A] border border-yellow-900/50 shadow-lg shadow-yellow-900/20 rounded-lg p-4">
                <p className="font-medium text-yellow-800 text-lg">Attention</p>
                <p className="text-gray-400">Sometimes, you need to refresh to update the status</p>
            </div>
            <div onClick={() => {
                screenTakeoverRefetch();
            }} className="px-4 py-2 rounded-lg border bg-gray-900">
                <p className="text-white text-center">Refresh</p>
            </div>

            <div className="flex flex-col gap-2">
                {datas?.map(result => (
                    <div key={`screen-${result.id}`} className="p-4 bg-gray-950 border border-gray-800 rounded-lg flex flex-col gap-2">
                        <p className="text-gray-500">Type: <span className="text-gray-300 font-medium">{result?.request_type?.replace("_", " ")}</span></p>
                        <p className="text-gray-500">Status: <span className="text-gray-300 font-medium">{result?.status?.replace("_", " ")}</span></p>
                        <p className="text-gray-500">Amount: <span className="text-gray-300 font-medium">Rp{Number(result?.donation_amount)?.toLocaleString()}</span></p>

                        {result?.status === "pending_payment" ? (
                            <a href={result?.payment_link || ""} target="_blank" className="block w-full p-2 bg-gray-900 text-center rounded-lg text-white border border-gray-800">Pay</a>
                        ) : null}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default NeedPaymentSection;
