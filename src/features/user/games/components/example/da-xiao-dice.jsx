'use client'

import { useState, useEffect, useRef } from 'react'

// ─── Da Xiao (大小) — Big / Small dice game ─────────────────────
// 2 dice, sum 2-6 = XIAO (小 Small), sum 7 = MIDDLE, sum 8-12 = DA (大 Big)
// Traditional Sic Bo variant

const RED = '#c0392b'
const DARKRED = '#8b0000'
const GOLD = '#f0c040'
const DARKBG = '#0f0a04'
const FELT = '#0a1f0a'

function getDaXiao(sum) {
  if (sum <= 6) return { label: '小 XIAO', sub: 'SMALL', color: '#4fc3f7', win: 'xiao' }
  if (sum >= 8) return { label: '大 DA', sub: 'BIG', color: RED, win: 'da' }

  return { label: '中 ZHONG', sub: 'MIDDLE', color: GOLD, win: 'middle' }
}

// Dot positions for each face
const DOT_POSITIONS = {
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

function DieSVG({ value, size = 80 }) {
  const dots = DOT_POSITIONS[value] || DOT_POSITIONS[1]
  const isOne = value === 1

  return (
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
  )
}

// ─── Cartoon character (cup shaker) ──────────────────────────────
function ShakeCharacter({ phase }) {
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

    let frame
    let start = performance.now()

    const tick = now => {
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
      style={{ position: 'absolute', bottom: 0, left: 10, overflow: 'visible' }}
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

// ─── Main Game ────────────────────────────────────────────────────
export default function DaXiaoGame() {
  const [phase, setPhase] = useState('idle') // idle|shake|release|rolling|result
  const [bet, setBet] = useState(null)
  const [dice, setDice] = useState([1, 4])
  const [rollingDice, setRollingDice] = useState([1, 4])
  const [scores, setScores] = useState({ wins: 0, losses: 0, streak: 0 })
  const [showResult, setShowResult] = useState(false)
  const [history, setHistory] = useState([])
  const rollInterval = useRef(null)
  const timeouts = useRef([])

  const sum = dice[0] + dice[1]
  const outcome = getDaXiao(sum)

  const clearAll = () => {
    timeouts.current.forEach(clearTimeout)
    clearInterval(rollInterval.current)
  }

  const handleRoll = () => {
    if (!bet || phase !== 'idle') return
    clearAll()
    setShowResult(false)
    setPhase('shake')

    // Shake for 1.6s — randomize display dice during shake
    rollInterval.current = setInterval(() => {
      setRollingDice([Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6)])
    }, 90)

    const t1 = setTimeout(() => {
      setPhase('release')
      clearInterval(rollInterval.current)

      // Final dice values
      const d1 = Math.ceil(Math.random() * 6)
      const d2 = Math.ceil(Math.random() * 6)

      setDice([d1, d2])
      setRollingDice([d1, d2])

      const t2 = setTimeout(() => {
        setPhase('result')
        setShowResult(true)
        const finalSum = d1 + d2
        const res = getDaXiao(finalSum)
        const won = bet === res.win

        setScores(prev => ({
          wins: won ? prev.wins + 1 : prev.wins,
          losses: !won ? prev.losses + 1 : prev.losses,
          streak: won ? prev.streak + 1 : 0
        }))
        setHistory(prev => [{ d1, d2, sum: finalSum, res, won }, ...prev].slice(0, 6))

        const t3 = setTimeout(() => {
          setPhase(won ? 'celebrate' : 'idle')
          const t4 = setTimeout(() => setPhase('idle'), 1200)

          timeouts.current.push(t4)
        }, 600)

        timeouts.current.push(t3)

        const t5 = setTimeout(() => setShowResult(false), 2800)

        timeouts.current.push(t5)
      }, 500)

      timeouts.current.push(t2)
    }, 1600)

    timeouts.current.push(t1)
  }

  const isAnimating = phase !== 'idle' && phase !== 'celebrate'
  const displayDice = phase === 'shake' ? rollingDice : dice

  return (
    <div style={S.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700;900&family=Oswald:wght@400;600;700&display=swap');
        @keyframes diceShake {
          0%,100% { transform: translate(0,0) rotate(0deg); }
          20% { transform: translate(-4px, -6px) rotate(-8deg); }
          40% { transform: translate(4px, -8px) rotate(8deg); }
          60% { transform: translate(-3px, -5px) rotate(-5deg); }
          80% { transform: translate(3px, -4px) rotate(5deg); }
        }
        @keyframes diceLand {
          0% { transform: translateY(-30px) rotate(20deg); opacity:0.5; }
          60% { transform: translateY(4px) rotate(-3deg); }
          80% { transform: translateY(-4px) rotate(1deg); }
          100% { transform: translateY(0) rotate(0deg); opacity:1; }
        }
        @keyframes resultPop {
          0% { transform: scale(0.4) translateY(10px); opacity:0; }
          70% { transform: scale(1.1) translateY(-2px); opacity:1; }
          100% { transform: scale(1) translateY(0); opacity:1; }
        }
        @keyframes glowPulse {
          0%,100% { box-shadow: 0 0 20px rgba(240,192,64,0.2); }
          50% { box-shadow: 0 0 40px rgba(240,192,64,0.5); }
        }
        @keyframes lanternSway {
          0%,100% { transform: rotate(-4deg); }
          50% { transform: rotate(4deg); }
        }
        .dice-shaking { animation: diceShake 0.18s infinite; }
        .dice-landing { animation: diceLand 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .result-pop { animation: resultPop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .glow-pulse { animation: glowPulse 2s ease-in-out infinite; }
        .lantern { animation: lanternSway 3s ease-in-out infinite; transform-origin: top center; }
        .lantern2 { animation: lanternSway 3s ease-in-out infinite reverse; transform-origin: top center; }
      `}</style>

      {/* Background */}
      <div style={S.bgPattern} />
      <div style={S.bgGlow} />

      {/* Lanterns decoration */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 20px',
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        <Lantern className='lantern' />
        <Lantern className='lantern2' />
      </div>

      <div style={S.card} className='glow-pulse'>
        {/* Header */}
        <div style={S.header}>
          <div style={S.chineseTitle}>大小</div>
          <div style={S.title}>DA XIAO</div>
          <div style={S.subtitle}>大 BIG · 小 SMALL</div>
        </div>

        {/* Stage */}
        <div style={S.stage}>
          {/* Felt table */}
          <div style={S.felt} />

          {/* Character */}
          <ShakeCharacter phase={phase} />

          {/* Dice area */}
          <div style={S.diceArea}>
            {displayDice.map((val, i) => (
              <div
                key={i}
                className={phase === 'shake' ? 'dice-shaking' : phase === 'release' ? 'dice-landing' : ''}
                style={{
                  animationDelay: i === 1 ? '0.04s' : '0s',
                  filter: phase === 'result' ? `drop-shadow(0 0 10px ${outcome.color}88)` : 'none',
                  transition: 'filter 0.3s'
                }}
              >
                <DieSVG value={val} size={72} />
              </div>
            ))}
          </div>

          {/* Sum badge */}
          <div style={S.sumBadge}>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>SUM</span>
            <span
              style={{ color: GOLD, fontFamily: "'Oswald', sans-serif", fontSize: 22, fontWeight: 700, lineHeight: 1 }}
            >
              {displayDice[0] + displayDice[1]}
            </span>
          </div>

          {/* Result banner */}
          {showResult && (
            <div
              className='result-pop'
              style={{
                position: 'absolute',
                top: 8,
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(0,0,0,0.85)',
                border: `2px solid ${outcome.color}`,
                borderRadius: 14,
                padding: '8px 20px',
                textAlign: 'center',
                zIndex: 10,
                boxShadow: `0 0 30px ${outcome.color}66`,
                minWidth: 130
              }}
            >
              <div
                style={{
                  fontFamily: "'Noto Serif SC', serif",
                  fontSize: 26,
                  color: outcome.color,
                  lineHeight: 1,
                  fontWeight: 900
                }}
              >
                {outcome.label.split(' ')[0]}
              </div>
              <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: 13, color: outcome.color, letterSpacing: 3 }}>
                {outcome.sub}
              </div>
              <div
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.5)',
                  marginTop: 2
                }}
              >
                {bet === outcome.win ? '✓ YOU WIN' : '✗ YOU LOSE'}
              </div>
            </div>
          )}
        </div>

        {/* Bet buttons */}
        <div style={S.betLabel}>PLACE YOUR BET</div>
        <div style={S.betRow}>
          {[
            { key: 'xiao', zh: '小', label: 'XIAO', sub: '2–6', color: '#4fc3f7' },
            { key: 'middle', zh: '中', label: 'ZHONG', sub: '7', color: GOLD },
            { key: 'da', zh: '大', label: 'DA', sub: '8–12', color: RED }
          ].map(({ key, zh, label, sub, color }) => (
            <button
              key={key}
              onClick={() => !isAnimating && setBet(key)}
              disabled={isAnimating}
              style={{
                ...S.betBtn,
                borderColor: bet === key ? color : 'rgba(255,255,255,0.08)',
                background: bet === key ? `${color}18` : 'rgba(0,0,0,0.3)',
                boxShadow: bet === key ? `0 0 20px ${color}33` : 'none',
                opacity: isAnimating ? 0.5 : 1,
                cursor: isAnimating ? 'not-allowed' : 'pointer'
              }}
            >
              <div
                style={{
                  fontFamily: "'Noto Serif SC', serif",
                  fontSize: 28,
                  color: bet === key ? color : 'rgba(255,255,255,0.5)',
                  lineHeight: 1,
                  fontWeight: 900
                }}
              >
                {zh}
              </div>
              <div
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 13,
                  letterSpacing: 2,
                  color: bet === key ? color : 'rgba(255,255,255,0.4)',
                  marginTop: 2
                }}
              >
                {label}
              </div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: 1 }}>{sub}</div>
            </button>
          ))}
        </div>

        {/* Roll button */}
        <button
          onClick={handleRoll}
          disabled={!bet || isAnimating}
          style={{
            ...S.rollBtn,
            opacity: !bet || isAnimating ? 0.45 : 1,
            cursor: !bet || isAnimating ? 'not-allowed' : 'pointer'
          }}
        >
          {phase === 'shake' ? '摇骰子...' : phase === 'release' ? '揭晓!' : '摇 ROLL 摇'}
        </button>

        {/* Score + history row */}
        <div style={S.bottomRow}>
          <div style={S.scoreBox}>
            <div style={S.scoreLabel}>胜 WINS</div>
            <div style={{ ...S.scoreValue, color: '#4fc3f7' }}>{scores.wins}</div>
          </div>
          <div style={S.scoreBox}>
            <div style={S.scoreLabel}>败 LOSSES</div>
            <div style={{ ...S.scoreValue, color: RED }}>{scores.losses}</div>
          </div>
          <div style={S.scoreBox}>
            <div style={S.scoreLabel}>连 STREAK</div>
            <div style={{ ...S.scoreValue, color: GOLD }}>{scores.streak}</div>
          </div>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div style={S.history}>
            {history.map((h, i) => (
              <div
                key={i}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  background: h.won ? 'rgba(79,195,247,0.15)' : 'rgba(192,57,43,0.15)',
                  border: `1px solid ${h.won ? '#4fc3f7' : RED}44`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}
              >
                <div style={{ fontFamily: "'Noto Serif SC'", fontSize: 10, color: h.res.color, lineHeight: 1 }}>
                  {h.res.label.split(' ')[0]}
                </div>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)' }}>{h.sum}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function Lantern({ className }) {
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

// ─── Styles ───────────────────────────────────────────────────────
const S = {
  root: {
    minHeight: '100vh',
    background: DARKBG,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Oswald', sans-serif",
    position: 'relative',
    overflow: 'hidden'
  },
  bgPattern: {
    position: 'fixed',
    inset: 0,
    backgroundImage: `repeating-linear-gradient(45deg, rgba(192,57,43,0.04) 0px, rgba(192,57,43,0.04) 1px, transparent 1px, transparent 20px),
      repeating-linear-gradient(-45deg, rgba(192,57,43,0.04) 0px, rgba(192,57,43,0.04) 1px, transparent 1px, transparent 20px)`,
    pointerEvents: 'none'
  },
  bgGlow: {
    position: 'fixed',
    inset: 0,
    background: 'radial-gradient(ellipse at center, rgba(192,57,43,0.08) 0%, transparent 65%)',
    pointerEvents: 'none'
  },
  card: {
    position: 'relative',
    zIndex: 1,
    background: 'rgba(10,5,0,0.92)',
    border: `1px solid rgba(240,192,64,0.25)`,
    borderRadius: 24,
    padding: '32px 28px 28px',
    width: 380,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 18
  },
  header: { textAlign: 'center' },
  chineseTitle: {
    fontFamily: "'Noto Serif SC', serif",
    fontSize: 52,
    fontWeight: 900,
    color: GOLD,
    lineHeight: 1,
    textShadow: `0 0 30px rgba(240,192,64,0.6)`
  },
  title: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: 10,
    color: 'rgba(240,192,64,0.7)',
    marginTop: 2
  },
  subtitle: {
    fontSize: 10,
    letterSpacing: 3,
    color: 'rgba(255,255,255,0.25)',
    marginTop: 4
  },
  stage: {
    position: 'relative',
    width: '100%',
    height: 210,
    borderRadius: 16,
    overflow: 'visible',
    background: 'rgba(0,0,0,0.4)',
    border: '1px solid rgba(255,255,255,0.05)'
  },
  felt: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    background: `linear-gradient(to top, ${FELT}, transparent)`,
    borderRadius: '0 0 16px 16px'
  },
  diceArea: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    gap: 12,
    flexDirection: 'column',
    alignItems: 'center'
  },
  sumBadge: {
    position: 'absolute',
    bottom: 10,
    right: 16,
    background: 'rgba(0,0,0,0.6)',
    border: `1px solid rgba(240,192,64,0.25)`,
    borderRadius: 8,
    padding: '4px 10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 1
  },
  betLabel: {
    fontSize: 9,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.25)',
    alignSelf: 'flex-start'
  },
  betRow: {
    display: 'flex',
    gap: 10,
    width: '100%'
  },
  betBtn: {
    flex: 1,
    padding: '12px 6px',
    borderRadius: 12,
    border: '1px solid',
    cursor: 'pointer',
    transition: 'all 0.2s',
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2
  },
  rollBtn: {
    width: '100%',
    padding: '15px 0',
    borderRadius: 14,
    border: `none`,
    background: `linear-gradient(135deg, ${DARKRED}, ${RED})`,
    color: GOLD,
    fontFamily: "'Noto Serif SC', serif",
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: 4,
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: `0 4px 24px rgba(192,57,43,0.4)`,
    outline: 'none'
  },
  bottomRow: {
    display: 'flex',
    gap: 12,
    width: '100%'
  },
  scoreBox: {
    flex: 1,
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 10,
    padding: '8px 10px',
    textAlign: 'center'
  },
  scoreLabel: {
    fontSize: 9,
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.25)',
    marginBottom: 2
  },
  scoreValue: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: 26,
    fontWeight: 700,
    lineHeight: 1
  },
  history: {
    display: 'flex',
    gap: 6,
    width: '100%',
    justifyContent: 'center',
    flexWrap: 'wrap'
  }
}
