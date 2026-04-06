"use client";

import Link from "@/components/Link";

function DjHomePage() {
    return (
        <main className="grid grid-cols-1 p-4">
            <Link href="/dj/music-request" className="p-4 bg-gradient-to-r from-[#1E0A35] via-[#1E0A35] to-[#230D46] rounded-lg border border-purple-950 flex">
                <i className="tabler-music text-purple-300"></i>
                <p className="text-purple-300">Music Request</p>
            </Link>
        </main>
    )
}

export default DjHomePage;
