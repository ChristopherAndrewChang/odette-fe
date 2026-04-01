"use client";

import { useState } from "react";

import { Tab, Tabs } from "@mui/material";

import AppLayout from "@/components/internal/AppLayout";

import AddMenuDialog from "./components/AddMenuDialog";
import MenuTable from "./components/table-data/MenuTable";
import PromoTable from "./components/table-data/PromoTable";

function MenusManagement() {
    const [tabValue, setTabValue] = useState<"menu" | "promo">("menu");
    const [openMenuDialog, setOpenMenuDialog] = useState(false);

    const onAddHandler = () => { setOpenMenuDialog(true) };

    const TabComponent = {
        menu: <MenuTable onAdd={onAddHandler} />,
        promo: <PromoTable onAdd={onAddHandler} />
    }

    return (
        <>
            <AddMenuDialog
                key={tabValue}
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
