"use client";

import { Typography } from "@mui/material";
import { DatePicker } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useQueryParams } from "@ozanplanviu/planviu-core";
import dayjs from "dayjs";
import classNames from "classnames";

type TSessionFilter = {
    darkMode?: boolean;
}

function SessionFilter({ darkMode }: TSessionFilter) {
    const { updateParams, getParam } = useQueryParams();

    const onChangeDate = (date: string) => {
        updateParams({
            remove: ["date"],
            add: {
                date: date
            }
        });
    }

    const onJumpToTonight = () => {
        updateParams({
            remove: ["date"],
            add: {
                date: dayjs(new Date()).format("YYYY-MM-DD")
            }
        });
    }

    const onNextNight = () => {
        const activeNight = dayjs(getParam("date") || dayjs(new Date()).format("YYYY-MM-DD"));
        const nextNight = activeNight.add(1, "day");

        updateParams({
            remove: ["date"],
            add: {
                date: nextNight.format("YYYY-MM-DD")
            }
        });
    }

    const onPrevNight = () => {
        const activeNight = dayjs(getParam("date") || dayjs(new Date()).format("YYYY-MM-DD"));
        const prevNight = activeNight.subtract(1, "day");

        updateParams({
            remove: ["date"],
            add: {
                date: prevNight.format("YYYY-MM-DD")
            }
        });
    }

    const formatDateIntoSession = (date: string) => {
        // _date adalah date dan fallback jika queryparams belum diload oleh useEffect parent (menghindari invalid date)
        const _date = date || (dayjs(new Date()).format("YYYY-MM-DD"))

        const today = new Date(_date);
        const todayDateAndMonth = dayjs(today).format("DD MMM");

        const tomorrow = new Date(today);

        tomorrow.setDate(today.getDate() + 1);
        const tomorrowDateAndMonth = dayjs(tomorrow).format("DD MMM");

        return `${todayDateAndMonth} 8PM - ${tomorrowDateAndMonth} 4AM`
    }

    return (
        <div className="flex flex-col sm:flex-row items-center gap-4">
            <Typography className={classNames({
                "text-black": !darkMode,
                "text-white": darkMode
            })}>Session</Typography>
            <div className="flex gap-2 pr-4 border-r">
                <div
                    onClick={onPrevNight}
                    className={classNames("px-4 py-1 border rounded-lg flex items-center justify-center cursor-pointer bg-blue-50 border-blue-300 text-blue-600 hover:bg-blue-100", {
                        "!bg-gray-800 !border-gray-700 !text-white": darkMode
                    })}
                >
                    <i className="tabler-arrow-left text-lg"></i>
                </div>

                <div className={classNames("bg-gray-50 px-4 py-1 rounded-lg border flex gap-2 items-center min-h-10", {
                    "!bg-gray-800 !border-gray-700 !text-white": darkMode
                })}>
                    <p className="font-semibold text-sm">{formatDateIntoSession(getParam("date") || "")}</p>
                    {(!getParam("date") || (getParam("date") === dayjs(new Date()).format("YYYY-MM-DD"))) ? (
                        <div className="bg-blue-200 rounded-lg border border-blue-400 px-2 py-1 text-xs text-blue-700">Tonight</div>
                    ) : null}
                </div>

                <div
                    onClick={onNextNight}
                    className={classNames("px-4 py-1 border rounded-lg flex items-center justify-center cursor-pointer bg-blue-50 border-blue-300 text-blue-600 hover:bg-blue-100", {
                        "!bg-gray-800 !border-gray-700 !text-white": darkMode
                    })}
                >
                    <i className="tabler-arrow-right text-lg"></i>
                </div>

            </div>

            {/* jump to section */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-fit">
                <Typography className={classNames({
                    "text-black": !darkMode,
                    "text-white": darkMode
                })}>Jump To</Typography>
                {/* tonight */}
                <div
                    onClick={onJumpToTonight}
                    className={classNames("px-4 py-1 border rounded-lg cursor-pointer border-blue-400 bg-gray-50 transition-all hover:bg-blue-200 text-black text-base sm:w-fit text-center", {
                        "!bg-gray-800 !text-white !border-gray-700": darkMode
                    })}
                >
                    Tonight
                </div>

                {/* date */}
                <DatePicker
                    selected={!!getParam("date") ? new Date(getParam("date") as string) : null}
                    onChange={(date: Date | null) => {
                        onChangeDate(dayjs(date).format("YYYY-MM-DD"))
                    }}
                    className={classNames("border px-2 py-1 rounded-lg text-base font-sans cursor-pointer bg-gray-50 border-blue-400 text-black hover:bg-blue-100 placeholder:text-black text-center w-full sm:w-fit", {
                        "!bg-gray-800 !border-gray-700 !text-white": darkMode
                    })}
                    placeholderText="Select date"
                />
            </div>
        </div>
    )
}

export default SessionFilter
