"use client";

import { useState } from "react";

import { Button, Dialog, Divider, useColorScheme } from "@mui/material";

import classNames from "classnames";

import KanbanContainer from "../KanbanContainer";
import WithDJ from "../withDj";
import DjApproved from "../djApproved";
import PendingPage from "../pending";
import SessionFilter from "@/features/superuser/shared/components/filter/SessionFilter";

type TFullScreenMusicRequest = {
    open: boolean;
    onClose: () => void;
}

type TActions = {
    cardType: "compact" | "normal";
    showSessionFilter: boolean;
}

function FullScreenMusicRequest({ onClose, open }: TFullScreenMusicRequest) {
    const { mode } = useColorScheme();
    const [actions, setActions] = useState<TActions>({ cardType: "normal", showSessionFilter: false });

    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <main className="flex">
                <section className={classNames("p-2 bg-gray-50 border-r border-gray-100 flex flex-col gap-1 max-h-[100vh] overflow-auto", {
                    "!bg-gray-800 !border-gray-700": mode === "dark"
                })}>
                    <Button onClick={onClose} variant="outlined" color="secondary">
                        <i className="tabler-x"></i>
                    </Button>
                    <Divider className="my-2" />

                    {/* action buttons */}
                    <Button
                        onClick={() => {
                            setActions(prev => ({
                                ...prev,
                                showSessionFilter: !prev.showSessionFilter
                            }));
                        }}
                        variant={actions.showSessionFilter ? "contained" : "outlined"}
                        color={actions.showSessionFilter ? "success" : "secondary"}
                    >
                        <i className="tabler-calendar"></i>
                    </Button>
                    <Button
                        onClick={() => {
                            setActions(prev => ({
                                ...prev,
                                cardType: prev.cardType === "compact" ? "normal" : "compact"
                            }))
                        }}
                        variant={actions.cardType === "compact" ? "contained" : "outlined"}
                        color={actions.cardType === "compact" ? "success" : "secondary"}
                    >
                        <i className="tabler-spacing-vertical"></i>
                    </Button>
                </section>

                <section className="flex flex-1 flex-col max-h-[100vh] overflow-y-auto">
                    {actions.showSessionFilter ? (
                        <div className="p-4">
                            <SessionFilter
                                darkMode={mode === "dark"}
                            />
                        </div>
                    ) : null}

                    <KanbanContainer
                        dj={<WithDJ compact={actions.cardType === "compact"} />}
                        djApproveds={<DjApproved compact={actions.cardType === "compact"} />}
                        pending={<PendingPage compact={actions.cardType === "compact"} />}
                    />
                </section>
            </main>
        </Dialog>
    )
}

export default FullScreenMusicRequest;
