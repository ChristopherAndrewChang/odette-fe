"use client";

import { PvTable } from "@ozanplanviu/planviu-core";

import AppLayout from "@/components/internal/AppLayout";
import { useScreenTakeoverQuery } from "./hooks/screen-takeover";
import { ScreenTakeoverMapper } from "./mapper";
import { columns } from "./columns";
import { useState } from "react";
import { GridPaginationModel } from "@mui/x-data-grid";
import { useFilter } from "@/@pv/hooks/use-filter";
import { Tooltip } from "@mui/material";
import ReviewRequestDialog from "./components/ReviewRequestDialog";

function ScreenTakeoverPage() {
    const [pagination, setPagination] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 10
    });

    const [openApproval, setOpenApproval] = useState<{ cond: boolean; id: string; type: "approved" | "rejected" }>({
        cond: false,
        id: "",
        type: "approved"
    });

    const { filterAppliedCount, filterParams } = useFilter(["status"]);

    const { data, isFetching } = useScreenTakeoverQuery({
        page: pagination?.page + 1,
        ...filterParams
    });

    return (
        <>
            <ReviewRequestDialog
                id={openApproval?.id}
                open={openApproval?.cond}
                type={openApproval?.type}
                onClose={() => {
                    setOpenApproval({
                        cond: false,
                        id: "",
                        type: "approved"
                    });
                }}
            />
            <AppLayout title="Screen Takeover">
                <PvTable
                    columns={columns}
                    rowCount={data?.data?.count || 0}
                    rows={ScreenTakeoverMapper(data?.data?.results || [])}
                    containerProps={{
                        variant: "outlined"
                    }}
                    pagination={{
                        paginationModel: pagination,
                        paginationControl: model => setPagination(model)
                    }}
                    filterProps={{
                        appliedCount: filterAppliedCount,
                        filterItems: [
                            {
                                label: "Status",
                                type: "option",
                                valueKey: "status",
                                options: [
                                    { label: "Pending", value: "pending" },
                                    { label: "Approved", value: "approved" },
                                    { label: "Rejected", value: "rejected" },
                                ]
                            }
                        ]
                    }}
                    loading={isFetching}
                    addProps={{
                        hide: true
                    }}
                    showProps={{ hide: true }}
                    deleteProps={{ hide: true }}
                    editProps={{ hide: true }}
                    actionsSlots={(id) => [
                        {
                            renderAction: (
                                <Tooltip title="Approve" enterDelay={250}>
                                    <div
                                        onClick={() => {
                                            setOpenApproval({
                                                cond: true,
                                                id: id?.toString(),
                                                type: "approved"
                                            });
                                        }}
                                        className="w-6 h-6 flex items-center justify-center rounded-lg cursor-pointer bg-green-500">
                                        <i className="tabler-check text-lg text-white"></i>
                                    </div>
                                </Tooltip>
                            )
                        },
                        {
                            renderAction: (
                                <Tooltip title="Reject" enterDelay={250}>
                                    <div
                                        onClick={() => {
                                            setOpenApproval({
                                                cond: true,
                                                id: id?.toString(),
                                                type: "rejected"
                                            });
                                        }}
                                        className="w-6 h-6 flex items-center justify-center rounded-lg cursor-pointer bg-red-500">
                                        <i className="tabler-x text-lg text-white"></i>
                                    </div>
                                </Tooltip>
                            )
                        }
                    ]}
                />
            </AppLayout>
        </>
    )
}

export default ScreenTakeoverPage;
