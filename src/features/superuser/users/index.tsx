"use client";

import { useState } from "react";

import { PvTable } from "@ozanplanviu/planviu-core";

import type { GridPaginationModel } from "@mui/x-data-grid";

import AppLayout from "@/components/internal/AppLayout";
import { columns } from "./columns";
import { useUsersQuery } from "./hooks/users";



import CreateUserDialog from "./components/CreateUserDialog";

function UsersPage() {
    const [openCreateUser, setOpenCreateUser] = useState(false);

    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 10
    });

    const { data, isFetching } = useUsersQuery({
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
    });

    return (
        <>
            <CreateUserDialog
                open={openCreateUser}
                onClose={() => {
                    setOpenCreateUser(false);
                }}
            />
            <AppLayout title="Users Management">
                <PvTable
                    columns={columns}
                    rowCount={data?.data?.count || 0}
                    rows={data?.data?.results || []}
                    loading={isFetching}
                    containerProps={{
                        variant: "outlined"
                    }}
                    pagination={{
                        paginationControl: model => setPaginationModel(model),
                        paginationModel: paginationModel
                    }}
                    showProps={{
                        hide: true
                    }}
                    editProps={{
                        hide: true
                    }}
                    deleteProps={{
                        hide: true
                    }}
                    addProps={{
                        onAdd: () => {
                            setOpenCreateUser(true);
                        }
                    }}
                />
            </AppLayout>
        </>
    )
}

export default UsersPage;
