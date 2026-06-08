"use client";

import { useState } from "react";

import {
    Button,
    Chip,
    Skeleton,
    TextField,
    Tooltip,
    useColorScheme,
} from "@mui/material";
import classNames from "classnames";

import CookieStore from "js-cookie";

import dayjs from "dayjs";

import AppLayout from "@/components/internal/AppLayout";
import { useReportSummary } from "./hooks/useReportSummary";
import type { NightlyData, ReportPeriod, ReportFilter } from "./types";
import { STORAGE_KEY } from "@/data/internal/storage";
import { getRoleFromJWT } from "@/utils/auth";

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function rp(n: number): string {
    if (n >= 1_000_000_000) return `Rp ${(n / 1_000_000_000).toFixed(1)}M`;
    if (n >= 1_000_000) return `Rp ${(n / 1_000_000).toFixed(1)}jt`;
    if (n >= 1_000) return `Rp ${Math.round(n / 1000)}rb`;

    return `Rp ${n.toLocaleString("id-ID")}`;
}

function pct(a: number, b: number): string {
    if (!b) return "0%";

    return `${Math.round((a / b) * 100)}%`;
}

function fmtLabel(label: string, groupBy: string): string {
    const DAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

    if (!label) return "—";

    if (groupBy === "daily") {
        const d = new Date(label);

        if (Number.isNaN(d.getTime())) return label;


        return `${d.getDate()} ${MONTHS[d.getMonth()]} (${DAYS[d.getDay()]})`;
    }

    if (groupBy === "weekly") {
        return label.replace("-W", " W");
    }

    if (groupBy === "monthly") {
        const [year, month] = label.split("-");


        return `${MONTHS[parseInt(month) - 1]} ${year}`;
    }


    return label;
}

function fmtChartLabel(label: string, groupBy: string): string {
    const MONTHS = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

    if (!label) return "—";

    if (groupBy === "daily") {
        const d = new Date(label);

        if (Number.isNaN(d.getTime())) return label;


        return `${d.getDate()}/${d.getMonth() + 1}`;
    }

    if (groupBy === "weekly") return label.split("-W")[1] ? `W${label.split("-W")[1]}` : label;

    if (groupBy === "monthly") {
        const [, month] = label.split("-");


        return MONTHS[parseInt(month) - 1];
    }


    return label;
}

function nightlyLabel(night: NightlyData): string {
    return night.label ?? night.date ?? "";
}

const CARD_BASE = "rounded-lg border shadow-sm transition-colors";
const CARD_LIGHT = "border-gray-200 bg-white shadow-gray-100/70";
const CARD_DARK = "border-gray-700 bg-[#202030] shadow-black/10";

function cardClass(darkMode: boolean, extra?: string): string {
    return classNames(CARD_BASE, darkMode ? CARD_DARK : CARD_LIGHT, extra);
}

function headingClass(darkMode: boolean, extra?: string): string {
    return classNames("font-semibold", darkMode ? "text-white" : "text-gray-800", extra);
}

function bodyClass(darkMode: boolean, extra?: string): string {
    return classNames(darkMode ? "text-gray-300" : "text-gray-500", extra);
}

function mutedClass(darkMode: boolean, extra?: string): string {
    return classNames(darkMode ? "text-gray-400" : "text-gray-400", extra);
}

function trackClass(darkMode: boolean, extra?: string): string {
    return classNames(darkMode ? "bg-gray-700" : "bg-gray-100", extra);
}

function tintStyle(color: string, darkMode: boolean) {
    return {
        background: `${color}${darkMode ? "24" : "10"}`,
        border: `0.5px solid ${color}${darkMode ? "55" : "30"}`,
    };
}

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────
function MetricCard({
    label, value, sub, barPct, barColor, loading, darkMode,
}: {
    label: string; value: string; sub: string;
    barPct?: number; barColor?: string; loading?: boolean; darkMode: boolean;
}) {
    return (
        <div className={cardClass(darkMode, "p-5 relative overflow-hidden")}>
            <p className={bodyClass(darkMode, "text-xs mb-2")}>{label}</p>
            {loading ? <Skeleton width={120} height={32} /> :
                <p className={headingClass(darkMode, "text-2xl mb-1")}>{value}</p>}
            <p className={mutedClass(darkMode, "text-xs")}>{sub}</p>
            {barPct !== undefined && (
                <div className={trackClass(darkMode, "absolute bottom-0 left-0 right-0 h-[3px]")}>
                    <div className="h-[3px] transition-all duration-700"
                        style={{ width: `${barPct}%`, background: barColor ?? "#c9a84c" }} />
                </div>
            )}
        </div>
    );
}

function InsightCard({ icon, label, value, sub, color, darkMode }: {
    icon: string; label: string; value: string; sub: string; color: string; darkMode: boolean;
}) {
    return (
        <div className={cardClass(darkMode, "p-4 flex gap-3 items-start")}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}${darkMode ? "30" : "18"}` }}>
                <i className={`${icon} text-lg`} style={{ color }} />
            </div>
            <div className="min-w-0">
                <p className={mutedClass(darkMode, "text-xs mb-1")}>{label}</p>
                <p className={headingClass(darkMode, "text-base leading-tight")}>{value}</p>
                <p className={mutedClass(darkMode, "text-xs mt-1")}>{sub}</p>
            </div>
        </div>
    );
}

function RevenueChart({ nightly, groupBy, darkMode }: { nightly: NightlyData[]; groupBy: string; darkMode: boolean }) {
    const maxTotal = Math.max(...nightly.map((n) => n.total), 1);
    const showLabels = nightly.length <= 14;

    return (
        <div className="w-full overflow-x-auto">
            <div className="flex items-end gap-1 h-36" style={{ minWidth: nightly.length * 28 }}>
                {nightly.map((n, index) => {
                    const label = nightlyLabel(n);
                    const songH = Math.round((n.song_revenue / maxTotal) * 100);
                    const screenH = Math.round((n.screen_revenue / maxTotal) * 100);


                    return (
                        <Tooltip key={label || index} title={
                            <div className="text-xs">
                                <div className="font-semibold mb-1">{fmtLabel(label, groupBy)}</div>
                                <div>Lagu: {rp(n.song_revenue)}</div>
                                <div>Layar: {rp(n.screen_revenue)}</div>
                                <div className="font-semibold mt-1">Total: {rp(n.total)}</div>
                            </div>
                        } arrow>
                            <div className="flex flex-col items-center gap-0.5 cursor-pointer flex-1 min-w-[24px]">
                                <div className="w-full flex flex-col-reverse rounded overflow-hidden" style={{ height: 112 }}>
                                    <div className="w-full transition-all duration-500"
                                        style={{ height: `${songH}%`, background: "#c9a84c" }} />
                                    <div className="w-full transition-all duration-500"
                                        style={{ height: `${screenH}%`, background: "#2357a8" }} />
                                </div>
                                {showLabels && (
                                    <span className={mutedClass(darkMode, "text-[9px] text-center leading-tight")}>
                                        {fmtChartLabel(label, groupBy)}
                                    </span>
                                )}
                            </div>
                        </Tooltip>
                    );
                })}
            </div>
            <div className="flex gap-4 mt-3">
                <span className={bodyClass(darkMode, "flex items-center gap-1.5 text-xs")}>
                    <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: "#c9a84c" }} />Lagu
                </span>
                <span className={bodyClass(darkMode, "flex items-center gap-1.5 text-xs")}>
                    <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: "#2357a8" }} />Layar
                </span>
            </div>
        </div>
    );
}

function DonutChart({ songRev, screenRev, darkMode }: { songRev: number; screenRev: number; darkMode: boolean }) {
    const total = songRev + screenRev;

    if (!total) return <div className={mutedClass(darkMode, "text-xs text-center py-8")}>Belum ada data</div>;
    const songPct = Math.round((songRev / total) * 100);
    const r = 45;
    const circ = 2 * Math.PI * r;
    const songLen = (songPct / 100) * circ;

    return (
        <div className="flex flex-col items-center gap-4">
            <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r={r} fill="none" stroke="#2357a8" strokeWidth="14" />
                <circle cx="60" cy="60" r={r} fill="none" stroke="#c9a84c" strokeWidth="14"
                    strokeDasharray={`${songLen} ${circ}`}
                    transform="rotate(-90 60 60)" />
            </svg>
            <div className="w-full space-y-2">
                {[
                    { label: "Lagu", rev: songRev, pct: songPct, color: "#c9a84c" },
                    { label: "Layar", rev: screenRev, pct: 100 - songPct, color: "#2357a8" },
                ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center">
                        <span className={bodyClass(darkMode, "flex items-center gap-1.5 text-xs")}>
                            <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: item.color }} />
                            {item.label}
                        </span>
                        <div className="text-right">
                            <div className={headingClass(darkMode, "text-sm")}>{rp(item.rev)}</div>
                            <div className={mutedClass(darkMode, "text-xs")}>{item.pct}%</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────
const PERIODS: { label: string; value: ReportPeriod }[] = [
    { label: "1 Minggu", value: "7d" },
    { label: "2 Minggu", value: "14d" },
    { label: "1 Bulan", value: "30d" },
    { label: "6 Bulan", value: "180d" },
    { label: "1 Tahun", value: "365d" },
];

const STATUS_CONFIG = [
    { key: "dj_approved" as const, label: "Disetujui DJ", color: "#1d7a5a" },
    { key: "dj_rejected" as const, label: "Ditolak DJ", color: "#b83232" },
    { key: "admin_approved" as const, label: "Disetujui Admin", color: "#2357a8" },
    { key: "admin_rejected" as const, label: "Ditolak Admin", color: "#8b6914" },
    { key: "pending" as const, label: "Menunggu", color: "#7a7268" },
];

const TYPE_COLORS: Record<string, string> = {
    running_text: "#c9a84c",
    vtron_text: "#2357a8",
    vtron_photo: "#1d7a5a",
    vtron_video: "#8b2e9a",
};

// Default date = today's session date
function defaultSessionDate(): string {
    const now = dayjs();


    return (now.hour() < 4 ? now.subtract(1, "day") : now).format("YYYY-MM-DD");
}

export default function ReportPage() {
    const [filter, setFilter] = useState<ReportFilter>({ type: "period", period: "7d" });
    const [dateInput, setDateInput] = useState<string>(defaultSessionDate());
    const { mode } = useColorScheme();
    const darkMode = mode === "dark";

    const { data, isLoading, isError } = useReportSummary(filter);

    const songTotal = data?.song_requests?.total ?? 0;
    const maxNightRev = data ? Math.max(...data.nightly.map((n) => n.total), 1) : 1;

    const maxTypeCount = data
        ? Math.max(...Object.values(data.screen_types).map((t) => t.count), 1) : 1;

    const activePeriod = filter.type === "period" ? filter.period : null;
    const groupBy = data?.group_by ?? "daily";

    const periodLabel = filter.type === "date"
        ? `Sesi ${filter.date} (8PM – ${dayjs(filter.date).add(1, "day").format("D MMM")} 4AM)`
        : `${data?.nights ?? "—"} malam terakhir`;

    const actionButtonSx = darkMode ? {
        color: "#e5e7eb",
        borderColor: "#4b5563",
        "&:hover": {
            borderColor: "#c9a84c",
            backgroundColor: "rgba(201, 168, 76, 0.08)",
        },
        "&.MuiButton-contained": {
            color: "#171723",
            backgroundColor: "#c9a84c",
            borderColor: "#c9a84c",
            "&:hover": {
                backgroundColor: "#d8b957",
                borderColor: "#d8b957",
            },
        },
    } : undefined;

    const dateFieldSx = {
        width: {
            xs: "100%",
            sm: 160,
        },
        ...(darkMode ? {
            "& .MuiOutlinedInput-root": {
                color: "#f9fafb",
                backgroundColor: "#202030",
                "& fieldset": {
                    borderColor: "#4b5563",
                },
                "&:hover fieldset": {
                    borderColor: "#c9a84c",
                },
                "&.Mui-focused fieldset": {
                    borderColor: "#c9a84c",
                },
            },
            "& input::-webkit-calendar-picker-indicator": {
                filter: "invert(1)",
            },
        } : {}),
    };

    if ((getRoleFromJWT(CookieStore.get(STORAGE_KEY.TOKEN) || "") !== "superuser")) {
        return (
            <AppLayout title="">
                <p>You do not have a permission to access this page</p>
            </AppLayout>
        )
    }

    return (
        <AppLayout
            title="Laporan Pendapatan"
            renderAction={
                <div className="grid w-full grid-cols-1 gap-2 xl:w-auto xl:grid-cols-[auto_auto_auto] xl:items-center">
                    {/* Session date picker */}
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-1 md:w-fit md:grid-cols-[160px_auto] xl:flex xl:w-auto xl:items-center">
                        <TextField
                            type="date"
                            size="small"
                            value={dateInput}
                            className="!w-full"
                            onChange={(e) => setDateInput(e.target.value)}
                            inputProps={{ max: dayjs().format("YYYY-MM-DD") }}
                            sx={dateFieldSx}
                        />
                        <Button
                            size="small"
                            variant={filter.type === "date" ? "contained" : "outlined"}
                            color="primary"
                            onClick={() => setFilter({ type: "date", date: dateInput })}
                            sx={actionButtonSx}
                            className="whitespace-nowrap"
                        >
                            Cari sesi
                        </Button>
                    </div>

                    <span className={classNames("hidden text-sm xl:block", darkMode ? "text-gray-600" : "text-gray-300")}>|</span>

                    {/* Period presets */}
                    <div className="grid grid-cols-2 gap-1 min-[420px]:grid-cols-3 md:grid-cols-5 xl:flex xl:w-auto xl:items-center">
                        {PERIODS.map((p) => (
                            <Button
                                key={p.value}
                                onClick={() => setFilter({ type: "period", period: p.value })}
                                variant={activePeriod === p.value ? "contained" : "outlined"}
                                color="primary"
                                sx={actionButtonSx}
                                className="min-w-0 whitespace-nowrap"
                            >
                                {p.label}
                            </Button>
                        ))}
                    </div>
                </div>
            }
        >
            {/* getRoleFromJWT(CookieStore.get(STORAGE_KEY.TOKEN) || "") !== "superuser" */}
            <div className={classNames("space-y-4", {
                "!hidden": (getRoleFromJWT(CookieStore.get(STORAGE_KEY.TOKEN) || "") !== "superuser")
            })}>
                {/* Period description */}
                <p className={mutedClass(darkMode, "text-xs")}>{periodLabel}</p>

                {isError && (
                    <div className={classNames(
                        "rounded-lg border p-4 text-sm",
                        darkMode ? "border-red-900/80 bg-red-950/40 text-red-200" : "border-red-200 bg-red-50 text-red-600"
                    )}>
                        Gagal memuat data laporan. Coba refresh halaman.
                    </div>
                )}

                {/* Insights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <InsightCard icon="tabler-star" label="Malam terbaik"
                        value={data?.best_night ? fmtLabel(nightlyLabel(data.best_night), groupBy) : "—"}
                        sub={data?.best_night ? rp(data.best_night.total) + " pendapatan" : "—"}
                        color="#c9a84c" darkMode={darkMode} />
                    <InsightCard icon="tabler-device-tv" label="Tipe layar terlaris"
                        value={data?.screen_types
                            ? Object.values(data.screen_types).reduce((b, c) => c.count > b.count ? c : b, { name: "—", count: 0, revenue: 0 }).name
                            : "—"}
                        sub={data?.screen_types
                            ? rp(Object.values(data.screen_types).reduce((b, c) => c.count > b.count ? c : b, { name: "—", count: 0, revenue: 0 }).revenue) + " pendapatan"
                            : "—"}
                        color="#2357a8" darkMode={darkMode} />
                </div>

                {/* KPI cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <MetricCard label="Total pendapatan" value={data ? rp(data.total_revenue) : "—"}
                        sub={periodLabel} barPct={100} barColor="#c9a84c" loading={isLoading} darkMode={darkMode} />
                    <MetricCard label="Dari lagu" value={data ? rp(data.song_revenue) : "—"}
                        sub={`${data?.song_requests.total ?? 0} masuk · ${data?.song_requests.dj_approved ?? 0} disetujui`}
                        barPct={data ? Math.round((data.song_revenue / (data.total_revenue || 1)) * 100) : 0}
                        barColor="#1d7a5a" loading={isLoading} darkMode={darkMode} />
                    <MetricCard label="Dari layar" value={data ? rp(data.screen_revenue) : "—"}
                        sub={`${data?.screen_requests.total ?? 0} masuk · ${(data?.screen_requests.paid ?? 0) + (data?.screen_requests.played ?? 0)} terbayar`}
                        barPct={data ? Math.round((data.screen_revenue / (data.total_revenue || 1)) * 100) : 0}
                        barColor="#2357a8" loading={isLoading} darkMode={darkMode} />
                    <MetricCard label="Rata-rata per malam" value={data ? rp(data.avg_per_night) : "—"}
                        sub={`dari ${data?.nights ?? 0} malam`} barPct={70} barColor="#c9a84c" loading={isLoading} darkMode={darkMode} />
                </div>

                {/* Revenue chart + donut */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className={cardClass(darkMode, "sm:col-span-2 p-5")}>
                        <p className={headingClass(darkMode, "text-sm mb-1")}>Pendapatan</p>
                        <p className={mutedClass(darkMode, "text-xs mb-4")}>
                            {groupBy === "weekly" ? "Dikelompokkan per minggu" : groupBy === "monthly" ? "Dikelompokkan per bulan" : "Per malam"}
                            {" · hover untuk detail"}
                        </p>
                        {isLoading ? <Skeleton variant="rectangular" height={140} className="rounded-lg" /> :
                            data?.nightly.length ? <RevenueChart nightly={data.nightly} groupBy={groupBy} darkMode={darkMode} /> :
                                <div className={mutedClass(darkMode, "text-xs text-center py-10")}>Belum ada data</div>}
                    </div>
                    <div className={cardClass(darkMode, "p-5")}>
                        <p className={headingClass(darkMode, "text-sm mb-1")}>Porsi pendapatan</p>
                        <p className={mutedClass(darkMode, "text-xs mb-4")}>Lagu vs layar</p>
                        {isLoading ? <Skeleton variant="circular" width={120} height={120} className="mx-auto" /> :
                            <DonutChart songRev={data?.song_revenue ?? 0} screenRev={data?.screen_revenue ?? 0} darkMode={darkMode} />}
                    </div>
                </div>

                {/* Screen types */}
                <div className="grid grid-cols-1 gap-4">
                    <div className={cardClass(darkMode, "p-5")}>
                        <p className={headingClass(darkMode, "text-sm mb-1")}>Jenis request layar</p>
                        <p className={mutedClass(darkMode, "text-xs mb-4")}>Berdasarkan yang sudah terbayar</p>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {data ? Object.entries(data.screen_types).map(([key, t]) => (
                                <div key={key} className="rounded-lg p-3"
                                    style={tintStyle(TYPE_COLORS[key], darkMode)}>
                                    <p className={bodyClass(darkMode, "text-xs mb-1")}>
                                        <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ background: TYPE_COLORS[key] }} />
                                        {t.name}
                                    </p>
                                    <p className={headingClass(darkMode, "text-xl")}>{t.count}</p>
                                    <p className={mutedClass(darkMode, "text-xs")}>{rp(t.revenue)}</p>
                                </div>
                            )) : Array.from({ length: 4 }).map((_, i) => (
                                <Skeleton key={i} variant="rectangular" height={72} className="rounded-lg" />
                            ))}
                        </div>
                        {data && (
                            <div className="space-y-2">
                                {Object.entries(data.screen_types).map(([key, t]) => (
                                    <div key={key} className="flex items-center gap-2">
                                        <span className={mutedClass(darkMode, "text-xs w-24 truncate")}>{t.name}</span>
                                        <div className={trackClass(darkMode, "flex-1 h-1.5 rounded-full")}>
                                            <div className="h-1.5 rounded-full transition-all duration-500"
                                                style={{ width: `${Math.round((t.count / maxTypeCount) * 100)}%`, background: TYPE_COLORS[key] }} />
                                        </div>
                                        <span className={bodyClass(darkMode, "text-xs w-6 text-right")}>{t.count}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Nightly table */}
                <div className={cardClass(darkMode, "p-5")}>
                    <p className={headingClass(darkMode, "text-sm mb-1")}>Detail per {groupBy === "monthly" ? "bulan" : groupBy === "weekly" ? "minggu" : "malam"}</p>
                    <p className={mutedClass(darkMode, "text-xs mb-4")}>Rincian pendapatan dan request per periode</p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className={classNames("border-b", darkMode ? "border-gray-700" : "border-gray-100")}>
                                    <th className={mutedClass(darkMode, "text-left text-xs font-medium pb-2 pr-4")}>Periode</th>
                                    <th className={mutedClass(darkMode, "text-center text-xs font-medium pb-2 px-2")}>Request lagu</th>
                                    <th className={mutedClass(darkMode, "text-center text-xs font-medium pb-2 px-2")}>Request layar</th>
                                    <th className={mutedClass(darkMode, "text-right text-xs font-medium pb-2 pl-4")}>Pendapatan</th>
                                    <th className={mutedClass(darkMode, "text-right text-xs font-medium pb-2 pl-4")}>Status</th>
                                </tr>
                            </thead>
                            <tbody className={classNames("divide-y", darkMode ? "divide-gray-700" : "divide-gray-50")}>
                                {isLoading ? Array.from({ length: 7 }).map((_, i) => (
                                    <tr key={i}><td colSpan={5} className="py-2"><Skeleton height={28} /></td></tr>
                                )) : (data?.nightly ?? []).slice().reverse().map((n, index) => {
                                    const label = nightlyLabel(n);
                                    const perfPct = Math.round((n.total / maxNightRev) * 100);


                                    return (
                                        <tr key={label || index} className={classNames("transition-colors", darkMode ? "hover:bg-gray-700/30" : "hover:bg-gray-50")}>
                                            <td className={bodyClass(darkMode, "py-2.5 pr-4 text-xs whitespace-nowrap")}>
                                                {fmtLabel(label, groupBy)}
                                            </td>
                                            <td className="py-2.5 px-2 text-center">
                                                <span className={bodyClass(darkMode, "text-xs")}>{n.song_count} masuk</span>
                                                <span className={classNames("mx-1", darkMode ? "text-gray-600" : "text-gray-300")}>·</span>
                                                <span className={classNames("text-xs", darkMode ? "text-green-300" : "text-green-600")}>{n.song_approved} ✓</span>
                                            </td>
                                            <td className="py-2.5 px-2 text-center">
                                                <span className={bodyClass(darkMode, "text-xs")}>{n.screen_count} masuk</span>
                                                <span className={classNames("mx-1", darkMode ? "text-gray-600" : "text-gray-300")}>·</span>
                                                <span className={classNames("text-xs", darkMode ? "text-blue-300" : "text-blue-600")}>{n.screen_paid} ✓</span>
                                            </td>
                                            <td className="py-2.5 pl-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <div className={trackClass(darkMode, "w-16 h-1 rounded-full")}>
                                                        <div className="h-1 rounded-full" style={{ width: `${perfPct}%`, background: "#c9a84c" }} />
                                                    </div>
                                                    <span className={headingClass(darkMode, "text-xs whitespace-nowrap")}>{rp(n.total)}</span>
                                                </div>
                                            </td>
                                            <td className="py-2.5 pl-4 text-right">
                                                <Chip
                                                    label={perfPct >= 70 ? "Ramai" : perfPct >= 40 ? "Normal" : "Sepi"}
                                                    size="small"
                                                    color={perfPct >= 70 ? "success" : perfPct >= 40 ? "warning" : "default"}
                                                    sx={{
                                                        fontSize: 10,
                                                        height: 20,
                                                        ...(darkMode && {
                                                            color: "#f9fafb",
                                                            "&.MuiChip-colorDefault": {
                                                                backgroundColor: "#374151",
                                                            },
                                                        }),
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Song status */}
                <div className={cardClass(darkMode, "p-5")}>
                    <p className={headingClass(darkMode, "text-sm mb-1")}>Status request lagu</p>
                    <p className={mutedClass(darkMode, "text-xs mb-4")}>Dari total {songTotal} request masuk di periode ini</p>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                        {STATUS_CONFIG.map((s) => {
                            const count = data?.song_requests?.[s.key] ?? 0;


                            return (
                                <div key={s.key} className="text-center py-4 px-3 rounded-lg"
                                    style={tintStyle(s.color, darkMode)}>
                                    {isLoading ? <Skeleton width={40} height={32} className="mx-auto" /> :
                                        <p className="text-2xl font-bold" style={{ color: s.color }}>{count}</p>}
                                    <p className={mutedClass(darkMode, "text-xs mt-1 leading-tight")}>{s.label}</p>
                                    <p className="text-xs font-medium mt-0.5" style={{ color: s.color }}>{pct(count, songTotal)}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
