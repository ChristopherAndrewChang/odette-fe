import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "@/data/internal/query-keys";
import { getReportSummary } from "../services";
import type { ReportFilter } from "../types";

export const useReportSummary = (filter: ReportFilter) => {
    return useQuery({
        queryKey: [QUERY_KEY.REPORTS.SUMMARY, filter],
        queryFn: () => getReportSummary(filter),
        select: (data) => data.data,
        staleTime: 1000 * 60 * 5,
    });
};
