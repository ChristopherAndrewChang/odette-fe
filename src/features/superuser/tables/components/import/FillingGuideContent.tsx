"use client";

import { Divider, Typography, useColorScheme } from "@mui/material";
import classNames from "classnames";

type TFillingGuideContent = {
    onBack: () => void;
}

function FillingGuideContent({ onBack }: TFillingGuideContent) {
    const { mode } = useColorScheme();

    return (
        <section>
            {/* back button */}
            <div onClick={onBack} className="px-4 py-2 border rounded-lg cursor-pointer transition-all hover:border-blue-600 w-fit mb-4">
                <Typography className="text-sm">Back</Typography>
            </div>

            {/* content */}
            <div>
                <Typography className={classNames("text-lg font-medium text-black mb-2", {
                    "!text-white": mode === "dark"
                })}>1. Adding New Tables</Typography>
                <Typography className="mb-2">To add new tables, enter <b>NEW</b> in the <b>number</b> field and the desired table name in the <b>new_number</b> field. For example</Typography>
                <div className="grid grid-cols-2 border">
                    <Typography className="p-2 border">number</Typography>
                    <Typography className="p-2 border">new_number</Typography>
                    <Typography className="p-2 border">NEW</Typography>
                    <Typography className="p-2 border">T1</Typography>
                    <Typography className="p-2 border">NEW</Typography>
                    <Typography className="p-2 border">T2</Typography>
                </div>
                <Divider className="my-2" />

                {/* UPDATING */}
                <Typography className={classNames("text-lg font-medium text-black mb-2", {
                    "!text-white": mode === "dark"
                })}>2. Updating Table</Typography>
                <Typography className="mb-2">To update existing tables, enter the current table number in the <b>number</b> field and the new table name in the <b>new_number</b> field.</Typography>
                <div className="grid grid-cols-2 border">
                    <Typography className="p-2 border">number</Typography>
                    <Typography className="p-2 border">new_number</Typography>
                    <Typography className="p-2 border">T1</Typography>
                    <Typography className="p-2 border">T1Updated</Typography>
                    <Typography className="p-2 border">T2</Typography>
                    <Typography className="p-2 border">T2Updated</Typography>
                </div>
                <Divider className="my-2" />

                {/* SKIP */}
                <Typography className={classNames("text-lg font-medium text-black mb-2", {
                    "!text-white": mode === "dark"
                })}>3. Skipping Table</Typography>
                <Typography className="mb-2">If you only want to update certain tables, you can skip others. Leave the <b>number</b> field empty for the tables you want to skip.</Typography>
                <div className="grid grid-cols-2 border">
                    <Typography className="p-2 border">number</Typography>
                    <Typography className="p-2 border">new_number</Typography>
                    <Typography className="p-2 border">T1 (skipped)</Typography>
                    <Typography className="p-2 border"></Typography>
                    <Typography className="p-2 border">T2</Typography>
                    <Typography className="p-2 border">T2Updated</Typography>
                </div>
            </div>
        </section>
    )
}

export default FillingGuideContent;
