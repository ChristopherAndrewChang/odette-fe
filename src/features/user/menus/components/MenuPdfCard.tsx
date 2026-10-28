"use client";

import { useColor } from "@/hooks/color";
import type { TMenus } from "@/features/superuser/menus/types/menus";
import { toPageProtocol } from "@/utils/string";

type TMenuPdfCard = {
    menu: TMenus;
}

function MenuPdfCard({ menu }: TMenuPdfCard) {
    const { DARKBLUE, DARKGRAY } = useColor();

    return (
        <a
            href={toPageProtocol(menu.file_url)}
            target="_blank"
            rel="noreferrer"
            className="block border rounded-xl cursor-pointer overflow-hidden"
            style={{
                backgroundColor: DARKBLUE,
                borderColor: DARKGRAY
            }}
        >
            <div className="py-2 px-4">
                <p className="font-poppins font-semibold text-white">{menu.title}</p>
                {menu.description ? (
                    <p className="font-poppins text-sm text-gray-300">{menu.description}</p>
                ) : null}
            </div>

            {menu.cover_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={toPageProtocol(menu.cover_url)}
                    alt={menu.title}
                    loading="lazy"
                    className="w-full object-contain"
                />
            ) : (

                // cover is null only when the pdf couldn't be rendered
                <div className="w-full h-40 flex items-center justify-center text-gray-400 text-sm" style={{ backgroundColor: DARKGRAY }}>
                    <i className="tabler-file-type-pdf text-4xl mr-2"></i>
                    No preview available
                </div>
            )}

            <p className="font-poppins text-xs italic text-gray-300 py-2 px-4 flex items-center gap-1">
                <i className="tabler-click text-sm"></i>
                Click to see the full details
            </p>
        </a>
    )
}

export default MenuPdfCard;
