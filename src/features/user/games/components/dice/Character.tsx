"use client"

import { useEffect, useState } from "react"

const GOLD = '#f0c040'

export type TPhase = "shake" | "release" | "celebrate" | "idle";

type TCharacter = {
    phase: TPhase;
}

function Character({ phase }: TCharacter) {
    const isShaking = phase === 'shake'
    const isRelease = phase === 'release'
    const isCelebrate = phase === 'celebrate'
    const [blink, setBlink] = useState(false)
    const [armOffset, setArmOffset] = useState(0)

    useEffect(() => {
        const t = setInterval(
            () => {
                setBlink(true)
                setTimeout(() => setBlink(false), 110)
            },
            3000 + Math.random() * 800
        )

        return () => clearInterval(t)
    }, [])

    // Shake arm oscillation
    useEffect(() => {
        if (!isShaking) {
            setArmOffset(0)

            return
        }

        let frame: number;
        const start = performance.now()

        const tick = (now: number) => {
            const t = (now - start) / 80

            setArmOffset(Math.sin(t * Math.PI * 2) * 12)
            frame = requestAnimationFrame(tick)
        }

        frame = requestAnimationFrame(tick)

        return () => cancelAnimationFrame(frame)
    }, [isShaking])

    const bodyLean = isRelease ? 20 : isCelebrate ? -5 : isShaking ? armOffset * 0.3 : 0
    const smile = isRelease || isCelebrate
    const excited = isCelebrate

    return (
        <svg
            viewBox='0 0 180 220'
            width='180'
            height='220'

        // style={{ position: 'absolute', bottom: 0, left: 10, overflow: 'visible' }}
        >
            {/* Shadow */}
            <ellipse cx='80' cy='215' rx='45' ry='7' fill='rgba(0,0,0,0.4)' />

            <g
                style={{
                    transformOrigin: '80px 170px',
                    transform: `rotate(${bodyLean}deg)`,
                    transition: isShaking ? 'none' : 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)'
                }}
            >
                {/* Back arm */}
                <g
                    style={{
                        transformOrigin: '62px 128px',
                        transform: `rotate(${-armOffset * 0.5}deg)`,
                        transition: isShaking ? 'none' : 'transform 0.2s'
                    }}
                >
                    <rect x='46' y='122' width='14' height='36' rx='7' fill='#c0392b' />
                    <rect x='45' y='152' width='14' height='24' rx='7' fill='#f0b060' />
                </g>

                {/* Legs */}
                <rect
                    x='58'
                    y='178'
                    width='17'
                    height='32'
                    rx='8'
                    fill='#1a0a00'
                    style={{
                        transformOrigin: '66px 178px',
                        transform: `rotate(${isCelebrate ? -15 : 0}deg)`,
                        transition: 'transform 0.2s'
                    }}
                />
                <rect
                    x='79'
                    y='178'
                    width='17'
                    height='32'
                    rx='8'
                    fill='#1a0a00'
                    style={{
                        transformOrigin: '88px 178px',
                        transform: `rotate(${isCelebrate ? 15 : 0}deg)`,
                        transition: 'transform 0.2s'
                    }}
                />
                {/* Shoes */}
                <ellipse
                    cx='66'
                    cy='210'
                    rx='13'
                    ry='7'
                    fill='#111'
                    style={{
                        transformOrigin: '66px 178px',
                        transform: `rotate(${isCelebrate ? -15 : 0}deg)`,
                        transition: 'transform 0.2s'
                    }}
                />
                <ellipse
                    cx='88'
                    cy='210'
                    rx='13'
                    ry='7'
                    fill='#111'
                    style={{
                        transformOrigin: '88px 178px',
                        transform: `rotate(${isCelebrate ? 15 : 0}deg)`,
                        transition: 'transform 0.2s'
                    }}
                />

                {/* Torso — Chinese red jacket */}
                <rect x='52' y='118' width='52' height='64' rx='14' fill='#c0392b' />
                {/* Gold trim */}
                <rect x='52' y='118' width='52' height='8' rx='8' fill={GOLD} />
                <rect x='52' y='174' width='52' height='8' rx='6' fill={GOLD} />
                <rect x='52' y='118' width='8' height='64' rx='4' fill={GOLD} opacity='0.6' />
                <rect x='96' y='118' width='8' height='64' rx='4' fill={GOLD} opacity='0.6' />
                {/* Frog buttons */}
                {[134, 148, 162].map(y => (
                    <circle key={y} cx='78' cy={y} r='3' fill={GOLD} />
                ))}

                {/* Throwing arm with cup */}
                <g
                    style={{
                        transformOrigin: '96px 128px',
                        transform: `rotate(${isShaking ? armOffset - 20 : isRelease ? 50 : -10}deg)`,
                        transition: isShaking ? 'none' : 'transform 0.22s cubic-bezier(0.34,1.56,0.64,1)'
                    }}
                >
                    {/* Upper arm */}
                    <rect x='98' y='120' width='15' height='36' rx='7.5' fill='#c0392b' />
                    {/* Forearm */}
                    <g
                        style={{
                            transformOrigin: '105px 156px',
                            transform: `rotate(${isShaking ? armOffset * 0.6 : isRelease ? -40 : -15}deg)`,
                            transition: isShaking ? 'none' : 'transform 0.22s'
                        }}
                    >
                        <rect x='98' y='152' width='15' height='28' rx='7' fill='#f0b060' />
                        {/* Hand */}
                        <ellipse cx='105' cy='182' rx='10' ry='9' fill='#f0b060' />
                        {/* Dice cup */}
                        {!isRelease && (
                            <g transform='translate(96, 158)'>
                                <path d='M0,0 L22,0 L18,32 L4,32 Z' fill='#8B0000' stroke={GOLD} strokeWidth='1.5' />
                                <path d='M0,0 L22,0 L20,8 L2,8 Z' fill={GOLD} opacity='0.8' />
                                <rect x='2' y='10' width='18' height='2' fill={GOLD} opacity='0.5' rx='1' />
                                <rect x='3' y='14' width='16' height='2' fill={GOLD} opacity='0.4' rx='1' />
                                {/* Chinese character on cup */}
                                <text x='11' y='26' textAnchor='middle' fontSize='10' fill={GOLD} fontFamily='serif' fontWeight='bold'>
                                    骰
                                </text>
                            </g>
                        )}
                    </g>
                </g>

                {/* Head */}
                <g
                    style={{
                        transformOrigin: '78px 92px',
                        transform: `rotate(${bodyLean * 0.3}deg)`,
                        transition: 'transform 0.2s'
                    }}
                >
                    <rect x='70' y='108' width='16' height='16' rx='6' fill='#f0b060' />
                    <ellipse cx='78' cy='88' rx='28' ry='30' fill='#f0b060' />
                    {/* Hair — black, slicked */}
                    <path d='M50,80 Q52,50 78,48 Q104,50 106,80 Q100,58 78,56 Q56,58 50,80Z' fill='#1a0a00' />
                    <ellipse cx='52' cy='84' rx='6' ry='10' fill='#1a0a00' />
                    <ellipse cx='104' cy='84' rx='6' ry='10' fill='#1a0a00' />

                    {/* Eyes */}
                    <ellipse cx='65' cy='88' rx='6.5' ry={blink ? 1 : 7.5} fill='white' style={{ transition: 'ry 0.05s' }} />
                    <ellipse cx='91' cy='88' rx='6.5' ry={blink ? 1 : 7.5} fill='white' style={{ transition: 'ry 0.05s' }} />
                    {!blink && (
                        <>
                            <circle cx={67} cy={89} r='4' fill='#1a0a00' />
                            <circle cx={93} cy={89} r='4' fill='#1a0a00' />
                            <circle cx={68.5} cy={87} r='1.5' fill='white' />
                            <circle cx={94.5} cy={87} r='1.5' fill='white' />
                        </>
                    )}

                    {/* Eyebrows */}
                    <path
                        d={excited ? 'M58,75 Q65,67 72,74' : isShaking ? 'M58,76 Q65,70 72,75' : 'M58,78 Q65,73 72,78'}
                        stroke='#1a0a00'
                        strokeWidth='2.5'
                        strokeLinecap='round'
                        fill='none'
                        style={{ transition: 'd 0.2s' }}
                    />
                    <path
                        d={excited ? 'M84,74 Q91,67 98,75' : isShaking ? 'M84,75 Q91,70 98,76' : 'M84,78 Q91,73 98,78'}
                        stroke='#1a0a00'
                        strokeWidth='2.5'
                        strokeLinecap='round'
                        fill='none'
                        style={{ transition: 'd 0.2s' }}
                    />

                    {/* Mouth */}
                    <path
                        d={smile ? 'M66,102 Q78,114 90,102' : isShaking ? 'M68,101 Q78,107 88,101' : 'M68,101 Q78,106 88,101'}
                        stroke='#8B0000'
                        strokeWidth='2.5'
                        strokeLinecap='round'
                        fill='none'
                        style={{ transition: 'd 0.2s' }}
                    />
                    {smile && <path d='M68,104 Q78,113 88,104 L86,110 Q78,116 70,110Z' fill='white' opacity='0.9' />}

                    {/* Blush */}
                    <ellipse cx='52' cy='96' rx='7' ry='5' fill='#ff7070' opacity='0.3' />
                    <ellipse cx='104' cy='96' rx='7' ry='5' fill='#ff7070' opacity='0.3' />

                    {/* Ears */}
                    <ellipse cx='50' cy='90' rx='6' ry='9' fill='#e09848' />
                    <ellipse cx='106' cy='90' rx='6' ry='9' fill='#e09848' />

                    {/* Traditional cap */}
                    <ellipse cx='78' cy='60' rx='30' ry='10' fill='#8B0000' />
                    <ellipse cx='78' cy='56' rx='22' ry='8' fill='#c0392b' />
                    <rect x='56' y='50' width='44' height='10' rx='3' fill='#8B0000' />
                    <ellipse cx='78' cy='50' rx='16' ry='12' fill='#c0392b' />
                    {/* Cap button */}
                    <circle cx='78' cy='42' r='4' fill={GOLD} />
                    <circle cx='78' cy='42' r='2' fill='#8B0000' />
                    {/* Cap rim gold trim */}
                    <path d='M48,60 Q78,68 108,60' stroke={GOLD} strokeWidth='2' fill='none' />
                </g>
            </g>
        </svg>
    )
}

export default Character;
