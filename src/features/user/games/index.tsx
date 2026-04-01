'use client';

import type { ReactNode } from "react";

import { useQueryParams } from "@/@pv/hooks/use-query-params";
import UserContainer from "../shared/components/UserContainer";
import CoinGames from "./components/coin";
import DiceGame from "./components/dice/DiceGame";
import UserBackButton from "../shared/components/UserBackButton";
import { useColor } from "@/hooks/color";
import CoinSVG from "./components/coin/Coin";
import { Dice } from "./components/dice/Dice";

const ContentByParams: Record<string, ReactNode> = {
    "coin-flip": <CoinGames />,
    "dice": <DiceGame />
}

const GAMES_DATA: { label: string; key: string; logo: ReactNode; color1: string; color2: string; }[] = [
    {
        label: "Coin Flip",
        key: "coin-flip",
        logo: <CoinSVG face="heads" size={32} />,
        color1: "#0C1912",
        color2: "#102513",
    },
    {
        label: "Roll the Dice",
        key: "dice",
        logo: <Dice mode="normal" size={32} value={4} />,
        color1: "#0B1F39",
        color2: "#0E2A53"
    },
];

function UserGames() {
    const { updateParams, getParam } = useQueryParams();
    const { GOLD } = useColor();

    if (getParam("game")) {
        return (
            <UserContainer>
                {ContentByParams[getParam("game") as string]}
            </UserContainer>
        )
    }

    return (
        <UserContainer>
            <header className="mb-8">
                <div className="mb-6">
                    <UserBackButton href={"/user/home"} />
                </div>

                <p className="text-center font-charon font-semibold text-3xl text-white mb-4">Welcome to Mini Games</p>
                <p className="text-center font-poppins text-gray-400">Select games you want to play</p>
            </header>

            <main className="grid grid-cols-1 gap-4">
                {GAMES_DATA.map(gameData => (
                    <div key={gameData.key} className="p-4 rounded-2xl" style={{
                        borderWidth: 1,
                        borderColor: gameData.color1,
                        backgroundImage: `linear-gradient(to right, ${gameData.color1}, ${gameData.color2})`
                    }}>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="w-12 flex items-center justify-center">
                                    {gameData.logo}
                                </div>
                                <p className="text-white text-xl font-medium font-poppins">{gameData.label}</p>
                            </div>

                            <div
                                onClick={() => {
                                    updateParams({
                                        remove: ["game"],
                                        add: {
                                            game: gameData.key
                                        }
                                    });
                                }}
                                className="p-4 rounded-xl"
                                style={{
                                    backgroundColor: GOLD
                                }}>
                                <p className="font-charon text-black">Play</p>
                            </div>
                        </div>
                    </div>
                ))}
            </main>
        </UserContainer>
    )
}

export default UserGames;
