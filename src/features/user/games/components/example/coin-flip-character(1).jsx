'use client'

import { useState, useEffect, useRef } from 'react'

/* ─── Animation phases ───────────────────────────────────────────────
   idle → windup → throw → coin-flying → land → result → idle
─────────────────────────────────────────────────────────────────── */

const GOLD = '#F5C518'
const DARK = '#0d0b14'

export default function CoinFlipGame() {
  const [phase, setPhase] = useState('idle') // idle | windup | throw | flying | land | result
  const [bet, setBet] = useState(null)
  const [result, setResult] = useState(null)
  const [scores, setScores] = useState({ wins: 0, losses: 0 })
  const [coinPos, setCoinPos] = useState({ x: 90, y: 155 }) // starts in hand
  const [coinAngle, setCoinAngle] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [particles, setParticles] = useState([])
  const rafRef = useRef(null)
  const startTimeRef = useRef(null)
  const outcomeRef = useRef(null)

  // Animate the coin arc when in "flying" phase
  useEffect(() => {
    if (phase !== 'flying') return

    const duration = 1200

    const startX = 100,
      startY = 80

    const peakX = 200,
      peakY = -40

    const endX = 200,
      endY = 140

    startTimeRef.current = performance.now()

    const animate = now => {
      const elapsed = now - startTimeRef.current
      const t = Math.min(elapsed / duration, 1)
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

      // Quadratic bezier arc
      const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * peakX + t * t * endX
      const y = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * peakY + t * t * endY

      setCoinPos({ x, y })
      setCoinAngle(t * 1440)

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setPhase('land')

        // spawn particles
        const pts = Array.from({ length: 14 }, (_, i) => ({
          id: i,
          angle: (i / 14) * 360,
          dist: 30 + Math.random() * 40,
          color: i % 3 === 0 ? '#fff' : i % 2 === 0 ? GOLD : '#ff9f1c'
        }))

        setParticles(pts)
        setTimeout(() => {
          setShowResult(true)
          const won = bet === outcomeRef.current

          setScores(prev => ({
            wins: won ? prev.wins + 1 : prev.wins,
            losses: !won ? prev.losses + 1 : prev.losses
          }))
          setTimeout(() => setParticles([]), 800)
          setTimeout(() => {
            setPhase('idle')
            setShowResult(false)
          }, 2200)
        }, 300)
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(rafRef.current)
  }, [phase])

  const handleFlip = () => {
    if (!bet || phase !== 'idle') return
    const outcome = Math.random() < 0.5 ? 'heads' : 'tails'

    outcomeRef.current = outcome
    setResult(outcome)
    setShowResult(false)
    setCoinPos({ x: 90, y: 155 })
    setCoinAngle(0)

    setPhase('windup')
    setTimeout(() => {
      setPhase('throw')
      setTimeout(() => setPhase('flying'), 180)
    }, 500)
  }

  const isAnimating = phase !== 'idle'
  const isWindup = phase === 'windup' || phase === 'throw'
  const showCoinInHand = phase === 'idle' || phase === 'windup' || phase === 'throw'
  const showCoinFlying = phase === 'flying' || phase === 'land' || phase === 'result'

  return (
    <div style={styles.root}>
      {/* Background ambience */}
      <div style={styles.bgGlow} />
      <div style={styles.scanlines} />

      <div style={styles.card}>
        {/* Title */}
        <div style={styles.titleBlock}>
          <div style={styles.title}>FLIP IT</div>
          <div style={styles.subtitle}>NIGHTCLUB EDITION</div>
        </div>

        {/* Stage */}
        <div style={styles.stage}>
          {/* Floor / spotlight */}
          <div style={styles.spotlight} />

          {/* Flying coin */}
          {showCoinFlying && (
            <div
              style={{
                ...styles.flyingCoin,
                left: coinPos.x,
                top: coinPos.y,
                transform: `translate(-50%, -50%) rotateY(${coinAngle}deg)`
              }}
            >
              <CoinSVG size={44} face={result} />
            </div>
          )}

          {/* Particle burst */}
          {particles.map(p => {
            const rad = (p.angle * Math.PI) / 180

            return (
              <div
                key={p.id}
                style={{
                  position: 'absolute',
                  left: coinPos.x,
                  top: coinPos.y,
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: p.color,
                  transform: `translate(${Math.cos(rad) * p.dist}px, ${Math.sin(rad) * p.dist}px)`,
                  opacity: 0,
                  animation: 'poof 0.7s ease-out forwards',
                  animationDelay: `${Math.random() * 0.1}s`
                }}
              />
            )
          })}

          {/* Character SVG */}
          <CartoonCharacter phase={phase} showCoinInHand={showCoinInHand} result={result} />

          {/* Result label */}
          <div
            style={{
              ...styles.resultLabel,
              opacity: showResult ? 1 : 0,
              transform: showResult ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(12px)'
            }}
          >
            <span style={{ color: result === 'heads' ? GOLD : '#e0e0e0' }}>
              {result === 'heads' ? 'GARUDA' : result === 'tails' ? '500' : ''}
            </span>
            <span style={{ fontSize: 18, marginLeft: 8 }}>{showResult && (bet === result ? '✓' : '✗')}</span>
          </div>
        </div>

        {/* Score */}
        <div style={styles.scoreRow}>
          {[
            ['WINS', scores.wins, GOLD],
            ['LOSSES', scores.losses, '#888']
          ].map(([label, val, color]) => (
            <div key={label} style={styles.scoreBox}>
              <div style={styles.scoreLabel}>{label}</div>
              <div style={{ ...styles.scoreValue, color }}>{val}</div>
            </div>
          ))}
        </div>

        {/* Bet */}
        <div style={styles.betLabel}>PLACE YOUR BET</div>
        <div style={styles.betRow}>
          {[
            ['heads', 'GARUDA'],
            ['tails', '500']
          ].map(([side, label]) => (
            <button
              key={side}
              style={{
                ...styles.betBtn,
                ...(bet === side ? styles.betBtnSelected : {}),
                opacity: isAnimating ? 0.4 : 1,
                cursor: isAnimating ? 'not-allowed' : 'pointer'
              }}
              onClick={() => !isAnimating && setBet(side)}
              disabled={isAnimating}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          style={{
            ...styles.flipBtn,
            opacity: !bet || isAnimating ? 0.45 : 1,
            cursor: !bet || isAnimating ? 'not-allowed' : 'pointer',
            transform: !bet || isAnimating ? 'none' : undefined
          }}
          onClick={handleFlip}
          disabled={!bet || isAnimating}
        >
          {isAnimating ? 'FLIPPING...' : 'FLIP COIN'}
        </button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes poof {
          0%   { opacity:1; transform: translate(var(--tx,0), var(--ty,0)) scale(1); }
          100% { opacity:0; transform: translate(var(--tx,0), var(--ty,0)) scale(0) translateY(-20px); }
        }
        @keyframes blink {
          0%,90%,100% { scaleY: 1; }
          95% { scaleY: 0.05; }
        }
      `}</style>
    </div>
  )
}

/* ─── Cartoon Character ─────────────────────────────────────────── */
function CartoonCharacter({ phase, showCoinInHand, result }) {
  // Body parts animate based on phase
  const isWindup = phase === 'windup'
  const isThrow = phase === 'throw'
  const isLand = phase === 'land'
  const isIdle = phase === 'idle'

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
        position: 'absolute',
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
                <CoinSVG size={20} face={null} />
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

/* ─── Indonesian 500 Rupiah Coin SVG ───────────────────────────── */
function CoinSVG({ size, face }) {
  const r = size / 2
  const s = size / 80 // scale factor based on 80px base

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

/* ─── Styles ────────────────────────────────────────────────────── */
const styles = {
  root: {
    minHeight: '100vh',
    background: DARK,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'DM Sans', sans-serif",
    position: 'relative',
    overflow: 'hidden'
  },
  bgGlow: {
    position: 'absolute',
    width: 560,
    height: 560,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(245,197,24,0.07) 0%, transparent 70%)',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    pointerEvents: 'none'
  },
  scanlines: {
    position: 'fixed',
    inset: 0,
    background:
      'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)',
    pointerEvents: 'none',
    zIndex: 10
  },
  card: {
    position: 'relative',
    zIndex: 1,
    background: 'rgba(255,255,255,0.025)',
    border: '1px solid rgba(245,197,24,0.14)',
    borderRadius: 28,
    padding: '40px 36px 36px',
    width: 370,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 22,
    boxShadow: '0 0 80px rgba(245,197,24,0.05), inset 0 1px 0 rgba(255,255,255,0.04)'
  },
  titleBlock: { textAlign: 'center' },
  title: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 44,
    letterSpacing: 8,
    color: GOLD,
    textShadow: '0 0 30px rgba(245,197,24,0.5)',
    lineHeight: 1
  },
  subtitle: {
    fontSize: 10,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.22)',
    marginTop: 4
  },
  stage: {
    position: 'relative',
    width: '100%',
    height: 220,
    borderRadius: 16,
    background: 'rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.05)',
    overflow: 'visible'
  },
  spotlight: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 200,
    height: 80,
    borderRadius: '50%',
    background: 'radial-gradient(ellipse, rgba(245,197,24,0.08) 0%, transparent 70%)'
  },
  flyingCoin: {
    position: 'absolute',
    transformStyle: 'preserve-3d',
    perspective: 300,
    zIndex: 5,
    transition: 'none'
  },
  resultLabel: {
    position: 'absolute',
    right: 16,
    top: 14,
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 32,
    letterSpacing: 5,
    color: 'white',
    textShadow: '0 0 20px rgba(255,255,255,0.3)',
    transition: 'opacity 0.35s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
    display: 'flex',
    alignItems: 'center',
    zIndex: 10
  },
  scoreRow: {
    display: 'flex',
    gap: 14,
    width: '100%'
  },
  scoreBox: {
    flex: 1,
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 12,
    padding: '10px 12px',
    textAlign: 'center'
  },
  scoreLabel: {
    fontSize: 9,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.28)',
    marginBottom: 3
  },
  scoreValue: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 28,
    lineHeight: 1
  },
  betLabel: {
    fontSize: 9,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.28)',
    alignSelf: 'flex-start'
  },
  betRow: {
    display: 'flex',
    gap: 10,
    width: '100%'
  },
  betBtn: {
    flex: 1,
    padding: '13px 0',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.04)',
    color: 'rgba(255,255,255,0.45)',
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 18,
    letterSpacing: 3,
    cursor: 'pointer',
    transition: 'all 0.2s',
    outline: 'none'
  },
  betBtnSelected: {
    background: 'rgba(245,197,24,0.12)',
    borderColor: GOLD,
    color: GOLD,
    boxShadow: `0 0 18px rgba(245,197,24,0.14)`
  },
  flipBtn: {
    width: '100%',
    padding: '15px 0',
    borderRadius: 14,
    border: 'none',
    background: `linear-gradient(135deg, ${GOLD}, #b8860b)`,
    color: '#0a0a0a',
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: 22,
    letterSpacing: 5,
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 4px 24px rgba(245,197,24,0.28)',
    outline: 'none'
  }
}
