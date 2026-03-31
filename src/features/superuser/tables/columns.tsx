import type { GridColDef } from "@mui/x-data-grid";
import { ColumnStatus } from "@ozanplanviu/planviu-core";

export const columns: GridColDef[] = [
    {
        field: "number",
        headerName: "Number",
        minWidth: 250,
        flex: 1
    },
    {
        field: "is_open",
        headerName: "Is Open",
        minWidth: 200,
        renderCell: ({ value }) => <ColumnStatus status={value} />
    },
    {
        field: "is_active",
        headerName: "Is Active",
        minWidth: 200,
        renderCell: ({ value }) => <ColumnStatus status={value} />
    },
    {
        field: "active_sessions",
        headerName: "Active Session",
        minWidth: 200,
        renderCell: ({ value }) => <ColumnStatus status={value} />
    },
    {
        field: "created_at",
        headerName: "Created",
        minWidth: 250,
        flex: 1
    },
]
