"use client";

import { useState } from "react";

import { Typography } from "@mui/material";
import { DatePicker } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function SessionFilter() {
    const [date, setDate] = useState<Date | null>(null);

    return (
        <div className="flex items-center gap-4 border-b pb-4 mb-4">
            <Typography className="text-black">Session</Typography>
            <div className="flex gap-2 pr-4 border-r">
                <div
                    className="px-4 py-1 border rounded-lg flex items-center justify-center cursor-pointer bg-blue-50 border-blue-300 text-blue-600 hover:bg-blue-100"
                >
                    <i className="tabler-arrow-left text-lg"></i>
                </div>

                <div className="bg-gray-50 px-4 py-1 rounded-lg border flex gap-2 items-center">
                    <p className="font-semibold text-sm">21 Apr 8PM - 22 Apr 4AM</p>
                    <div className="bg-blue-200 rounded-lg border border-blue-400 px-2 py-1 text-xs text-blue-700">Tonight</div>
                </div>

                <div
                    className="px-4 py-1 border rounded-lg flex items-center justify-center cursor-pointer bg-blue-50 border-blue-300 text-blue-600 hover:bg-blue-100"
                >
                    <i className="tabler-arrow-right text-lg"></i>
                </div>

            </div>

            {/* jump to section */}
            <div className="flex items-center gap-4">
                <Typography className="text-black">Jump To</Typography>
                {/* tonight */}
                <div className="px-4 py-1 border rounded-lg cursor-pointer border-blue-400 bg-gray-50 transition-all hover:bg-blue-200 text-black text-base">
                    Tonight
                </div>

                {/* date */}
                <DatePicker
                    selected={date}
                    onChange={(date: any) => setDate(date)}
                    className="border px-2 py-1 rounded-lg text-base font-sans cursor-pointer bg-gray-50 border-blue-400 text-black hover:bg-blue-100 placeholder:text-black text-center"
                    placeholderText="Select date"
                />
            </div>
        </div>
    )
}

export default SessionFilter
