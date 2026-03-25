"use client";

import { useEffect, useState } from "react";

import CoinSVG from "./Coin";

type TCartoonCharacter = {
    phase: "idle" | "windup" | "throw" | "flying" | "land" | "result";
    showCoinInHand: boolean;
    result?: "tail" | "heads";
}

function CartoonCharacter({ phase, showCoinInHand, result }: TCartoonCharacter) {
    // Body parts animate based on phase
    const isWindup = phase === 'windup'
    const isThrow = phase === 'throw'

    // const isLand = phase === 'land'
    // const isIdle = phase === 'idle'

    // Arm angles for throw
    // idle: arm down relaxed
    // windup: arm back (rotated behind)
    // throw: arm forward + up

    const upperArmRot = isWindup ? -80 : isThrow ? 60 : 0
    const forearmRot = isWindup ? -30 : isThrow ? -60 : 15
    const bodyLean = isWindup ? -8 : isThrow ? 12 : 0
    const legKick = isThrow ? 18 : 0

    // blinking
    const [blink, setBlink] = useState(false)

    useEffect(() => {
        const interval = setInterval(
            () => {
                setBlink(true)
                setTimeout(() => setBlink(false), 120)
            },
            3200 + Math.random() * 1000
        )

        return () => clearInterval(interval)
    }, [])

    return (
        <svg
            viewBox='0 0 160 200'
            width='160'
            height='200'
            style={{
                // position: 'absolute',
                bottom: 16,
                left: 20,
                overflow: 'visible',
                transition: 'transform 0.1s'
            }}
        >
            {/* Shadow */}
            <ellipse cx='72' cy='196' rx='38' ry='6' fill='rgba(0,0,0,0.35)' />

            {/* ── Body group (leans during throw) ── */}
            <g
                style={{
                    transformOrigin: '72px 160px',
                    transform: `rotate(${bodyLean}deg)`,
                    transition: 'transform 0.18s cubic-bezier(0.34,1.56,0.64,1)'
                }}
            >
                {/* Back arm (left, behind body) */}
                <g
                    style={{
                        transformOrigin: '56px 120px',
                        transform: `rotate(${-upperArmRot * 0.5}deg)`,
                        transition: 'transform 0.18s cubic-bezier(0.34,1.56,0.64,1)'
                    }}
                >
                    <rect x='38' y='118' width='14' height='36' rx='7' fill='#3a86ff' />
                    <rect
                        x='37'
                        y='148'
                        width='13'
                        height='22'
                        rx='6.5'
                        fill='#ffb347'
                        style={{
                            transformOrigin: '44px 148px',
                            transform: `rotate(${forearmRot * -0.3}deg)`,
                            transition: 'transform 0.18s'
                        }}
                    />
                </g>

                {/* Legs */}
                <g>
                    {/* Left leg */}
                    <rect
                        x='54'
                        y='166'
                        width='16'
                        height='30'
                        rx='8'
                        fill='#1a1a2e'
                        style={{
                            transformOrigin: '62px 166px',
                            transform: `rotate(${-legKick * 0.5}deg)`,
                            transition: 'transform 0.18s'
                        }}
                    />
                    {/* Right leg */}
                    <rect
                        x='73'
                        y='166'
                        width='16'
                        height='30'
                        rx='8'
                        fill='#1a1a2e'
                        style={{
                            transformOrigin: '81px 166px',
                            transform: `rotate(${legKick}deg)`,
                            transition: 'transform 0.18s'
                        }}
                    />
                    {/* Shoes */}
                    <ellipse
                        cx='62'
                        cy='196'
                        rx='12'
                        ry='7'
                        fill='#111'
                        style={{
                            transformOrigin: '62px 166px',
                            transform: `rotate(${-legKick * 0.5}deg)`,
                            transition: 'transform 0.18s'
                        }}
                    />
                    <ellipse
                        cx='81'
                        cy='196'
                        rx='12'
                        ry='7'
                        fill='#111'
                        style={{
                            transformOrigin: '81px 166px',
                            transform: `rotate(${legKick}deg)`,
                            transition: 'transform 0.18s'
                        }}
                    />
                </g>

                {/* Torso */}
                <rect x='48' y='110' width='48' height='60' rx='14' fill='#3a86ff' />
                {/* Shirt collar / tie */}
                <polygon points='72,112 66,128 72,132 78,128' fill='white' opacity='0.9' />
                <polygon points='72,132 69,148 72,150 75,148' fill='#f5c518' />
                {/* Shirt buttons */}
                <circle cx='72' cy='136' r='2.5' fill='white' opacity='0.6' />
                <circle cx='72' cy='144' r='2.5' fill='white' opacity='0.6' />

                {/* Throwing arm (right, front) */}
                <g
                    style={{
                        transformOrigin: '88px 120px',
                        transform: `rotate(${upperArmRot}deg)`,
                        transition: 'transform 0.18s cubic-bezier(0.34,1.56,0.64,1)'
                    }}
                >
                    {/* Upper arm */}
                    <rect x='90' y='112' width='15' height='36' rx='7.5' fill='#3a86ff' />
                    {/* Forearm */}
                    <g
                        style={{
                            transformOrigin: '97px 148px',
                            transform: `rotate(${forearmRot}deg)`,
                            transition: 'transform 0.18s cubic-bezier(0.34,1.56,0.64,1)'
                        }}
                    >
                        <rect x='90' y='144' width='15' height='28' rx='7' fill='#ffb347' />
                        {/* Hand / fist */}
                        <ellipse cx='97' cy='174' rx='10' ry='9' fill='#ffb347' />
                        {/* Coin in hand */}
                        {showCoinInHand && (
                            <g transform='translate(97, 164)'>
                                <CoinSVG size={20} face={"heads"} />
                            </g>
                        )}
                    </g>
                </g>

                {/* Head */}
                <g
                    style={{
                        transformOrigin: '72px 94px',
                        transform: `rotate(${bodyLean * 0.4}deg)`,
                        transition: 'transform 0.18s'
                    }}
                >
                    {/* Neck */}
                    <rect x='65' y='104' width='14' height='14' rx='5' fill='#ffb347' />
                    {/* Head shape */}
                    <ellipse cx='72' cy='82' rx='28' ry='30' fill='#ffb347' />
                    {/* Hair */}
                    <path d='M44,76 Q46,48 72,46 Q98,48 100,76 Q94,56 72,54 Q50,56 44,76Z' fill='#1a1a1a' />
                    {/* Side hair */}
                    <ellipse cx='46' cy='80' rx='7' ry='12' fill='#1a1a1a' />
                    <ellipse cx='98' cy='80' rx='7' ry='12' fill='#1a1a1a' />
                    {/* Eyes */}
                    <ellipse cx='60' cy='82' rx='7' ry={blink ? 1 : 8} fill='white' style={{ transition: 'ry 0.05s' }} />
                    <ellipse cx='84' cy='82' rx='7' ry={blink ? 1 : 8} fill='white' style={{ transition: 'ry 0.05s' }} />
                    {/* Pupils */}
                    {!blink && (
                        <>
                            <circle cx={62} cy={83} r='4' fill='#1a1a1a' />
                            <circle cx={86} cy={83} r='4' fill='#1a1a1a' />
                            {/* Shine */}
                            <circle cx={63.5} cy={81} r='1.5' fill='white' />
                            <circle cx={87.5} cy={81} r='1.5' fill='white' />
                        </>
                    )}
                    {/* Eyebrows – raised in throw excitement */}
                    <path
                        d={isThrow ? 'M53,70 Q60,62 67,68' : 'M53,72 Q60,67 67,72'}
                        stroke='#1a1a1a'
                        strokeWidth='3'
                        strokeLinecap='round'
                        fill='none'
                        style={{ transition: 'd 0.18s' }}
                    />
                    <path
                        d={isThrow ? 'M77,68 Q84,62 91,70' : 'M77,72 Q84,67 91,72'}
                        stroke='#1a1a1a'
                        strokeWidth='3'
                        strokeLinecap='round'
                        fill='none'
                        style={{ transition: 'd 0.18s' }}
                    />
                    {/* Mouth */}
                    <path
                        d={
                            isThrow || isWindup
                                ? 'M62,97 Q72,106 82,97' // big smile
                                : 'M64,97 Q72,103 80,97'
                        } // normal smile
                        stroke='#c0392b'
                        strokeWidth='3'
                        strokeLinecap='round'
                        fill='none'
                        style={{ transition: 'd 0.2s' }}
                    />
                    {/* Teeth (on big smile) */}
                    {isThrow && <path d='M64,99 Q72,106 80,99 L78,105 Q72,109 66,105Z' fill='white' opacity='0.9' />}
                    {/* Cheek blush */}
                    <ellipse cx='51' cy='91' rx='7' ry='5' fill='#ff8fa3' opacity='0.35' />
                    <ellipse cx='93' cy='91' rx='7' ry='5' fill='#ff8fa3' opacity='0.35' />
                    {/* Ear */}
                    <ellipse cx='44' cy='84' rx='6' ry='9' fill='#ffa733' />
                    <ellipse cx='100' cy='84' rx='6' ry='9' fill='#ffa733' />
                </g>
            </g>
        </svg>
    )
}

export default CartoonCharacter;
