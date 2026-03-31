import dayjs from "dayjs";

import type { TTables } from "./types/tables";

export const TablesMapper = (data: TTables[]) => {
    return data?.map(_data => ({
        ..._data,
        created_at: dayjs(_data.created_at).format("DD MMM YYYY, HH:mm A"),
        active_sessions: !!_data?.active_sessions
    }))
}
