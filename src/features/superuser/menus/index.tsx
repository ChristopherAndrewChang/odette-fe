"use client";

import { useState } from "react";

import { Tab, Tabs } from "@mui/material";

import AppLayout from "@/components/internal/AppLayout";

import MenuFormDialog from "./components/MenuFormDialog";
import MenuTable from "./components/table-data/MenuTable";
import PromoTable from "./components/table-data/PromoTable";
import type { TMenus } from "./types/menus";

function MenusManagement() {
    const [tabValue, setTabValue] = useState<"menu" | "promo">("menu");
    const [openMenuDialog, setOpenMenuDialog] = useState(false);

    const [editData, setEditData] = useState<TMenus | null>(null);

    const onAddHandler = () => {
        setEditData(null);
        setOpenMenuDialog(true);
    };

    const onEditHandler = (menu: TMenus) => {
        setEditData(menu);
        setOpenMenuDialog(true);
    };

    const TabComponent = {
        menu: <MenuTable onAdd={onAddHandler} onEdit={onEditHandler} />,
        promo: <PromoTable onAdd={onAddHandler} onEdit={onEditHandler} />
    }

    return (
        <>
            <MenuFormDialog
                key={`${tabValue}-${editData?.id ?? "add"}`}
                data={editData}
                open={openMenuDialog}
                onClose={() => {
                    setOpenMenuDialog(false);
                }}
                defaultPdfType={tabValue}
            />

            <AppLayout title="Menu Management">
                <Tabs value={tabValue} onChange={(_, val) => setTabValue(val)}>
                    <Tab label="Menu" value={"menu"} />
                    <Tab label="Promo" value={"promo"} />
                </Tabs>
                {TabComponent[tabValue]}
            </AppLayout>
        </>
    )
}

export default MenusManagement;
