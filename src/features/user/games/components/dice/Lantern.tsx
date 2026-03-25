"use client";

import { DICE_GAME_COLOR } from "../../data/colors";

const GOLD = DICE_GAME_COLOR.GOLD;
const DARKRED = DICE_GAME_COLOR.DARKRED;
const RED = DICE_GAME_COLOR.RED;

type TLantern = {
    className?: string;
}

function Lantern({ className }: TLantern) {
    return (
        <svg className={className} width='36' height='70' viewBox='0 0 36 70' style={{ marginTop: -4 }}>
            <line x1='18' y1='0' x2='18' y2='8' stroke={GOLD} strokeWidth='1.5' />
            <ellipse cx='18' cy='10' rx='8' ry='3' fill={GOLD} />
            <ellipse cx='18' cy='42' rx='14' ry='4' fill={DARKRED} />
            <rect x='4' y='10' width='28' height='32' rx='14' fill={RED} />
            <rect x='7' y='10' width='22' height='32' rx='11' fill={DARKRED} opacity='0.4' />
            {[14, 22, 30].map(y => (
                <line key={y} x1='4' y1={y} x2='32' y2={y} stroke={GOLD} strokeWidth='0.6' opacity='0.5' />
            ))}
            <text x='18' y='31' textAnchor='middle' fontSize='14' fill={GOLD} fontFamily='serif' fontWeight='bold'>
                福
            </text>
            <ellipse cx='18' cy='42' rx='8' ry='3' fill={GOLD} />
            <line x1='12' y1='45' x2='10' y2='58' stroke={GOLD} strokeWidth='1' />
            <line x1='18' y1='45' x2='18' y2='60' stroke={GOLD} strokeWidth='1' />
            <line x1='24' y1='45' x2='26' y2='58' stroke={GOLD} strokeWidth='1' />
            <ellipse cx='10' cy='59' rx='3' ry='2' fill={RED} />
            <ellipse cx='18' cy='61' rx='3' ry='2' fill={RED} />
            <ellipse cx='26' cy='59' rx='3' ry='2' fill={RED} />
        </svg>
    )
}

export default Lantern
