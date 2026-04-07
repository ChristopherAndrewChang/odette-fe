"use client";

type TResultBannerNoBet = {
    result: number;
    category: string;
    color: string;
}

function ResultBannerNoBet({ result, category, color }: TResultBannerNoBet) {
    return (
        <div
            className='result-pop'
            style={{
                position: 'absolute',
                top: 8,
                right: "50%",
                transform: 'translateX(50%)',
                background: 'rgba(0,0,0,0.85)',
                border: `2px solid ${color}`,
                borderRadius: 14,
                padding: '8px 20px',
                textAlign: 'center',
                zIndex: 10,
                minWidth: 130
            }}
        >
            <div
                style={{
                    fontFamily: "'Poppins'",
                    fontSize: 26,
                    color: color,
                    lineHeight: 1,
                    fontWeight: 900
                }}
            >
                {result}
            </div>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 13, color: color, letterSpacing: 3 }}>
                {category}
            </div>
        </div>
    )
}

export default ResultBannerNoBet;
