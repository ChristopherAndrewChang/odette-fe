"use client";

import { useRouter } from "next/navigation";

import { useTopLoader } from "nextjs-toploader";

import { onLogout } from "@/utils/logout";
import { APP_URL } from "@/data/internal/app-route";

type TDjHeaderPage = {
    pageActive?: "home" | "history";
}

function DjHeaderPage({ pageActive }: TDjHeaderPage) {
    const loader = useTopLoader();
    const router = useRouter();

    const onHistoryClicked = () => {
        router.push(APP_URL.DJ_HISTORY.INDEX);
        loader.start();
    };

    const onHomeClicked = () => {
        router.push(APP_URL.DJ_HOME.INDEX);
        loader.start();
    }

    return (
        <section className="flex justify-between items-center gap-6">
            {/* logout */}
            <div onClick={() => {
                onLogout();
                loader.start();
                router.push(APP_URL.GUEST_LOGIN.INDEX);
            }} className="py-1 px-4 border border-red-800 w-fit rounded-lg mb-6 cursor-pointer">
                <p className="text-error">Logout</p>
            </div>
            {/* end of logout action */}

            {pageActive === "history" ? (
                <>
                    {/* home action */}
                    <div onClick={onHomeClicked} className="transition-all py-1 px-4 border border-green-500 w-fit rounded-lg mb-6 cursor-pointer bg-green-950 hover:bg-green-900">
                        <p className="text-white text-lg">Back to Home</p>
                    </div>
                    {/* end of home action */}
                </>
            ) : (
                <>
                    {/* history action */}
                    {/* <div onClick={onHistoryClicked} className="transition-all py-1 px-4 border border-blue-500 w-fit rounded-lg mb-6 cursor-pointer bg-blue-950 hover:bg-blue-900">
                        <p className="text-white text-lg">History</p>
                    </div> */}
                    {/* end of history action */}
                </>
            )}
        </section>
    )
}

export default DjHeaderPage
