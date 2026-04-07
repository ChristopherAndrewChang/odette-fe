"use client";

import { useState } from "react";

import UserBackButton from "../shared/components/UserBackButton";
import UserContainer from "../shared/components/UserContainer";
import DrawerScreenTakeover from "./components/DrawerScreenTakeover";
import ScreenTakeoverForm from "./components/ScreenTakeoverForm";

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
                        <div
                            onClick={() => {
                                setOpenDrawer(true);
                            }}
                            className="border border-gray-500 py-1 px-4 rounded-lg flex items-center gap-2 mb-4"
                        >
                            <i className="tabler-history text-gray-300 text-lg"></i>
                            <p className="text-gray-300 font-poppins">History</p>
                        </div>
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
