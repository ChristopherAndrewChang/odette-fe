"use client";

import { useState } from "react";

import { Tab, Tabs } from "@mui/material";

import UserBackButton from "../shared/components/UserBackButton";
import UserContainer from "../shared/components/UserContainer";
import ScreenTakeoverForm from "./components/ScreenTakeoverForm";
import ListMyScreenTakeover from "./components/ListMyScreenTakeover";

function ScreenTakeover() {
    const [tabValue, setTabValue] = useState("list");

    const TabContent: Record<any, any> = {
        list: <ListMyScreenTakeover />,
        new: <ScreenTakeoverForm />
    }

    return (
        <UserContainer>
            <header className="mb-8">
                <div className="mb-6">
                    <UserBackButton href="/user/home" />
                </div>
                <p className="text-white font-poppins font-semibold text-center text-3xl">Screen Takeover</p>
            </header>

            <Tabs className="rounded-lg mb-8 !bg-gray-300" variant="fullWidth" value={tabValue} onChange={(_, value) => setTabValue(value)}>
                <Tab label="List My Request" value={"list"} />
                <Tab label="New Request" value={"new"} />
            </Tabs>

            {TabContent[tabValue]}
        </UserContainer>
    )
}

export default ScreenTakeover;
