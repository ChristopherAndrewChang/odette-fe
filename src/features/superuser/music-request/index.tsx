"use client";

import { useState } from "react";

import { PvTable, useQueryParams } from "@ozanplanviu/planviu-core";

import type { GridPaginationModel } from "@mui/x-data-grid";

import { Tooltip, Typography } from "@mui/material";

import classNames from "classnames";

import AppLayout from "@/components/internal/AppLayout";
import { useAllSongRequestsQuery } from "./hooks/song-request";
import { columns } from "./columns";
import { MusicRequestMapper } from "./mapper";
import { useFilter } from "@/@pv/hooks/use-filter";
import DateFilter from "./components/DateFilter";
import ReviewRequestDialog from "./components/ReviewRequestDialog";

function MusicRequestManagement() {
    const { getParam } = useQueryParams();

    const [pagination, setPagination] = useState<GridPaginationModel>({
        page: 0,
        pageSize: 10
    });

    const [openDateFilter, setOpenDateFilter] = useState(false);

    const [openApproval, setOpenApproval] = useState<{ cond: boolean; id: string; type: "approved" | "rejected" }>({
        cond: false,
        id: "",
        type: "approved"
    });

    const { filterAppliedCount, filterParams } = useFilter(["date", "status"]);

    const { data, isFetching } = useAllSongRequestsQuery({
        ...(!!getParam("date") ? {} : { all: true }),
        page: pagination.page + 1,
        ...filterParams
    });


    return (
        <>
            <DateFilter
                open={openDateFilter}
                onClose={() => {
                    setOpenDateFilter(false);
                }}
            />
            <ReviewRequestDialog
                onClose={() => {
                    setOpenApproval({
                        cond: false,
                        id: "",
                        type: "approved"
                    });
                }}
                open={openApproval.cond}
                type={openApproval.type}
                id={openApproval.id}
            />
            <AppLayout title="Song Request">
                {/* TODO: Add date filter to planviu-core */}
                <PvTable
                    columns={columns}
                    rowCount={data?.data?.count || 0}
                    rows={MusicRequestMapper(data?.data?.results || [])}
                    loading={isFetching}
                    containerProps={{
                        variant: "outlined"
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
                            },
                            {
                                label: "Date",
                                type: "custom",
                                valueKey: "date",
                                renderFilter: (
                                    <div
                                        onClick={() => {
                                            setOpenDateFilter(true);
                                        }}
                                        className={classNames("p-2 border rounded-lg cursor-pointer flex gap-2 items-center hover:bg-blue-50", {
                                            "border-black": !!getParam("date")
                                        })}
                                    >
                                        <i className="tabler-calendar w-4"></i>
                                        <Typography className="text-black">Date Filter</Typography>
                                    </div>
                                )
                            }
                        ]
                    }}
                    pagination={{
                        paginationControl: model => setPagination(model),
                        paginationModel: pagination
                    }}
                    addProps={{
                        hide: true
                    }}
                    editProps={{
                        hide: true
                    }}
                    deleteProps={{
                        hide: true
                    }}
                    showProps={{
                        hide: true
                    }}
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
                                <Tooltip title="Rejected" enterDelay={250}>
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

export default MusicRequestManagement;
