"use client";

import { useState } from "react";

import { getErrorMessage, PvTable } from "@ozanplanviu/planviu-core";

import toast from "react-hot-toast";

import type { GridPaginationModel } from "@mui/x-data-grid";

import { usePromosQuery } from "../../hooks/promos";
import { columns } from "../../columns";
import { MenuMapper } from "../../mapper";
import { useMenuMutation } from "../../hooks/menus";

type TPromoTable = {
    onAdd: () => void;
}

function PromoTable({ onAdd }: TPromoTable) {
    const [pagination, setPagination] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 10
    });

    const { data, isFetching, refetch } = usePromosQuery({
        page: pagination.page + 1,
        pageSize: pagination.pageSize
    });

    const { mutateAsync, isPending } = useMenuMutation({
        onSuccess: () => { },
        onError: () => { }
    });

    return (
        <PvTable
            columns={columns({ type: "promo" })}
            rowCount={data?.data?.count || 0}
            rows={MenuMapper(data?.data?.results || [])}
            loading={isFetching}
            pagination={{
                paginationModel: pagination,
                paginationControl: model => setPagination(model)
            }}
            addProps={{
                onAdd: onAdd
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
            deleteProps={{
                isPending: isPending,
                onDelete: async (id, onClose) => {
                    try {
                        await mutateAsync({
                            method: "DELETE",
                            id: id.toString(),
                        });

                        refetch();
                        toast.success("Success");
                        onClose && onClose();
                    } catch (err) {
                        toast.error(getErrorMessage(err));
                    }
                }
            }}
        />
    )
}

export default PromoTable
