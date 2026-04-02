import { useQuery } from "@tanstack/react-query"

import { QUERY_KEY } from "@/data/internal/query-keys";
import { getAllMusicRequest } from "../services/music-request";

export const useAllSongRequestsQuery = (params?: Record<any, any>) => {
    return useQuery({
        queryKey: [QUERY_KEY.SONG_REQUEST, params],
        queryFn: () => {
            return getAllMusicRequest(params);
        },
        retry: false,
        refetchOnWindowFocus: false,
    });
}
