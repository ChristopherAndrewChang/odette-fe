import classNames from "classnames";

const RED = '#c0392b'

const DOT_POSITIONS: Record<number, number[][]> = {
    1: [[50, 50]],
    2: [
        [25, 25],
        [75, 75]
    ],
    3: [
        [25, 25],
        [50, 50],
        [75, 75]
    ],
    4: [
        [25, 25],
        [75, 25],
        [25, 75],
        [75, 75]
    ],
    5: [
        [25, 25],
        [75, 25],
        [50, 50],
        [25, 75],
        [75, 75]
    ],
    6: [
        [25, 22],
        [75, 22],
        [25, 50],
        [75, 50],
        [25, 78],
        [75, 78]
    ]
}

type TDice = {
    value: number;
    size: number;
    mode: "shake" | "normal";
}

export function Dice({ value, size = 80, mode }: TDice) {
    const dots = DOT_POSITIONS[value] || DOT_POSITIONS[1]
    const isOne = value === 1

    return (
        <div>
            <div className={classNames({
                "dice-shaking": mode === "shake"
            })}>
                <svg width={size} height={size} viewBox='0 0 100 100'>
                    <defs>
                        <radialGradient id={`dg${value}`} cx='35%' cy='30%'>
                            <stop offset='0%' stopColor='#fff8f0' />
                            <stop offset='60%' stopColor='#f0e8d8' />
                            <stop offset='100%' stopColor='#c8b898' />
                        </radialGradient>
                        <filter id='dshadow'>
                            <feDropShadow dx='2' dy='3' stdDeviation='3' floodOpacity='0.4' />
                        </filter>
                    </defs>
                    {/* Die body */}
                    <rect
                        x='4'
                        y='4'
                        width='92'
                        height='92'
                        rx='18'
                        ry='18'
                        fill={`url(#dg${value})`}
                        filter='url(#dshadow)'
                        stroke='#a09070'
                        strokeWidth='1.5'
                    />
                    {/* Top highlight */}
                    <rect x='8' y='8' width='84' height='40' rx='14' ry='14' fill='rgba(255,255,255,0.25)' />
                    {/* Dots */}
                    {dots.map(([cx, cy], i) => (
                        <circle
                            key={i}
                            cx={cx}
                            cy={cy}
                            r={isOne ? 11 : 8}
                            fill={RED}
                            style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.4))' }}
                        />
                    ))}
                </svg>
            </div>
        </div>
    )
}
