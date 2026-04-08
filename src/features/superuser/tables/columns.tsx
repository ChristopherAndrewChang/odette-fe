import type { GridColDef } from "@mui/x-data-grid";
import { ColumnStatus } from "@ozanplanviu/planviu-core";

export const columns: GridColDef[] = [
    {
        field: "number",
        headerName: "Number",
        minWidth: 150,
        flex: 1,
        renderCell: ({ value }) => (
            <div className="h-full flex items-center">
                <p className="text-xl font-semibold">Table {value}</p>
            </div>
        )
    },
    {
        field: "is_open",
        headerName: "Is Open",
        minWidth: 150,
        renderCell: ({ value }) => <ColumnStatus status={value} />
    },
    {
        field: "is_active",
        headerName: "Is Active",
        minWidth: 150,
        renderCell: ({ value }) => <ColumnStatus status={value} />
    },
    {
        field: "active_sessions",
        headerName: "Active Session",
        minWidth: 150,
        renderCell: ({ value }) => <ColumnStatus status={value} />
    },
    {
        field: "created_at",
        headerName: "Created",
        minWidth: 200,
        flex: 1
    },
]
