"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

import { Tab, Tabs } from "@mui/material";

import { useQueryParams } from "@ozanplanviu/planviu-core";

import AppLayout from "@/components/internal/AppLayout";
import GeneralSetting from "./components/general";
import MinimumDonationSetting from "./components/minimum-donation";
import BadwordsSettings from "./components/badwords";

const SETTINGS_TAB: { label: string; value: string; }[] = [
    { label: "General Settings", value: "general" },
    { label: "Donation", value: "donation" },
    { label: "Bad Words", value: "badwords" }
]

const TabComponent: Record<string, ReactNode> = {
    general: <GeneralSetting />,
    donation: <MinimumDonationSetting />,
    badwords: <BadwordsSettings />
}

function SuSettingsPage() {
    const { getParam, updateParams } = useQueryParams();

    useEffect(() => {
        if (!getParam("activeTab")) {
            updateParams({
                remove: ["activeTab"],
                add: {
                    activeTab: "general"
                }
            });
        }
    }, []);

    return (
        <AppLayout title="Settings">
            <Tabs
                value={getParam("activeTab")}
                className="mb-4"
                onChange={(_, value) => {
                    updateParams({
                        remove: ["activeTab"],
                        add: {
                            activeTab: value
                        }
                    });
                }}
            >
                {SETTINGS_TAB.map(setting => (
                    <Tab
                        key={setting.value}
                        value={setting.value}
                        label={setting.label}
                    />
                ))}
            </Tabs>

            {TabComponent[getParam("activeTab") || "general"]}
        </AppLayout>
    )
}

export default SuSettingsPage;
