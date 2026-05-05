"use client";

type TCardItem = {
    onClick?: () => void;
    songTitle: string;
    artist: string;
}

function CardItem({ onClick, artist, songTitle }: TCardItem) {
    return (
        <div
            onClick={onClick}
        >
            <div className="p-4 bg-gradient-to-r from-[#1E0A35] via-[#1E0A35] to-[#230D46] rounded-lg border border-purple-950">
                <div className="flex items-center gap-1">
                    <i className="tabler-music text-purple-200"></i>
                    <p className="text-purple-100 font-medium text-xl">{songTitle} - {artist}</p>
                </div>
                {/* <p className="text-gray-400">Request from: Table <span className="text-white">{songReq?.table_number}</span></p> */}
            </div>
        </div>
    )
}

export default CardItem
