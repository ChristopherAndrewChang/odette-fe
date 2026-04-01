"use client";

import { useState } from "react";

import { getErrorMessage, PvTable } from "@ozanplanviu/planviu-core";

import type { GridPaginationModel } from "@mui/x-data-grid";

import toast from "react-hot-toast";

import { MenuMapper } from "../../mapper";
import { useMenuMutation, useMenusQuery } from "../../hooks/menus";
import { columns } from "../../columns";

type TMenuTable = {
    onAdd: () => void;
}

function MenuTable({ onAdd }: TMenuTable) {
    const [pagination, setPagination] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 10
    });

    const { data, isFetching, refetch } = useMenusQuery();

    const { mutateAsync, isPending } = useMenuMutation({
        onSuccess: () => { },
        onError: () => { }
    });

    return (
        <PvTable
            columns={columns({ type: "menu" })}
            rowCount={data?.data?.length || 0}
            rows={MenuMapper(data?.data || []) || []}
            loading={isFetching}
            pagination={{
                paginationModel: pagination,
                paginationControl: model => setPagination(model)
            }}
            containerProps={{
                variant: "outlined"
            }}
            showProps={{
                hide: true
            }}
            editProps={{
                hide: true
            }}
            addProps={{
                onAdd: onAdd
            }}
            deleteProps={{
                onDelete: async (id, onClose) => {
                    try {
                        await mutateAsync({
                            method: "DELETE",
                            id: id?.toString()
                        });

                        refetch();
                        onClose && onClose();
                        toast.success("Success");
                    } catch (err) {
                        toast.error(getErrorMessage(err));
                    }
                },
                isPending: isPending
            }}
        />
    )
}

export default MenuTable
