"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";

import { Button, Card, Divider, Fab } from "@mui/material";

import type { GridColDef, GridPaginationModel, GridRenderCellParams, GridRowId, GridTreeNodeWithRender } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";

import CustomTextField from "@/@core/components/mui/TextField";
import DeleteDialog from "./dialogs/DeleteDialog";
import ColumnAction from "./ColumnAction";
import BooleanFilter from "./filter/BooleanFilter";
import OptionFilter from "./filter/OptionFilter";

type TTableCustomized = {
    columns: GridColDef[];
    rows: any[];
    rowCount: number;
    loading?: boolean;
    onSearch?: (value: string) => void;
    onExport?: () => void;
    onImport?: () => void;
    containerProps?: {
        variant?: "elevation" | "outlined";
    };
    pagination?: {
        paginationModel?: GridPaginationModel;
        paginationControl?: (model: GridPaginationModel) => void;
    }
    sortProps?: {
        show: boolean;
    },
    addProps?: {
        hide?: boolean;
        redirectUrl?: string;
        onAdd?: () => void;
        buttonLabel?: string;
    };
    deleteProps?: {
        hide?: boolean;
        onDelete?: (id: GridRowId, onClose?: () => void) => void;
        isPending?: boolean;
    };
    editProps?: {
        hide?: boolean;
        redirectUrl?: (id: string) => string;
        onEdit?: () => void;
    };
    showProps?: {
        hide?: boolean;
        redirectUrl?: (id: string) => string;
        onShow?: () => void;
    };
    filterProps?: {
        autoShow?: boolean;
        filterItems?: {
            type: "boolean" | "option" | "custom";
            valueKey: string;
            label: string;
            options?: { label: string; value: string; }[];
            loadingOptions?: boolean;
            renderFilter?: ReactNode;
            hide?: boolean;

            onSearch?: (value?: string) => void;
            useServerSearchOnly?: boolean;
            optionMessage?: string;
        }[],
        appliedCount: number;
    },
    additionalMenu?: {
        renderMenu: ReactNode;
    }[],
    additionalActions?: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
        renderAction: ReactNode
    }[];
};

function TableCustomized({
    columns,
    rows,
    onExport,
    onImport,
    onSearch,
    addProps,
    deleteProps,
    editProps,
    showProps,
    rowCount,
    pagination,
    loading,
    containerProps,
    filterProps,
    additionalMenu,
    additionalActions,
    sortProps
}: TTableCustomized) {
    const router = useRouter();
    const pathname = usePathname();

    const [openFilter, setOpenFilter] = useState(false);

    const [deleteState, setDeleteState] = useState<{
        cond: boolean;
        id: GridRowId
    }>({
        cond: false,
        id: ""
    });

    const generateColumns = (): GridColDef[] => {
        if (showProps?.hide && deleteProps?.hide && editProps?.hide && !additionalActions) {
            return columns;
        }

        return ([
            ...columns,
            {
                field: "actions",
                headerName: "",
                minWidth: 120,
                renderCell: (props) => {
                    const id = props.id;

                    return (
                        <ColumnAction
                            gridParams={props}
                            additionalActions={additionalActions}
                            editProps={{
                                url: editProps?.redirectUrl && editProps?.redirectUrl(String(id)),
                                onEdit: editProps?.onEdit,
                                hide: editProps?.hide
                            }}
                            deleteProps={{
                                onDelete: () => {
                                    setDeleteState({
                                        cond: true,
                                        id: id
                                    });
                                },
                                hide: deleteProps?.hide
                            }}
                            showProps={{
                                hide: showProps?.hide,
                                onShow: showProps?.onShow,
                                url: showProps?.redirectUrl && showProps?.redirectUrl(String(id))
                            }}
                        />
                    )
                }
            }
        ])
    }

    return (
        <>
            <DeleteDialog
                state={deleteState}
                onClose={() => {
                    setDeleteState({
                        cond: false,
                        id: ""
                    })
                }}
                onDelete={deleteProps?.onDelete || (() => { })}
                deletePending={!!deleteProps?.isPending}
            />
            <Card variant={containerProps?.variant}>
                <section className='flex flex-col sm:flex-row justify-end gap-2 p-4 md:p-6'>
                    {onSearch && (
                        <CustomTextField
                            className="order-2 sm:order-1 sm:flex-1 md:flex-none"
                            placeholder='Search'
                            onChange={(e) => {
                                onSearch(e.target.value)
                            }}
                        />
                    )}

                    <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 order-1 sm:order-2">
                        {additionalMenu?.map((menu) => (
                            <>
                                {menu.renderMenu}
                            </>
                        ))}

                        {onImport && (
                            <Button onClick={onImport} variant='outlined' startIcon={<i className='tabler-file-import'></i>}>Import</Button>
                        )}

                        {onExport && (
                            <Button onClick={onExport} variant='outlined' startIcon={<i className='tabler-file-export'></i>}>Export</Button>
                        )}

                        {sortProps?.show ? (
                            <Button variant="outlined" startIcon={<i className="tabler-arrows-sort"></i>}>Sort</Button>
                        ) : null}

                        {filterProps?.filterItems?.length && !filterProps.autoShow && (
                            <Button
                                onClick={() => {
                                    setOpenFilter(prev => !prev)
                                }}
                                className="flex items-center"
                                variant="outlined"
                                startIcon={<i className="tabler-filter"></i>}
                                endIcon={filterProps.appliedCount ? (
                                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-sm">
                                        {filterProps.appliedCount}
                                    </div>
                                ) : null}
                            >
                                {openFilter ? "Close Filter" : "Filter"}
                            </Button>
                        )}

                        {!addProps?.hide && (
                            addProps?.redirectUrl ? (
                                <Link href={addProps.redirectUrl} className="hidden md:flex">
                                    <Button variant='contained' startIcon={<i className='tabler-plus'></i>}>{!!addProps?.buttonLabel ? addProps.buttonLabel : "Add New"}</Button>
                                </Link>
                            ) : (
                                <Button variant='contained' className="hidden md:flex" onClick={addProps?.onAdd} startIcon={<i className='tabler-plus'></i>}>
                                    {!!addProps?.buttonLabel ? addProps.buttonLabel : "Add New"}
                                </Button>
                            )
                        )}
                    </div>
                </section>

                {/* filter */}
                {(openFilter && filterProps?.filterItems?.length) || (filterProps?.autoShow && filterProps?.filterItems?.length) ? (
                    <>
                        <Divider />
                        <section className="px-4 py-4">
                            {filterProps.appliedCount > 0 && (
                                <div className="flex items-center gap-2 mb-4">
                                    {/* <Typography className="font-medium mb-2 text-black">Filter</Typography> */}
                                    <Button variant="tonal" color="secondary" size="small" onClick={() => {
                                        router.push(pathname);
                                    }}>Reset</Button>
                                </div>
                            )}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                                {filterProps.filterItems.map(_filter => (
                                    _filter.type === "boolean" && !_filter.hide ? (
                                        <BooleanFilter key={_filter.valueKey} label={_filter.label} valueKey={_filter.valueKey} />
                                    ) : _filter.type === "option" && !_filter.hide ? (
                                        <OptionFilter key={_filter.valueKey} label={_filter.label} options={_filter?.options || []} valueKey={_filter.valueKey} loading={_filter.loadingOptions} onSearch={_filter.onSearch} useServerSearchOnly={_filter.useServerSearchOnly} optionMessage={_filter.optionMessage} />
                                    ) : (
                                        _filter.renderFilter
                                    )
                                ))}
                            </div>
                        </section>
                    </>
                ) : null}
                {/* end of filter */}

                <DataGrid
                    columns={generateColumns()}
                    rows={rows}
                    rowCount={rowCount}
                    loading={loading}
                    disableColumnSorting
                    disableRowSelectionOnClick
                    disableColumnSelector
                    disableColumnFilter
                    disableColumnMenu
                    className="text-sm"
                    slotProps={{
                        loadingOverlay: {
                            variant: "skeleton"
                        }
                    }}
                    pagination
                    paginationMode="server"
                    paginationModel={pagination?.paginationModel}
                    onPaginationModelChange={(model) => pagination?.paginationControl ? pagination.paginationControl(model) : () => { }}
                    sx={{
                        backgroundColor: "var(--mui-background-paper)",
                        borderRadius: 0,
                        '& .MuiDataGrid-columnHeader': {
                            backgroundColor: (theme) => theme.palette.common.white
                        },
                        '& .MuiDataGrid-columnHeaders .MuiDataGrid-filler': {
                            backgroundColor: (theme) => theme.palette.common.white,
                            textTransform: "capitalize"
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            textTransform: "uppercase"
                        },
                        '& .MuiDataGrid-footerContainer': {
                            backgroundColor: (theme) => theme.palette.common.white,
                        },
                        '& .MuiDataGrid-overlayWrapperInner .MuiDataGrid-overlay': {
                            backgroundColor: (theme) => theme.palette.common.white
                        }
                    }}
                />
            </Card>

            {!addProps?.hide && (
                addProps?.redirectUrl ? (
                    <Link href={addProps.redirectUrl}>
                        <Fab color="primary" className="md:hidden fixed bottom-8 right-4">
                            <i className="tabler-plus"></i>
                        </Fab>
                    </Link>
                ) : (
                    <Fab color="primary" className="md:hidden fixed bottom-8 right-4" onClick={addProps?.onAdd}>
                        <i className="tabler-plus"></i>
                    </Fab>
                )
            )}
        </>
    )
}

export default TableCustomized;
