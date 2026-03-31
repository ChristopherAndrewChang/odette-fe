"use client";

import { useState } from "react";

import { Button, Tooltip, Typography } from "@mui/material";
import { PvTable } from "@ozanplanviu/planviu-core";

import type { GridPaginationModel } from "@mui/x-data-grid";

import { useTablesQuery } from "./hooks/tables";
import { TablesMapper } from "./mapper";
import { columns } from "./columns";
import CloseNightDialog from "./components/CloseNightDialog";
import OpenNightDialog from "./components/OpenNightDialog";
import CreateTableDialog from "./components/create/CreateTableDialog";
import GenerateSingleQRDialog from "./components/GenerateSingleQRDialog";
import { useDebounce } from "@/@pv/hooks/use-debounce";

function TablesManagement() {
    const [openCloseNightDialog, setOpenCloseNightDialog] = useState(false);
    const [openOpenNightDialog, setOpenOpenNightDialog] = useState(false);

    const [tableModifyDialog, setTableModifyDialog] = useState<{ cond: boolean; id: number; }>({
        cond: false,
        id: 0
    });

    const [search, setSearch] = useState("");
    const searchDebounced = useDebounce(search, 500);

    const [pagination, setPagination] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 10
    });

    const [qrTable, setQrTable] = useState<{ cond: boolean; id: number; table: number; }>({
        cond: false,
        id: 0,
        table: 0
    });

    const { data, isFetching } = useTablesQuery({
        page: pagination.page + 1,
        pageSize: pagination.pageSize,
        search: searchDebounced
    });

    const TablesData = data?.data?.results || [];

    return (
        <>
            {/* TODO: Buat Dialog Custom, karena dialog yang sekarang aneh wkwk */}
            <CloseNightDialog
                open={openCloseNightDialog}
                onClose={() => {
                    setOpenCloseNightDialog(false);
                }}
            />
            <OpenNightDialog
                open={openOpenNightDialog}
                onClose={() => {
                    setOpenOpenNightDialog(false);
                }}
            />
            <GenerateSingleQRDialog
                onClose={() => {
                    setQrTable({
                        cond: false,
                        id: 0,
                        table: 0
                    });
                }}
                open={qrTable.cond}
                data={{
                    id: qrTable.id,
                    tableNumber: qrTable.table
                }}
            />
            <CreateTableDialog
                open={tableModifyDialog.cond}
                onClose={() => {
                    setTableModifyDialog({
                        cond: false,
                        id: 0
                    });
                }}
            />
            <div className='bg-white p-6 rounded-lg border'>
                <Typography className="text-xl mb-6 font-poppins text-black">Table Management</Typography>
                <PvTable
                    loading={isFetching}
                    columns={columns || []}
                    rowCount={data?.data?.count || 0}
                    rows={TablesMapper(TablesData)}
                    containerProps={{
                        variant: "outlined"
                    }}
                    pagination={{
                        paginationModel: pagination,
                        paginationControl: (model) => setPagination(model)
                    }}
                    onSearch={value => setSearch(value)}
                    showProps={{
                        hide: true
                    }}
                    addProps={{
                        onAdd: () => {
                            setTableModifyDialog({
                                cond: true,
                                id: 0
                            });
                        }
                    }}
                    actionsSlots={(id, row) => {
                        const rowData = row as ReturnType<typeof TablesMapper>[number];

                        return [
                            {
                                renderAction: (
                                    <Tooltip title="Generate QR" enterDelay={200}>
                                        <div
                                            onClick={() => {
                                                setQrTable({
                                                    cond: true,
                                                    id: Number(id),
                                                    table: Number(rowData?.number)
                                                });
                                            }}
                                            className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center cursor-pointer">
                                            <i className="tabler-qrcode text-base text-white"></i>
                                        </div>
                                    </Tooltip>
                                )
                            }
                        ]
                    }}
                    additionalMenu={[
                        {
                            renderMenu: (
                                <Button
                                    onClick={() => {
                                        setOpenOpenNightDialog(true);
                                    }}
                                    variant="outlined"
                                    startIcon={<i className="tabler-lock-open"></i>}
                                >Open Night</Button>
                            )
                        },
                        {
                            renderMenu: (
                                <Button
                                    variant="outlined"
                                    startIcon={<i className="tabler-lock"></i>}
                                    onClick={() => {
                                        setOpenCloseNightDialog(true);
                                    }}
                                >Close Night</Button>
                            )
                        }
                    ]}
                />
            </div>
        </>
    )
}

export default TablesManagement; 
