"use client";

import type { ReactNode } from "react";

import React from "react";

import Link from "next/link";

import type { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";

type TColumnAction = {
    gridParams: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
    deleteProps?: {
        hide?: boolean;
        onDelete?: () => void;
    };
    editProps?: {
        hide?: boolean;
        url?: string;
        onEdit?: (id: string) => void;
    };
    showProps?: {
        hide?: boolean;
        url?: string;
        onShow?: () => void;
    },
    additionalActions?: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
        renderAction: ReactNode
    }[];
};

function ColumnAction({ deleteProps, editProps, showProps, additionalActions, gridParams }: TColumnAction) {
    return (
        <div className="flex items-center h-full gap-2">
            {additionalActions && additionalActions(gridParams)?.map((_action, i) => (
                <React.Fragment key={i}>
                    {_action.renderAction}
                </React.Fragment>
            ))}
            {!showProps?.hide && (
                showProps?.url ? (
                    <Link href={showProps?.url} className="bg-warning h-6 w-6 rounded-lg flex items-center justify-center cursor-pointer">
                        <i className="tabler-eye text-sm text-white"></i>
                    </Link>
                ) : (
                    <div onClick={showProps?.onShow} className="bg-warning h-6 w-6 rounded-lg flex items-center justify-center cursor-pointer">
                        <i className="tabler-eye text-sm text-white"></i>
                    </div>
                )
            )}

            {!editProps?.hide && (
                editProps?.url ? (
                    <Link href={editProps?.url} className="bg-info h-6 w-6 rounded-lg flex items-center justify-center cursor-pointer">
                        <i className="tabler-edit text-sm text-white"></i>
                    </Link>
                ) : (
                    <div className="bg-info h-6 w-6 rounded-lg flex items-center justify-center cursor-pointer">
                        <i className="tabler-edit text-sm text-white"></i>
                    </div>
                )
            )}

            {!deleteProps?.hide && (
                <div onClick={deleteProps?.onDelete} className="bg-error h-6 w-6 rounded-lg flex items-center justify-center cursor-pointer">
                    <i className="tabler-trash text-sm text-white"></i>
                </div>
            )}

        </div>
    )
}

export default ColumnAction;
