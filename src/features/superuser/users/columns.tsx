import type { GridColDef } from "@mui/x-data-grid";

import { ColumnStatus } from "@ozanplanviu/planviu-core";

import ColumnSwitch from "@/components/internal/ColumnSwitch";
import { useUsersMutation } from "./hooks/users";
import { QUERY_KEY } from "@/data/internal/query-keys";

export const columns: GridColDef[] = [
    {
        field: "username",
        headerName: "Username",
        flex: 1,
        minWidth: 150
    },
    {
        field: "email",
        headerName: "Email",
        flex: 1,
        minWidth: 200
    },
    {
        field: "role",
        headerName: "Role",
        flex: 1,
        minWidth: 150,
        renderCell: ({ value }) => (
            <ColumnStatus
                status={value}
                color={(value === "admin") ? "info" : (value === "dj") ? "success" : "secondary"}
            />
        )
    },
    {
        field: "is_active",
        headerName: "Is Active",
        minWidth: 150,
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
