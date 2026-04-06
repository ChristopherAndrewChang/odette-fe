import type { GridColDef } from "@mui/x-data-grid";

import ColumnSwitch from "@/components/internal/ColumnSwitch";
import { useUsersMutation } from "./hooks/users";
import { QUERY_KEY } from "@/data/internal/query-keys";

export const columns: GridColDef[] = [
    {
        field: "username",
        headerName: "Username",
        flex: 1,
        minWidth: 250
    },
    {
        field: "email",
        headerName: "Email",
        flex: 1,
        minWidth: 250
    },
    {
        field: "role",
        headerName: "Role",
        flex: 1,
        minWidth: 250
    },
    {
        field: "is_active",
        headerName: "Is Active",
        flex: 1,
        minWidth: 250,
        renderCell: (params) => {
            return (
                <ColumnSwitch
                    mutation={useUsersMutation}
                    params={params}
                    queryKey={QUERY_KEY.USERS.INDEX}
                />
            )
        }
    }
];
