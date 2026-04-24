export type TMySongReq = {
    id: number;
    song_title: string;
    artist: string;
    donation_amount: string;
    status: string;
    status_display: string;
    customer_name: string;
    table_number: string;
    admin_reviewed_at: string;
    dj_reviewed_at: null | string;
    is_billed: boolean;
    billed_at: null | string;
    created_at: string;
}
