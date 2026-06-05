// "use client";

// import type { ReactNode } from "react";

// type TKanbanScreenTakeover = {
//     runningTextSlot?: {
//         content: ReactNode;
//         searchValue?: string;
//         onSearch?: (value: string) => void;
//     };
//     vtronTextSlot?: {
//         content: ReactNode;
//         searchValue?: string;
//         onSearch?: (value: string) => void;
//     };
//     vtronImageSlot?: {
//         content: ReactNode;
//         searchValue?: string;
//         onSearch?: (value: string) => void;
//     };
//     vtronVideoSlot?: {
//         content: ReactNode;
//         searchValue?: string;
//         onSearch?: (value: string) => void;
//     };
// }

// function KanbanScreenTakeover({ runningTextSlot, vtronImageSlot, vtronTextSlot }: TKanbanScreenTakeover) {
//     return (
//         <div className="flex flex-1 overflow-x-auto">
//             {/* card */}
//             <div className="border-x border-b-2 p-6 flex flex-col gap-2 w-fit">
//                 {runningTextSlot?.content || null}
//             </div>

//             <div className="border-x p-6 border-b-2 flex flex-col gap-2 w-fit">
//                 {vtronTextSlot?.content || null}
//             </div>

//             <div className="border-x p-6 border-b-2 flex flex-col gap-2 w-fit">
//                 {vtronImageSlot?.content || null}
//             </div>

//             {/* VIDEO HIDE */}
//             {/* <div className="border-x border-b-2 p-6 flex flex-col gap-2 w-fit">
//                 <p className={classNames("font-poppins text-black font-semibold", {
//                     "!text-white": mode === "dark"
//                 })}>VTRON VIDEO</p>
//                 {vtronVideoSlot?.content || null}
//             </div> */}
//         </div>
//     )
// }

// export default KanbanScreenTakeover;

"use client";

import type { ReactNode } from "react";

type TKanbanScreenTakeover = {
    runningTextSlot?: {
        content: ReactNode;
        searchValue?: string;
        onSearch?: (value: string) => void;
    };
    vtronTextSlot?: {
        content: ReactNode;
        searchValue?: string;
        onSearch?: (value: string) => void;
    };
    vtronImageSlot?: {
        content: ReactNode;
        searchValue?: string;
        onSearch?: (value: string) => void;
    };
    vtronVideoSlot?: {
        content: ReactNode;
        searchValue?: string;
        onSearch?: (value: string) => void;
    };
}

function KanbanScreenTakeover({
    runningTextSlot,
    vtronImageSlot,
    vtronTextSlot,
}: TKanbanScreenTakeover) {
    return (
        <div className="mt-4 w-full max-w-full overflow-x-auto overflow-y-hidden border-t flex-1 min-h-0">
            <div className="grid grid-cols-[repeat(3,minmax(360px,1fr))] min-w-[1080px] w-full h-full">
                <div className="border-x border-b-2 p-4 md:p-6 flex flex-col gap-2 min-w-0 min-h-0">
                    {runningTextSlot?.content || null}
                </div>

                <div className="border-x border-b-2 p-4 md:p-6 flex flex-col gap-2 min-w-0 min-h-0">
                    {vtronTextSlot?.content || null}
                </div>

                <div className="border-x border-b-2 p-4 md:p-6 flex flex-col gap-2 min-w-0 min-h-0">
                    {vtronImageSlot?.content || null}
                </div>
            </div>
        </div>
    )
}

export default KanbanScreenTakeover;
