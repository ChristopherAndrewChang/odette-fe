"use client";

import clsx from "clsx";
import Link from "next/link";
import { HTMLAttributes, ReactNode } from "react";

type TCardMenu = {
    href: string;
    textHeading: string;
    textSubtitle: string;
    icon: ReactNode;
    bgAndBorderClassName?: HTMLAttributes<HTMLAnchorElement>["className"];
}

function CardMenu({ href, icon, textHeading, textSubtitle, bgAndBorderClassName }: TCardMenu) {
    return (
        <Link href={href} className={clsx("flex flex-col gap-1 p-4 rounded-2xl border", bgAndBorderClassName)}>
            {icon}
            <p className="text-lg font-poppins font-semibold text-white">{textHeading}</p>
            <p className="text-gray-500 cursor-pointer font-poppins">{textSubtitle}</p>
        </Link>
    )
}

export default CardMenu