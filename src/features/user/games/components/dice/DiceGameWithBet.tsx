"use client";

import { useEffect, useRef, useState } from "react";

import classNames from "classnames";

import UserBackButton from "@/features/user/shared/components/UserBackButton";
import type { TPhase } from "./Character";
import Character from "./Character";
import { Dice } from "./Dice";
import ResultBanner from "./ResultBanner";
import Lantern from "./Lantern";
import { useColor } from "@/hooks/color";

type TOptionData = { zh: string; label: string; startValue: number; endValue: number; color: string; }

const OPTION_DATA: TOptionData[] = [
    { zh: "小", label: "XIAO", startValue: 1, endValue: 6, color: "#006400" },
    { zh: '中', label: "ZHONG", startValue: 7, endValue: 7, color: "#C9A000" },
    { zh: '大', label: "DA", startValue: 8, endValue: 12, color: "#8B0000" }
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

function DiceGameWithBet() {
    const [phase, setPhase] = useState<TPhase>("idle");
    const [showingValueDice, setShowingValueDice] = useState(1);
    const [value, setValue] = useState<number[]>([0, 0]);
    const [bet, setBet] = useState<TOptionData | null>(null);
    const [showShouldBetMsg, setShouldBetMsg] = useState(false);

    const rollAudio = useRef<HTMLAudioElement | null>(null);

    const { OLD_GOLD, DARKBG, GRAY, GOLD, DARKRED, RED } = useColor();

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

    useEffect(() => {
        console.log("bet-value", bet);
    }, [bet]);

    return (
        <>
            <div className="mb-6">
                <UserBackButton href="/user/games" />
            </div>
            <div className="flex items-center justify-between mb-4">
                <Lantern className="lantern" />
                <Lantern className="lantern2" />
            </div>
            <div className="my-1 shadow-[0_0_20px_rgba(255,215,0,0.5)] p-4 rounded-xl animate-glow-shadow">
                <audio ref={rollAudio} src="/sounds/dice-roll.mp3" preload="auto" />
                <p className="font-poppins text-center text-6xl font-semibold" style={{
                    color: GOLD
                }}>大小</p>
                <p className="font-poppins text-center text-3xl font-semibold text-white mb-8" style={{
                    color: OLD_GOLD
                }}>DA XIAO</p>

                <section className={`rounded-xl border border-gray-800 flex items-end justify-center pb-4 relative`} style={{
                    backgroundImage: `linear-gradient(to bottom, ${DARKBG}, ${DARKBG}, ${DARKBG}, ${DARKBG}, ${DARKBG}, ${OLD_GOLD})`
                }}>
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
                        <p className="font-poppins text-gray-500">Place your bet</p>
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
                            className={classNames("p-4 rounded-xl border flex flex-col gap-2")}
                            style={{
                                color: (bet?.label === opt.label) ? opt.color : GRAY,
                                borderColor: (bet?.label === opt.label) ? opt.color : `${GRAY}50`,
                                backgroundColor: (bet?.label === opt.label) ? `${opt.color}50` : ""
                            }}
                        >
                            <p className="text-center text-4xl font-semibold">{opt.zh}</p>
                            <p className="font-semibold text-center">{opt.label}</p>
                            <p className="text-gray-200 text-sm text-center">{(opt.startValue === opt.endValue) ? opt.startValue : (`${opt.startValue} - ${opt.endValue}`)}</p>
                        </div>
                    ))}
                </section>

                <section>
                    <div
                        key={bet?.zh}
                        onClick={((phase === "idle" || phase === "celebrate")) ? onShake : () => { }}
                        className={classNames(
                            "p-4 rounded-xl border mb-4 text-white font-medium text-xl font-poppins text-center flex justify-center gap-4",

                            // 👇 efek tombol
                            "cursor-pointer select-none transition-all duration-150",

                            // 👇 default (naik)
                            "shadow-[0_6px_0_#030712]",

                            // 👇 saat hover
                            "hover:translate-y-[2px] hover:shadow-[0_4px_0_#030712]",

                            // 👇 saat klik (press)
                            "active:translate-y-[6px] active:shadow-[0_0px_0_#030712]",
                        )}
                        style={{
                            backgroundImage: ((phase === "idle" || phase === "celebrate") && !!bet) ? `linear-gradient(to right, ${DARKRED}, ${RED})` : DARKBG,
                            color: (!!bet) ? "white" : GRAY,
                        }}
                    >
                        {showShouldBetMsg ? "Pilih tebakan terlebih dahulu" : "摇 ROLL 摇"}
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
        </>
    )
}

export default DiceGameWithBet;
