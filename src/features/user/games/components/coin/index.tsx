"use client";

import { useEffect, useRef, useState } from "react";

import classNames from "classnames";

import { useColor } from "@/hooks/color";
import CoinSVG from "./Coin";
import CartoonCharacter from "./CartoonCharacter";
import UserBackButton from "@/features/user/shared/components/UserBackButton";
import ResultLabel from "./ResultLabel";

const OPTIONS_BET: { label: string; key: "heads" | "tails" }[] = [
    { label: "Garuda", key: "heads" },
    { label: "500", key: "tails" }
]

function CoinGames() {
    const [phase, setPhase] = useState<"idle" | "windup" | "throw" | "flying" | "land" | "result">("idle");

    const [coinPos, setCoinPos] = useState({ x: 180, y: 100 });
    const [coinAngle, setCoinAngle] = useState(0);
    const [result, setResult] = useState<"tails" | "heads" | null>(null);

    const rafRef = useRef<number>(0);
    const startTimeRef = useRef<number>(0);

    const [bet, setBet] = useState<"heads" | "tails" | null>(null);
    const [showWarningNoBet, setShowWarningNoBet] = useState(false);

    const { OLD_GOLD, GOLD, GRAY, DARKGRAY, DARKBG } = useColor();

    const onClickFlip = () => {
        if (phase !== "idle") return;

        if (!bet) {
            setShowWarningNoBet(true);

            return;
        }

        setResult(null);
        setPhase("windup");
    }

    useEffect(() => {
        if (!!bet) {
            setShowWarningNoBet(false);
        }


    }, [bet]);

    useEffect(() => {
        if (phase === "windup") {
            setTimeout(() => {
                setPhase("throw");
            }, 400);
        }
    }, [phase]);

    useEffect(() => {
        if (phase === "throw") {
            setPhase("flying");
        }
    }, [phase]);

    useEffect(() => {
        if (phase === "result") {
            setTimeout(() => {
                setPhase("idle");
            }, 1000);
        }
    }, [phase]);

    useEffect(() => {
        if (phase !== "flying") return;

        const duration = 1200;

        const startX = 100, startY = 80;
        const peakX = 200, peakY = -40;
        const endX = 200, endY = 140;

        startTimeRef.current = performance.now();

        const animate = (now: number) => {
            const elapsed = now - startTimeRef.current;
            const t = Math.min(elapsed / duration, 1);

            // easing biar smooth
            const ease = t < 0.5
                ? 2 * t * t
                : -1 + (4 - 2 * t) * t;

            // pakai easing (biar lebih realistis)
            const tt = ease;

            const x =
                (1 - tt) * (1 - tt) * startX +
                2 * (1 - tt) * tt * peakX +
                tt * tt * endX;

            const y =
                (1 - tt) * (1 - tt) * startY +
                2 * (1 - tt) * tt * peakY +
                tt * tt * endY;

            setCoinPos({ x, y });
            setCoinAngle(tt * 1440); // 4x spin

            if (t < 1) {
                rafRef.current = requestAnimationFrame(animate);
            } else {
                const res = Math.random() < 0.5 ? "heads" : "tails";

                setResult(res);

                setPhase("land");

                setTimeout(() => {
                    setPhase("result");
                }, 100);
            }
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(rafRef.current);
    }, [phase]);

    return (
        <>
            <div className="mb-4">
                <UserBackButton href="/user/games" />
            </div>

            {/* main card */}
            <div className="border rounded-lg px-4 py-6" style={{
                borderColor: OLD_GOLD,
                backgroundColor: DARKGRAY
            }}>
                {/* header */}
                <header className="mb-8">
                    <p className="text-4xl font-semibold font-charon text-center mb-2" style={{
                        color: GOLD
                    }}>FLIP IT</p>
                    <p className="font-charon text-center text-sm" style={{
                        color: GRAY
                    }}>By Odette</p>
                </header>
                {/* end of header */}

                <main className="p-4 rounded-xl border border-gray-800 relative flex items-center mb-8" style={{
                    // backgroundColor: DARKBG,
                    backgroundImage: `linear-gradient(to bottom, ${DARKBG}, ${DARKBG}, ${DARKBG}, ${DARKBG}, ${DARKBG}, ${DARKBG}, ${DARKBG}, ${OLD_GOLD})`
                }}>
                    <CartoonCharacter
                        phase={phase}
                        showCoinInHand={phase === "idle" || phase === "windup"}
                    />

                    {(!!bet && !!result && (phase === "result")) ? (
                        <ResultLabel
                            bet={bet}
                            result={result}
                            showResult={!!result}
                        />
                    ) : null}

                    {(phase !== "idle" && phase !== "windup") ? (
                        <div
                            style={{
                                position: "absolute",
                                transformStyle: 'preserve-3d',
                                perspective: 300,
                                zIndex: 5,
                                left: coinPos.x,
                                top: coinPos.y,
                                transform: `translate(-50%, -50%) rotateY(${coinAngle}deg)`,
                            }}
                        >
                            <CoinSVG size={44} face={result || "tails"} />
                        </div>
                    ) : null}
                </main>

                {/* bet */}
                <section className="grid grid-cols-2 gap-4 mb-8">
                    <div className="col-span-2">
                        <p className="font-charon text-gray-500">Place your bet</p>
                    </div>

                    {OPTIONS_BET?.map(opt => (
                        <div
                            key={opt.key}
                            onClick={() => {
                                if (phase !== "idle") return;

                                if (bet === opt.key) {
                                    setBet(null);
                                } else {
                                    setBet(opt.key);
                                }
                            }}
                            className="p-4 rounded-xl"
                            style={{
                                backgroundColor: (bet === opt.key) ? OLD_GOLD : DARKBG,
                                borderColor: (bet === opt.key) ? GOLD : GRAY,
                                borderWidth: 0.1
                            }}
                        >
                            <p className="font-poppins text-xl text-center text-white">{opt.label}</p>
                        </div>
                    ))}
                </section>

                {/* button flip section */}
                <section>
                    <div
                        key={`${bet}-${phase}`}
                        onClick={onClickFlip}
                        className={classNames(
                            "px-4 py-4 rounded-xl",

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
                            backgroundImage: (!!bet && (phase === "idle")) ? `linear-gradient(to right, ${OLD_GOLD}, ${GOLD}, ${GOLD}, ${GOLD}, ${OLD_GOLD})` : DARKBG
                        }}
                    >
                        <p className={classNames("font-charon text-center font-semibold", {
                            "text-black": !!bet && (phase === "idle"),
                            "text-gray-600": !bet,
                            "text-2xl": !showWarningNoBet,
                            "text-lg !text-gray-600": showWarningNoBet
                        })}>
                            {!showWarningNoBet ? "FLIP COIN!" : "Yuk, pilih tebakanmu dulu"}
                        </p>
                    </div>
                </section>
            </div>
        </>
    )
}

export default CoinGames;
