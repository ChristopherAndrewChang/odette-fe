"use client";

import { useColor } from "@/hooks/color";

type TResultLabelNoBet = {
    showResult: boolean;
    result: "tails" | "heads";
}

function ResultLabelNoBet({ result, showResult }: TResultLabelNoBet) {
    const { GOLD } = useColor();

    return (
        <div
            style={{
                position: 'absolute',
                right: 16,
                top: 14,
                fontSize: 32,
                letterSpacing: 5,
                color: 'white',
                textShadow: '0 0 20px rgba(255,255,255,0.3)',
                transition: 'opacity 0.35s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                display: 'flex',
                alignItems: 'center',
                zIndex: 10,
                opacity: showResult ? 1 : 0,
                transform: showResult ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(12px)'
            }}
        >
            <span style={{ color: result === 'heads' ? GOLD : '#e0e0e0' }}>
                {result === 'heads' ? 'HEAD' : result === 'tails' ? 'TAIL' : ''}
            </span>
        </div>
    )
}

export default ResultLabelNoBet
