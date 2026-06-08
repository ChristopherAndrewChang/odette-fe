import { API_URL } from "@/data/internal/api-route";
import { api } from "@/utils/api";
import type { ResponseWrapper } from "@/types/api";
import type { ReportSummary, ReportFilter } from "../types";

export const getReportSummary = (
    filter: ReportFilter
): Promise<ResponseWrapper<ReportSummary>> => {
    const params =
        filter.type === "date"
            ? { date: filter.date }
            : { period: filter.period };

    return api({
        method: "GET",
        urlKey: API_URL.REPORTS.SUMMARY,
        queryParams: params
    });
};
