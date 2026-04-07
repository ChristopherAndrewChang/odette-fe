"use client";

import { useEffect, useState } from "react";

import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, Switch, Typography } from "@mui/material";

import classNames from "classnames";

import toast from "react-hot-toast";

import { getErrorMessage } from "@ozanplanviu/planviu-core";

import { useTablesInfiniteQuery } from "../../hooks/tables";
import { useInfiniteScroll } from "@/@pv/hooks/use-infinite-scroll";
import { useGenerateTableQRMutation } from "../../hooks/qr";
import { handleFileResponse } from "@/utils/file";

type TGenerateBulkQRDialog = {
    open: boolean;
    onClose: () => void;
}

function GenerateBulkQRDialog({ onClose, open }: TGenerateBulkQRDialog) {
    const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useTablesInfiniteQuery();
    const TablesData = data?.pages?.flatMap(pageData => pageData?.data?.results) || [];

    const [isAllTables, setIsAllTables] = useState(false);
    const [tableIdsSelected, setTableIdsSelected] = useState<number>();

    // const isTableSelected = (tableId: number) => !!tableIdsSelected?.includes(tableId);
    const isTableSelected = (tableId: number) => tableIdsSelected === tableId;

    const onTableNumberClick = (tableId: number) => {
        if (isAllTables) return;

        if (isTableSelected(tableId)) {
            setTableIdsSelected(0);
        } else {
            setTableIdsSelected(tableId);
        }

        // if (isTableSelected(tableId)) {
        //     setTableIdsSelected(prev => prev?.filter(_prev => _prev !== tableId));
        // } else {
        //     setTableIdsSelected(prev => [
        //         ...prev,
        //         tableId
        //     ]);
        // }
    }

    const { mutate, isPending } = useGenerateTableQRMutation({
        onSuccess: (res) => {
            toast.success("Success");
            handleFileResponse(res.data);
        },
        onError: (err) => {
            toast.error(getErrorMessage(err));
        }
    });

    const onGenerate = () => {
        mutate({
            method: "POST",
            type: isAllTables ? "bulk" : "single",
            ...(isAllTables ? {} : {
                id: tableIdsSelected?.toString()
            })
        });
    }

    const _onClose = () => {
        onClose();
        setTableIdsSelected(0);
    }

    // TODO: add useInfiniteScroll into planviu-core
    const { lastElementRef, nextPageFetchingIndicator } = useInfiniteScroll({
        onNextPage: fetchNextPage,
        props: {
            isFetching: isFetching,
            hasNextPage: hasNextPage,
            isFetchingNextPage: isFetchingNextPage,
            isLoading: isLoading
        }
    });

    useEffect(() => {
        if (isAllTables) {
            setTableIdsSelected(0);
        }
    }, [isAllTables]);

    return (
        <Dialog open={open} onClose={_onClose} fullWidth>
            <DialogTitle>Generate QR Table</DialogTitle>
            <DialogContent>
                {/* all table selection */}
                <div className="p-4 mb-4 border rounded-lg flex items-center gap-2">
                    <Switch checked={isAllTables} onChange={(_, checked) => setIsAllTables(checked)} />
                    <p className="font-poppins">Generate All Tables</p>
                </div>

                <Typography className="mb-4">Select Table</Typography>
                <div className="grid grid-cols-4 gap-4 mb-6 max-h-96 overflow-y-auto">
                    {TablesData?.map((tableData, i) => (
                        <>
                            <div
                                key={tableData.id}
                                onClick={() => {
                                    if (tableData?.is_active) {
                                        onTableNumberClick(tableData.id);
                                    }
                                }}
                                className={classNames("p-4 border border-blue-100 flex items-center justify-center rounded-lg cursor-pointer hover:border-blue-300 transition-all", {
                                    "!bg-gray-200 !border-gray-200 !cursor-not-allowed": !tableData?.is_active || !!isAllTables,
                                    "!bg-blue-100": isTableSelected(tableData.id)
                                })}
                            >
                                <Typography>{tableData?.number} {!tableData?.is_active ? "(inactive)" : ""}</Typography>
                            </div>
                            {((TablesData?.length === (i + 1)) && hasNextPage) ? (
                                <div ref={lastElementRef}>
                                    {nextPageFetchingIndicator}
                                </div>
                            ) : null}
                        </>
                    ))}
                </div>

                <div className="flex gap-2">
                    <Button variant="outlined" onClick={_onClose}>Cancel</Button>
                    <Button variant="contained" onClick={onGenerate}>
                        {isPending ? <CircularProgress size={14} className="text-white" /> : (
                            isAllTables ? "Generate All Tables" : "Generate"
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default GenerateBulkQRDialog
