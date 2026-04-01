import type { GridColDef } from "@mui/x-data-grid";

import ColumnFile from "@/components/internal/ColumnFile";
import ColumnSwitch from "@/components/internal/ColumnSwitch";
import { useMenuMutation } from "./hooks/menus";
import { QUERY_KEY } from "@/data/internal/query-keys";

type Tcolumns = {
    type: "menu" | "promo";
}

export const columns = ({ type }: Tcolumns): GridColDef[] => [
    {
        field: "pdf_type",
        headerName: "PDF type",
        minWidth: 250
    },
    {
        field: "file_url",
        headerName: "File",
        flex: 1,
        minWidth: 350,
        renderCell: ({ value }) => <ColumnFile value={value} />
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
