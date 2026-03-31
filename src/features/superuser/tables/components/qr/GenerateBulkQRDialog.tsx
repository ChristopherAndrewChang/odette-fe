"use client";

import { useState } from "react";

import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

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

    const [tableIdsSelected, setTableIdsSelected] = useState<number[]>([]);

    const isTableSelected = (tableId: number) => !!tableIdsSelected?.includes(tableId);

    const onTableNumberClick = (tableId: number) => {
        if (isTableSelected(tableId)) {
            setTableIdsSelected(prev => prev?.filter(_prev => _prev !== tableId));
        } else {
            setTableIdsSelected(prev => [
                ...prev,
                tableId
            ]);
        }
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
            type: "bulk",
            data: {
                table_ids: tableIdsSelected
            }
        });
    }

    const _onClose = () => {
        onClose();
        setTableIdsSelected([]);
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

    return (
        <Dialog open={open} onClose={_onClose} fullWidth>
            <DialogTitle>Generate QR Tables (Bulk)</DialogTitle>
            <DialogContent>
                <Typography className="mb-4">Select Tables</Typography>
                <div className="grid grid-cols-4 gap-4 mb-6 max-h-96 overflow-y-auto">
                    {TablesData?.map((tableData, i) => (
                        <>
                            <div
                                key={tableData.id}
                                onClick={() => onTableNumberClick(tableData.id)}
                                className={classNames("p-4 border border-blue-100 flex items-center justify-center rounded-lg cursor-pointer hover:border-blue-300 transition-all", {
                                    "!bg-blue-100": isTableSelected(tableData?.id || 0)
                                })}
                            >
                                <Typography>{tableData?.number}</Typography>
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
                        {isPending ? <CircularProgress size={14} className="text-white" /> : "Generate"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default GenerateBulkQRDialog
