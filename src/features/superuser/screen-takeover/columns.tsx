import type { GridColDef } from "@mui/x-data-grid";
import { ColumnStatus } from "@ozanplanviu/planviu-core";

export const columns: GridColDef[] = [
    {
        field: "table_number",
        headerName: "Table Number",
        minWidth: 250,
        flex: 1
    },
    {
        field: "request_type",
        headerName: "Request Type",
        minWidth: 250,
        flex: 1
    },
    {
        field: "message",
        headerName: "Message",
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
                status={value}
                color={(value === "approved" ? "success" : (
                    value === "rejected" ? "error" : "secondary"
                ))}
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
        field: "reviewed_at",
        headerName: "Reviewed At",
        minWidth: 250,
        flex: 1
    },
]
