"use client";

import { useState } from "react";

import UserBackButton from "../shared/components/UserBackButton";
import UserContainer from "../shared/components/UserContainer";
import DrawerScreenTakeover from "./components/DrawerScreenTakeover";
import ScreenTakeoverForm from "./components/ScreenTakeoverForm";
import HistoryButton from "../shared/components/HistoryButton";

function ScreenTakeover() {
    // const [tabValue, setTabValue] = useState("list");

    // const TabContent: Record<any, any> = {
    //     list: <ListMyScreenTakeover />,
    //     new: <ScreenTakeoverForm />
    // }

    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <>
            <DrawerScreenTakeover
                open={openDrawer}
                onClose={() => {
                    setOpenDrawer(false);
                }}
            />
            <UserContainer>
                <header className="mb-8">
                    <div className="mb-6 flex justify-between items-center">
                        <UserBackButton href="/user/home" />

                        {/* history button */}
                        <HistoryButton
                            onClick={() => {
                                setOpenDrawer(true);
                            }}
                        />
                    </div>
                    <p className="text-white font-poppins font-semibold text-center text-3xl">Screen Takeover</p>
                </header>

                {/* <Tabs className="rounded-lg mb-8 !bg-gray-300" variant="fullWidth" value={tabValue} onChange={(_, value) => setTabValue(value)}>
                <Tab label="List My Request" value={"list"} />
                <Tab label="New Request" value={"new"} />
            </Tabs> */}

                {/* {TabContent[tabValue]} */}
                <ScreenTakeoverForm />
            </UserContainer>
        </>
    )
}

export default ScreenTakeover;
