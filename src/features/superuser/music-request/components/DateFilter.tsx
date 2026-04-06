"use client";

import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useQueryParams } from "@ozanplanviu/planviu-core";
import dayjs from "dayjs";
import { DatePicker } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

type TDateFilter = {
    open: boolean;
    onClose: () => void;
}

function DateFilter({ onClose, open }: TDateFilter) {
    const { getParam, removeParam, updateParams } = useQueryParams();

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Date Filter</DialogTitle>
            <DialogContent className="flex flex-col gap-2">
                <DatePicker
                    selected={getParam("date") ? dayjs(getParam("date")).toDate() : null}
                    inline
                    onChange={(value: any) => {
                        updateParams({
                            add: {
                                date: dayjs(value).format("YYYY-MM-DD")
                            }
                        });
                    }}
                />

                <Button
                    variant="outlined"
                    onClick={() => {
                        removeParam("date");
                    }}
                >Clear</Button>
            </DialogContent>
        </Dialog>
    )
}

export default DateFilter
