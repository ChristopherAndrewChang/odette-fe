import { Button } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";

import ColumnFile from "@/components/internal/ColumnFile";
import ColumnSwitch from "@/components/internal/ColumnSwitch";
import { useMenuMutation } from "./hooks/menus";
import { QUERY_KEY } from "@/data/internal/query-keys";
import { toPageProtocol } from "@/utils/string";

type Tcolumns = {
    type: "menu" | "promo";
    darkMode?: boolean;
}

export const columns = ({ type, darkMode }: Tcolumns): GridColDef[] => [
    {
        field: "title",
        headerName: "Title",
        flex: 1,
        minWidth: 250
    },
    {
        field: "pdf_type",
        headerName: "PDF type",
        minWidth: 120
    },
    {
        field: "order",
        headerName: "Order",
        type: "number",
        minWidth: 100
    },
    {
        field: "file_url",
        headerName: "File",
        flex: 1,
        minWidth: 350,
        renderCell: ({ value }) => <ColumnFile value={value} darkMode={darkMode} />
    },
    {
        field: "cover_url",
        headerName: "Cover",
        minWidth: 130,
        sortable: false,
        renderCell: ({ value }) => value ? (
            <Button
                size="small"
                variant="outlined"
                href={toPageProtocol(value)}
                target="_blank"
                rel="noreferrer"
                onClick={e => e.stopPropagation()}
                startIcon={<i className="tabler-photo text-base"></i>}
            >
                View
            </Button>
        ) : "-"
    },
    {
        field: "is_active",
        headerName: "Active",
        minWidth: 150,
        renderCell: (params) => (
            <ColumnSwitch
                mutation={useMenuMutation}
                params={params}
                queryKey={(type === "menu") ? QUERY_KEY.MENUS.INDEX : QUERY_KEY.MENUS.PROMOS}
            />
        )
    },
    {
        field: "uploaded_at",
        headerName: "Upload At",
        minWidth: 250,
        flex: 1.
    },
]
