"use client";

import { Drawer } from "@mui/material";

import { useColor } from "@/hooks/color";
import ListRequestSong from "./ListRequestSong";

type TListRequestSongDrawer = {
    open: boolean;
    onClose: () => void;
}

function ListRequestSongDrawer({ onClose, open }: TListRequestSongDrawer) {
    const { DARKBLUE } = useColor();

    return (
        <Drawer open={open} onClose={onClose} anchor="right">
            <main className="p-6 min-h-full" style={{ backgroundColor: DARKBLUE }}>
                {/* close */}
                <div
                    onClick={onClose}
                    className="w-6 h-6 border border-gray-400 rounded-lg flex items-center justify-center mb-4"
                >
                    <i className="tabler-x text-gray-400"></i>
                </div>
                {/* end of close */}

                <p className="text-gray-400 font-poppins text-lg mb-6 pb-4 border-b border-gray-200">Your Song Request History</p>
                <ListRequestSong />
            </main>
        </Drawer>
    )
}

export default ListRequestSongDrawer
