"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { Dialog, DialogContent, DialogTitle, Tab, Tabs } from "@mui/material";

import SingleCreation from "./SingleCreation";
import BulkCreation from "./BulkCreation";

type TCreateTableDialog = {
    open: boolean;
    onClose: () => void;
    id?: number;
}

function CreateTableDialog({ onClose, open }: TCreateTableDialog) {
    const [tabValue, setTabValue] = useState("single");

    const TabComponent: Record<string, ReactNode> = {
        single: (
            <SingleCreation
                onClose={(clearForm) => {
                    onClose();
                    clearForm();
                }}
            />
        ),
        bulk: (
            <BulkCreation
                onClose={(clearForm) => {
                    onClose();
                    clearForm();
                }}
            />
        )
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Create Table</DialogTitle>
            <DialogContent>
                <Tabs
                    onChange={(_, value) => setTabValue(value)}
                    value={tabValue}
                    className="mb-4"
                >
                    <Tab label="Single" value={"single"} />
                    <Tab label="Bulk" value={"bulk"} />
                </Tabs>

                {TabComponent[tabValue]}
            </DialogContent>
        </Dialog>
    )
}

export default CreateTableDialog
