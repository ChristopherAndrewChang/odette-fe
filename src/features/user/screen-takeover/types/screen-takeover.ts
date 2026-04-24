export type TScreenTakeOver = {
    id: number;
    request_type: string;
    message: string;
    media_file: null;
    donation_amount: string;
    status: string;
    customer_name: string;
    table_number: number;
    reviewed_at: null;
    created_at: string;
    payment_link: string;
}

export type TScreenTakeOverResponseMutation = {
    payment_link: string | null;
    request_type: string;
}
