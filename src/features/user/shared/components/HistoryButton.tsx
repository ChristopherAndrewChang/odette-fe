"use client";

type THistoryButton = {
    onClick: () => void;
}

function HistoryButton({ onClick }: THistoryButton) {
    return (
        <div
            onClick={onClick}
            className="border border-gray-500 py-1 px-4 rounded-lg flex items-center gap-2 mb-4"
        >
            <i className="tabler-history text-gray-300 text-lg"></i>
            <p className="text-gray-300 font-poppins">History</p>
        </div>
    )
}

export default HistoryButton
