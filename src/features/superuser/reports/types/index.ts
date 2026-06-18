export interface NightlyData {
    date?: string;        // "2026-06-05"
    label?: string;       // "2026-06-05" | "2026-W23" | "2026-06"
    song_count: number;
    screen_count: number;
    song_approved: number;
    screen_paid: number;
    song_revenue: number;
    screen_revenue: number;
    total: number;
}

export interface SongStatuses {
    total: number;
    dj_approved: number;
    dj_rejected: number;
    admin_approved: number;
    admin_rejected: number;
    pending: number;
    cancelled: number;
}

export interface ScreenStatuses {
    total: number;
    paid: number;
    played: number;
    rejected: number;
    pending_review: number;
}

export interface ScreenTypeData {
    name: string;
    count: number;
    revenue: number;
}

export interface TopSong {
    song_title: string;
    artist: string;
    count: number;
}

export interface ReportSummary {
    period: string;
    nights: number;
    group_by?: 'daily' | 'weekly' | 'monthly';
    total_revenue: number;
    song_revenue: number;
    screen_revenue: number;
    avg_per_night: number;
    song_requests: SongStatuses;
    screen_requests: ScreenStatuses;
    screen_types: Record<string, ScreenTypeData>;
    top_songs: TopSong[];
    nightly: NightlyData[];
    best_night: NightlyData | null;
}

export type ReportPeriod = '7d' | '14d' | '30d' | '180d' | '365d';

export type ReportFilter =
    | { type: 'period'; period: ReportPeriod }
    | { type: 'date'; date: string };  // YYYY-MM-DD session date
