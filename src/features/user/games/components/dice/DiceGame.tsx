"use client";

import { useEffect, useRef, useState } from "react";

import classNames from "classnames";

import UserBackButton from "@/features/user/shared/components/UserBackButton";
import type { TPhase } from "./Character";
import Character from "./Character";
import { Dice } from "./Dice";
import ResultBanner from "./ResultBanner";

type TOptionData = { label: string; startValue: number; endValue: number; color: string; }

const OPTION_DATA: TOptionData[] = [
    { label: "Kecil", startValue: 1, endValue: 6, color: "#006400" },
    { label: "Sedang", startValue: 7, endValue: 7, color: "#C9A000" },
    { label: "Besar", startValue: 8, endValue: 12, color: "#8B0000" }
];

const getColorBySumValue = (sumValue: number) => {
    let color = "";

    OPTION_DATA.forEach(opt => {
        if ((sumValue >= opt.startValue) && (sumValue <= opt.endValue)) {
            color = opt.color;
        }
    });

    return color;
}

const getCategoryBySumValue = (sumValue: number) => {
    let category = "";

    OPTION_DATA.forEach(opt => {
        if ((sumValue >= opt.startValue) && (sumValue <= opt.endValue)) {
            category = opt.label;
        }
    });

    return category;
}

function DiceGame() {
    const [phase, setPhase] = useState<TPhase>("idle");
    const [showingValueDice, setShowingValueDice] = useState(1);
    const [value, setValue] = useState<number[]>([0, 0]);
    const [bet, setBet] = useState<TOptionData | null>(null);
    const [showShouldBetMsg, setShouldBetMsg] = useState(false);

    const rollAudio = useRef<HTMLAudioElement | null>(null);

    const onReset = () => {
        setValue([0, 0]);
        setPhase("idle");
        setShowingValueDice(1);
    }

    const sumValues = value[0] + value[1];

    const isOdd = (showingValueDice % 2) === 0;

    const DICE_SIZE = isOdd ? 80 : 84;

    const getDiceShow = (index: number) => {
        if (!!value[index]) return value[index];

        if (showingValueDice < 6) return showingValueDice;
        else if (showingValueDice === 7) return 1;
        else if (showingValueDice === 8) return 5;
        else return 1;
    }

    const getRandomDice1 = Math.floor(Math.random() * 6) + 1;
    const getRandomDice2 = Math.floor(Math.random() * 6) + 1;

    const onShake = () => {
        if (!bet) {
            setShouldBetMsg(true);

            return;
        }

        rollAudio?.current?.play()?.catch(() => { });

        setShouldBetMsg(false);
        setValue([0, 0]);
        setPhase("shake");
        setShowingValueDice(2);
    }

    useEffect(() => {
        if (phase !== "shake") return;

        if (showingValueDice < 6) {
            setTimeout(() => {
                setShowingValueDice(prev => prev + 1);
            }, 150);
        } else if (showingValueDice >= 6 && showingValueDice < 8) {
            if (showingValueDice === 6) {
                setTimeout(() => {
                    setShowingValueDice(7);
                }, 150);
            } else if (showingValueDice === 7) {
                setTimeout(() => {
                    setShowingValueDice(8);
                }, 150);
            }
        } else {
            setValue([getRandomDice1, getRandomDice2]);
            setPhase("release");
        }
    }, [showingValueDice]);

    useEffect(() => {
        if (phase === "release") {
            setTimeout(() => {
                setPhase("idle");
            }, 1500);
        }
    }, [phase]);

    useEffect(() => {
        if (!!bet) {
            setShouldBetMsg(false);
        }
    }, [bet]);

    return (
        <div>
            <audio ref={rollAudio} src="/sounds/dice-roll.mp3" preload="auto" />
            <UserBackButton href="/user/home" />
            <p className="font-poppins text-center text-4xl font-semibold text-white mb-8">Dice Game</p>

            <section className="bg-[#28153D] rounded-xl border border-purple-950 flex items-end justify-center pb-4 relative">
                <Character phase={phase} />

                {(phase === "release" || phase === "celebrate") ? (
                    <ResultBanner
                        result={sumValues}
                        category={getCategoryBySumValue(sumValues)}
                        color={getColorBySumValue(sumValues)}
                        bet={bet?.label || ""}
                    />
                ) : null}
                <div className="flex flex-col gap-1">
                    <Dice
                        size={DICE_SIZE}
                        value={getDiceShow(0)}
                        mode={phase === "shake" ? "shake" : "normal"}
                    />

                    <Dice
                        size={DICE_SIZE}
                        value={getDiceShow(1)}
                        mode={phase === "shake" ? "shake" : "normal"}
                    />
                </div>
            </section>

            <section className="my-8 grid grid-cols-3 gap-2">
                <div className="col-span-3">
                    <p className="font-poppins text-white">Pilih Salah Satu</p>
                </div>
                {OPTION_DATA.map((opt, i) => (
                    <div
                        onClick={() => {
                            if (phase !== "idle") return;

                            if (bet?.label === opt.label) {
                                setBet(null);
                            } else {
                                setBet(opt);
                            }
                        }}
                        key={i}
                        className={classNames("p-4 rounded-xl border")}
                        style={{
                            color: opt.color,
                            borderColor: opt.color,
                            backgroundColor: (bet?.label === opt.label) ? `${opt.color}50` : ""
                        }}>
                        <p className="font-semibold">{opt.label}</p>
                        <p className="text-gray-200 text-sm">Range: {opt.startValue} - {opt.endValue}</p>
                    </div>
                ))}
            </section>

            <section>
                <div
                    onClick={((phase === "idle" || phase === "celebrate")) ? onShake : () => { }}
                    className={classNames(
                        "bg-gray-900 p-4 rounded-xl border mb-4 text-white font-medium text-xl font-poppins text-center",

                        // 👇 efek tombol
                        "cursor-pointer select-none transition-all duration-150",

                        // 👇 default (naik)
                        "shadow-[0_6px_0_#030712]",

                        // 👇 saat hover
                        "hover:translate-y-[2px] hover:shadow-[0_4px_0_#030712]",

                        // 👇 saat klik (press)
                        "active:translate-y-[6px] active:shadow-[0_0px_0_#030712]",

                        {
                            "!translate-y-[6px] !shadow-[0_0px_0_#030712]": (phase !== "idle" || !bet)
                        }
                    )}
                >
                    {showShouldBetMsg ? "Pilih tebakan terlebih dahulu" : "Dice!"}
                </div>

                <div
                    onClick={onReset}
                    className="bg-gray-800 p-4 rounded-xl border" style={{
                        boxShadow: "10px 10px #030712"
                    }}>
                    <p className="text-white font-medium text-xl font-poppins text-center">Reset</p>
                </div>
            </section>
        </div>
    )
}

export default DiceGame
