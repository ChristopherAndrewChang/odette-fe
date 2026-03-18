"use client";

import Link from "@/components/Link";

type TUserBackButton = {
    href: string;
}

function UserBackButton({ href }: TUserBackButton) {
    return (
        <Link href={href} className="flex gap-2 items-center mb-4">
            <div className="h-8 w-8 flex items-center justify-center border border-gray-500 rounded-xl">
                <i className="tabler-chevron-left text-white"></i>
            </div>
            <p className="text-xl text-gray-400 font-poppins">Back</p>
        </Link>
    )
}

export default UserBackButton
