"use client";

import ScreenPaid from "./ScreenPaid";
import SongBilled from "./SongBilled";
import SongToBill from "./SongToBill";

function StatsIndex() {
    return (
        <div className="grid grid-cols-3 gap-2">
            <SongToBill />
            <ScreenPaid />
            <SongBilled />
        </div>
    )
}

export default StatsIndex;
