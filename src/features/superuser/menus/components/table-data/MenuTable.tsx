"use client";

import { useState } from "react";

import { getErrorMessage, PvTable } from "@ozanplanviu/planviu-core";

import type { GridPaginationModel } from "@mui/x-data-grid";

import toast from "react-hot-toast";

import { useColorScheme } from "@mui/material";

import { MenuMapper } from "../../mapper";
import { useMenuMutation, useMenusQuery } from "../../hooks/menus";
import { columns } from "../../columns";
import type { TMenus } from "../../types/menus";

type TMenuTable = {
    onAdd: () => void;
    onEdit: (menu: TMenus) => void;
}

function MenuTable({ onAdd, onEdit }: TMenuTable) {
    const { mode } = useColorScheme();

    const [pagination, setPagination] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 10
    });

    const { data, isFetching, refetch } = useMenusQuery({
        page: pagination.page + 1,
        page_size: pagination.pageSize
    });

    const { mutateAsync, isPending } = useMenuMutation({
        onSuccess: () => { },
        onError: () => { }
    });

    return (
        <PvTable
            columns={columns({
                type: "menu",
                darkMode: mode === "dark"
            })}
            rowCount={data?.data?.count || 0}
            rows={MenuMapper(data?.data?.results || []) || []}
            darkMode={true}
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
                // use the raw api row, the table row has a formatted uploaded_at
                onEdit: (id) => {
                    const menu = data?.data?.results?.find(item => String(item.id) === String(id));

                    if (menu) onEdit(menu);
                }
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
