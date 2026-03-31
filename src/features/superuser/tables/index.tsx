"use client";

import { useState } from "react";

import { Button, Typography } from "@mui/material";
import { PvTable } from "@ozanplanviu/planviu-core";

import { useTablesQuery } from "./hooks/tables";
import { TablesMapper } from "./mapper";
import { columns } from "./columns";
import CloseNightDialog from "./components/CloseNightDialog";
import OpenNightDialog from "./components/OpenNightDialog";
import CreateTableDialog from "./components/create/CreateTableDialog";

function TablesManagement() {
    const [openCloseNightDialog, setOpenCloseNightDialog] = useState(false);
    const [openOpenNightDialog, setOpenOpenNightDialog] = useState(false);

    const [tableModifyDialog, setTableModifyDialog] = useState<{ cond: boolean; id: number; }>({
        cond: false,
        id: 0
    })

    const { data, isFetching } = useTablesQuery();
    const TablesData = data?.data || [];

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
                    rowCount={TablesData?.length || 0}
                    rows={TablesMapper(TablesData)}
                    containerProps={{
                        variant: "outlined"
                    }}
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
