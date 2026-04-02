import dayjs from "dayjs";

import type { TScreenTakeOver } from "@/features/user/screen-takeover/types/screen-takeover";
import { AppConfig } from "@/configs/appConfig";

export const ScreenTakeoverMapper = (data: TScreenTakeOver[]) => {
    return data?.map(screen => ({
        ...screen,
        created_at: screen?.created_at ? dayjs(screen?.created_at).format("DD MMM YYYY, HH:mm A") : "-",
        media_file: `${AppConfig.mediaUrl}${screen?.media_file}`,
        donation_amount: !!screen?.donation_amount ? `Rp${Number(screen?.donation_amount)?.toLocaleString()}` : "-",
        reviewed_at: !!screen?.reviewed_at ? dayjs(screen?.reviewed_at).format("DD MMM YYYY, HH:mm A") : "-"
    }))
}
