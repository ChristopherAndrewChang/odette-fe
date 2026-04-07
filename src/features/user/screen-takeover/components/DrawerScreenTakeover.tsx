"use client";

import { Drawer } from "@mui/material";

import { useColor } from "@/hooks/color";
import ListMyScreenTakeover from "./ListMyScreenTakeover";

type TDrawerScreenTakeover = {
    open: boolean;
    onClose: () => void;
}

function DrawerScreenTakeover({ onClose, open }: TDrawerScreenTakeover) {
    const { DARKBLUE } = useColor();

    return (
        <Drawer open={open} anchor="right" onClose={onClose}>
            <main style={{ backgroundColor: DARKBLUE }} className="min-h-full p-6">
                {/* close */}
                <div
                    onClick={onClose}
                    className="w-6 h-6 border border-gray-400 rounded-lg flex items-center justify-center mb-4"
                >
                    <i className="tabler-x text-gray-400"></i>
                </div>
                {/* end of close */}

                <p className="text-white font-poppins text-lg mb-6 font-medium pb-4 border-b border-gray-500">Your Screen Takeover Request History</p>

                <div>
                    <ListMyScreenTakeover />
                </div>
            </main>
        </Drawer>
    )
}

export default DrawerScreenTakeover
