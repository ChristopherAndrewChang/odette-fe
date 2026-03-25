"use client";

type TCoinSVG = {
    size: number;
    face: "tails" | "heads";
}

function CoinSVG({ size, face }: TCoinSVG) {
    // const r = size / 2
    // const s = size / 80 // scale factor based on 80px base

    return (
        <svg width={size} height={size} viewBox='0 0 80 80' style={{ display: 'block' }}>
            <defs>
                <radialGradient id='coinGrad' cx='38%' cy='32%'>
                    <stop offset='0%' stopColor='#f0d060' />
                    <stop offset='40%' stopColor='#c8a020' />
                    <stop offset='80%' stopColor='#a07810' />
                    <stop offset='100%' stopColor='#7a5808' />
                </radialGradient>
                <radialGradient id='coinGradBack' cx='38%' cy='32%'>
                    <stop offset='0%' stopColor='#e8c840' />
                    <stop offset='50%' stopColor='#b89018' />
                    <stop offset='100%' stopColor='#806008' />
                </radialGradient>
                <filter id='emboss'>
                    <feGaussianBlur stdDeviation='0.3' result='blur' />
                    <feComposite in='SourceGraphic' in2='blur' />
                </filter>
            </defs>

            {/* Base coin disc */}
            <circle cx='40' cy='40' r='39' fill={face === 'tails' ? 'url(#coinGradBack)' : 'url(#coinGrad)'} />

            {/* Outer rim */}
            <circle cx='40' cy='40' r='39' fill='none' stroke='#6a4a06' strokeWidth='1.5' />
            <circle cx='40' cy='40' r='36.5' fill='none' stroke='rgba(255,230,80,0.5)' strokeWidth='0.8' />
            <circle cx='40' cy='40' r='35' fill='none' stroke='#5a3c04' strokeWidth='0.5' />

            {/* Milled edge dots */}
            {Array.from({ length: 60 }).map((_, i) => {
                const angle = (i / 60) * Math.PI * 2
                const x = 40 + 37.5 * Math.cos(angle)
                const y = 40 + 37.5 * Math.sin(angle)

                return <circle key={i} cx={x} cy={y} r='0.7' fill='#5a3c04' opacity='0.6' />
            })}

            {/* ── HEADS: Garuda Pancasila ── */}
            {(face === 'heads' || !face) && (
                <g transform='translate(40,38)'>
                    {/* Body of Garuda */}
                    <ellipse cx='0' cy='4' rx='10' ry='13' fill='#7a5808' />
                    <ellipse cx='0' cy='4' rx='8' ry='11' fill='#9a7010' />

                    {/* Chest shield (Pancasila) */}
                    <path d='M-5,0 L5,0 L6,10 L0,14 L-6,10 Z' fill='#c8a020' stroke='#7a5808' strokeWidth='0.5' />
                    {/* Shield lines */}
                    <line x1='-5' y1='5' x2='5' y2='5' stroke='#7a5808' strokeWidth='0.4' />
                    <line x1='0' y1='0' x2='0' y2='14' stroke='#7a5808' strokeWidth='0.4' />

                    {/* Head */}
                    <circle cx='0' cy='-11' r='6.5' fill='#9a7010' />
                    <circle cx='0' cy='-11' r='5' fill='#b88c18' />

                    {/* Beak */}
                    <path d='M0,-8 L3,-6 L0,-5 Z' fill='#7a5808' />
                    <path d='M0,-8 L-3,-6 L0,-5 Z' fill='#6a4a06' />

                    {/* Eye */}
                    <circle cx='-2' cy='-12' r='1.2' fill='#3a2a00' />
                    <circle cx='2' cy='-12' r='1.2' fill='#3a2a00' />
                    <circle cx='-1.5' cy='-12.3' r='0.4' fill='rgba(255,255,255,0.6)' />
                    <circle cx='2.5' cy='-12.3' r='0.4' fill='rgba(255,255,255,0.6)' />

                    {/* Crown / crest */}
                    <path d='M-4,-16 L-2,-12 L0,-17 L2,-12 L4,-16 L3,-11 L-3,-11 Z' fill='#c8a020' />

                    {/* Left wing */}
                    <g transform='rotate(-15, -8, 0)'>
                        <path d='M-8,0 C-18,-8 -26,-4 -28,2 C-24,0 -20,2 -16,6 C-14,2 -10,0 -8,0Z' fill='#9a7010' />
                        <path d='M-8,0 C-16,-6 -22,-2 -24,2 C-20,1 -16,3 -13,6 C-11,2 -9,0 -8,0Z' fill='#b08818' />
                        {/* Wing feathers */}
                        {[-10, -14, -18, -22].map((x, i) => (
                            <line key={i} x1={x} y1={i * 1.5 - 4} x2={x - 3} y2={i * 1.5 + 2} stroke='#7a5808' strokeWidth='0.5' />
                        ))}
                    </g>

                    {/* Right wing */}
                    <g transform='scale(-1,1) rotate(-15, -8, 0)'>
                        <path d='M-8,0 C-18,-8 -26,-4 -28,2 C-24,0 -20,2 -16,6 C-14,2 -10,0 -8,0Z' fill='#9a7010' />
                        <path d='M-8,0 C-16,-6 -22,-2 -24,2 C-20,1 -16,3 -13,6 C-11,2 -9,0 -8,0Z' fill='#b08818' />
                        {[-10, -14, -18, -22].map((x, i) => (
                            <line key={i} x1={x} y1={i * 1.5 - 4} x2={x - 3} y2={i * 1.5 + 2} stroke='#7a5808' strokeWidth='0.5' />
                        ))}
                    </g>

                    {/* Tail feathers */}
                    <path d='M-6,14 C-8,20 -6,24 0,26 C6,24 8,20 6,14Z' fill='#9a7010' />
                    <path d='M-3,14 C-4,20 -2,24 0,25 C2,24 4,20 3,14Z' fill='#b08818' />
                    {/* Tail lines */}
                    {[-3, 0, 3].map((x, i) => (
                        <line key={i} x1={x} y1='14' x2={x} y2='25' stroke='#7a5808' strokeWidth='0.5' />
                    ))}

                    {/* Claws / feet */}
                    <path
                        d='M-5,15 L-8,20 M-5,15 L-6,21 M-5,15 L-3,21'
                        stroke='#7a5808'
                        strokeWidth='1.2'
                        strokeLinecap='round'
                    />
                    <path d='M5,15 L8,20 M5,15 L6,21 M5,15 L3,21' stroke='#7a5808' strokeWidth='1.2' strokeLinecap='round' />

                    {/* Banner ribbon */}
                    <path d='M-12,22 Q0,26 12,22 Q10,29 0,30 Q-10,29 -12,22Z' fill='#c8a020' stroke='#7a5808' strokeWidth='0.5' />
                    <text x='0' y='28' textAnchor='middle' fontSize='4.5' fill='#5a3c04' fontFamily='serif' fontWeight='bold'>
                        BHINNEKA
                    </text>
                </g>
            )}

            {/* ── TAILS: 500 Rupiah text side ── */}
            {face === 'tails' && (
                <g>
                    {/* BANK INDONESIA arc top */}
                    <path id='arcTop' d='M 12,40 A 28,28 0 0,1 68,40' fill='none' />
                    <text fontSize='5.5' fill='#5a3c04' fontFamily='serif' fontWeight='bold'>
                        <textPath href='#arcTop' startOffset='10%'>
                            BANK INDONESIA
                        </textPath>
                    </text>

                    {/* 500 big number */}
                    <text
                        x='40'
                        y='47'
                        textAnchor='middle'
                        fontSize='22'
                        fill='#5a3c04'
                        fontFamily='serif'
                        fontWeight='bold'
                        letterSpacing='-1'
                    >
                        500
                    </text>

                    {/* RUPIAH label */}
                    <text
                        x='40'
                        y='57'
                        textAnchor='middle'
                        fontSize='6.5'
                        fill='#7a5808'
                        fontFamily='serif'
                        fontWeight='bold'
                        letterSpacing='2'
                    >
                        RUPIAH
                    </text>

                    {/* Year at bottom */}
                    <path id='arcBot' d='M 16,44 A 26,26 0 0,0 64,44' fill='none' />
                    <text fontSize='4.5' fill='#7a5808' fontFamily='serif'>
                        <textPath href='#arcBot' startOffset='22%'>
                            2003
                        </textPath>
                    </text>

                    {/* Decorative stars */}
                    <text x='18' y='45' textAnchor='middle' fontSize='5' fill='#9a7010'>
                        ✦
                    </text>
                    <text x='62' y='45' textAnchor='middle' fontSize='5' fill='#9a7010'>
                        ✦
                    </text>
                </g>
            )}

            {/* Highlight sheen */}
            <ellipse cx='30' cy='26' rx='12' ry='7' fill='rgba(255,245,180,0.18)' transform='rotate(-30,30,26)' />
        </svg>
    )
}

export default CoinSVG;
