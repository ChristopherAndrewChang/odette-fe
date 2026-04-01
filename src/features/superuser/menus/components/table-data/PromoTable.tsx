"use client";

import { getErrorMessage, PvTable } from "@ozanplanviu/planviu-core";

import toast from "react-hot-toast";

import { usePromosQuery } from "../../hooks/promos";
import { columns } from "../../columns";
import { MenuMapper } from "../../mapper";
import { useMenuMutation } from "../../hooks/menus";

type TPromoTable = {
    onAdd: () => void;
}

function PromoTable({ onAdd }: TPromoTable) {
    const { data, isFetching, refetch } = usePromosQuery();

    const { mutateAsync, isPending } = useMenuMutation({
        onSuccess: () => { },
        onError: () => { }
    });

    return (
        <PvTable
            columns={columns({ type: "promo" })}
            rowCount={data?.data?.length || 0}
            rows={MenuMapper(data?.data || [])}
            loading={isFetching}
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
