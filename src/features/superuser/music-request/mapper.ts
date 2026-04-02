import dayjs from "dayjs";

import type { TMySongReq } from "@/features/user/song-request/types/song-request";

export const MusicRequestMapper = (data: TMySongReq[]) => {
    return data?.map(song => ({
        ...song,
        created_at: !!song?.created_at ? dayjs(song.created_at).format("DD MMM YYYY, HH:mm A") : "-",
        donation_amount: !!song?.donation_amount ? `Rp${Number(song?.donation_amount)?.toLocaleString()}` : "-",
        reviewed_at: !!song?.reviewed_at ? dayjs(song?.reviewed_at).format("DD MMM YYYY, HH:mm A") : "-",
    }))
}
