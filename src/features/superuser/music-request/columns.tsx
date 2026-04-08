import type { GridColDef } from "@mui/x-data-grid";
import { ColumnStatus } from "@ozanplanviu/planviu-core";

export const columns: GridColDef[] = [
    {
        field: "table_number",
        headerName: "Table Number",
        minWidth: 150,
        flex: 1,
    },
    {
        field: "song_title",
        headerName: "Song Title",
        minWidth: 250,
        flex: 1
    },
    {
        field: "artist",
        headerName: "Artist",
        minWidth: 250,
        flex: 1
    },
    {
        field: "donation_amount",
        headerName: "Donation Amount",
        minWidth: 250,
        flex: 1
    },
    {
        field: "status",
        headerName: "Status",
        minWidth: 250,
        flex: 1,
        renderCell: ({ value }) => (
            <ColumnStatus
                color={(value === "dj_approved" || value === "admin_approved") ? "success" : (
                    ((value === "dj_rejected" || value === "admin_rejected") ? "error" : "secondary")
                )}
                status={value}
            />
        )
    },
    {
        field: "customer_name",
        headerName: "Customer Name",
        minWidth: 250,
        flex: 1
    },
    {
        field: "created_at",
        headerName: "Created At",
        minWidth: 250,
        flex: 1
    },
    {
        field: "admin_reviewed_at",
        headerName: "Admin Reviewed At",
        minWidth: 250,
        flex: 1
    },
    {
        field: "dj_reviewed_at",
        headerName: "DJ Reviewed At",
        minWidth: 250,
        flex: 1
    },
]
