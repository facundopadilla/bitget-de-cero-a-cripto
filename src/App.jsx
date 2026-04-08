import { useState, useEffect, useCallback, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  TrendingUp, Zap, Bot, Coins, GraduationCap, ShieldCheck,
  Monitor, Globe, Lock,
  Calendar, User, Package, Pickaxe, BarChart2,
  Link2, Eye,
  TrendingDown, Wrench, Users, Landmark,
  CheckCircle2,
  Building2, KeyRound,
  Flag,
  Globe2, ShoppingCart, FileText, Shield, Gamepad2,
  Smartphone,
  ChevronLeft, ChevronRight,
  LineChart,
  Gift,
} from 'lucide-react'

// ─── THEME ────────────────────────────────────────────────────
const T = {
  bg: '#000000',
  surf: 'rgba(255,255,255,0.06)',
  surfHigh: 'rgba(255,255,255,0.11)',
  border: 'rgba(0,240,255,0.22)',
  teal: '#00F0FF',
  tealBright: '#00F0FF',
  tealDark: '#00C4D4',
  cyan: '#00F0FF',
  orange: '#F7931A',
  gold: '#F0B429',
  green: '#10D876',
  red: '#FF4757',
  text: '#FFFFFF',
  muted: 'rgba(255,255,255,0.62)',
  D: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
  B: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
  M: "'JetBrains Mono', 'Fira Code', Menlo, monospace",
}
const grad = `linear-gradient(135deg, ${T.tealDark}, ${T.teal})`
const gradBTC = `linear-gradient(135deg, ${T.orange}, ${T.gold})`

// ─── CANVAS PARTICLES ─────────────────────────────────────────
function Particles() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current
    const ctx = c.getContext('2d')
    let raf, w, h
    const resize = () => { c.width = w = innerWidth; c.height = h = innerHeight }
    resize()
    addEventListener('resize', resize)
    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * innerWidth, y: Math.random() * innerHeight,
      r: Math.random() * 1.5 + 0.4,
      vx: (Math.random() - .5) * .2, vy: (Math.random() - .5) * .2,
      a: Math.random() * .3 + .07,
    }))
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      pts.forEach(p => {
        p.x = (p.x + p.vx + w) % w
        p.y = (p.y + p.vy + h) % h
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,240,255,${p.a})`; ctx.fill()
      })
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.hypot(dx, dy)
        if (d < 110) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y)
          ctx.strokeStyle = `rgba(0,240,255,${.055 * (1 - d / 110)})`; ctx.lineWidth = .5; ctx.stroke()
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
}

function DotGrid() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
      backgroundSize: '36px 36px', pointerEvents: 'none',
    }} />
  )
}

// ─── SHARED ───────────────────────────────────────────────────
function Tag({ children, color = T.teal }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '6px 16px', borderRadius: 99,
      border: `1px solid ${color}50`, background: `${color}15`,
      color, fontSize: 13, fontFamily: T.M, fontWeight: 600,
      letterSpacing: '.06em', textTransform: 'uppercase',
    }}>
      {children}
    </span>
  )
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: T.surf, border: `1px solid ${T.border}`,
      borderRadius: 16, padding: 24, backdropFilter: 'blur(12px)',
      ...style,
    }}>
      {children}
    </div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (d = 0) => ({ opacity: 1, y: 0, transition: { delay: d, duration: .5, ease: [.22, 1, .36, 1] } }),
}

function Slide({ children, style = {} }) {
  return (
    <div style={{
      width: '100vw', height: '100vh',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '44px 72px', position: 'relative', overflow: 'hidden',
      ...style,
    }}>
      {/* Ambient white drift — adds depth and professionalism on pure black */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 22% 28%, rgba(255,255,255,0.055) 0%, transparent 55%)',
            'radial-gradient(circle at 78% 72%, rgba(255,255,255,0.055) 0%, transparent 55%)',
            'radial-gradient(circle at 22% 28%, rgba(255,255,255,0.055) 0%, transparent 55%)',
          ],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      />
      {/* Secondary slower white pulse — opposite corner */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 85% 20%, rgba(255,255,255,0.035) 0%, transparent 50%)',
            'radial-gradient(circle at 15% 80%, rgba(255,255,255,0.035) 0%, transparent 50%)',
            'radial-gradient(circle at 85% 20%, rgba(255,255,255,0.035) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      />
      <DotGrid />
      {children}
    </div>
  )
}

// ─── SLIDE 0: REGISTRO / WAITING ROOM ─────────────────────────
function SlideRegister() {
  return (
    <Slide>
      {/* Ambient background — slow drifting radial gradient */}
      <motion.div
        animate={{
          background: [
            `radial-gradient(circle at 25% 35%, ${T.teal}22 0%, transparent 55%)`,
            `radial-gradient(circle at 75% 65%, ${T.teal}22 0%, transparent 55%)`,
            `radial-gradient(circle at 25% 35%, ${T.teal}22 0%, transparent 55%)`,
          ],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      />

      <div style={{
        display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 56,
        alignItems: 'center', height: '100%', position: 'relative', zIndex: 1,
      }}>
        {/* LEFT — Text + requirements */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}
            style={{ marginBottom: 22 }}
          >
            <Tag>Antes de empezar</Tag>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .1 }}
            style={{
              fontFamily: T.D, fontSize: 'clamp(44px,5.8vw,80px)', fontWeight: 800,
              color: T.text, lineHeight: 1.02, marginBottom: 4, letterSpacing: '-0.02em',
            }}
          >
            Registrate y
          </motion.h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 24 }}>
            <motion.h1
              animate={{ backgroundPosition: ['0% 50%', '200% 50%'] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
              style={{
                fontFamily: T.D, fontSize: 'clamp(44px,5.8vw,80px)', fontWeight: 900,
                lineHeight: 1.02, letterSpacing: '-0.02em',
                background: `linear-gradient(90deg, ${T.teal}, ${T.tealBright}, ${T.gold}, ${T.tealBright}, ${T.teal})`,
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text', backgroundClip: 'text',
                WebkitTextFillColor: 'transparent', color: 'transparent',
              }}
            >
              GANÁ PREMIOS
            </motion.h1>
            <motion.div
              animate={{ rotate: [-8, 8, -8], y: [0, -4, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Gift size={54} color={T.gold} strokeWidth={1.8} />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .35 }}
            style={{ color: T.muted, fontSize: 21, fontFamily: T.B, lineHeight: 1.55, marginBottom: 36, maxWidth: 560 }}
          >
            Escaneá el QR con tu celular para entrar al sorteo que hacemos{' '}
            <strong style={{ color: T.text }}>al final de la charla</strong>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .5 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
          >
            <Card style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '18px 22px' }}>
              <div style={{
                width: 52, height: 52, borderRadius: 12,
                background: `${T.teal}18`, border: `1px solid ${T.teal}45`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <FileText size={26} color={T.teal} strokeWidth={2} />
              </div>
              <div>
                <div style={{ color: T.text, fontFamily: T.B, fontWeight: 700, fontSize: 18, marginBottom: 2 }}>
                  Tené tu DNI a mano
                </div>
                <div style={{ color: T.muted, fontFamily: T.B, fontSize: 14 }}>
                  Lo vas a necesitar para completar el registro en Bitget
                </div>
              </div>
            </Card>

            <Card style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '18px 22px' }}>
              <div style={{
                width: 52, height: 52, borderRadius: 12,
                background: `${T.teal}18`, border: `1px solid ${T.teal}45`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <ShieldCheck size={26} color={T.teal} strokeWidth={2} />
              </div>
              <div>
                <div style={{ color: T.text, fontFamily: T.B, fontWeight: 700, fontSize: 18, marginBottom: 2 }}>
                  Mayor de 18 años
                </div>
                <div style={{ color: T.muted, fontFamily: T.B, fontSize: 14 }}>
                  Requisito legal para participar del sorteo
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* RIGHT — Animated QR hero */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', position: 'relative',
        }}>
          {/* Pulsing radial glow behind QR */}
          <motion.div
            animate={{ scale: [1, 1.14, 1], opacity: [0.35, 0.75, 0.35] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: 480, height: 480,
              top: '50%', left: '50%',
              transform: 'translate(-50%, -58%)',
              background: `radial-gradient(circle, ${T.teal}60 0%, ${T.teal}25 35%, transparent 70%)`,
              borderRadius: '50%',
              filter: 'blur(32px)',
              pointerEvents: 'none',
            }}
          />

          {/* Second slower glow layer */}
          <motion.div
            animate={{ scale: [1.05, 0.95, 1.05], opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: 400, height: 400,
              top: '50%', left: '50%',
              transform: 'translate(-50%, -58%)',
              background: `radial-gradient(circle, ${T.gold}30 0%, transparent 65%)`,
              borderRadius: '50%',
              filter: 'blur(28px)',
              pointerEvents: 'none',
            }}
          />

          {/* QR container with brackets */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: .6, delay: .2, ease: [.22, 1, .36, 1] }}
            style={{
              position: 'relative',
              padding: 22,
              background: '#FFFFFF',
              borderRadius: 22,
              boxShadow: `0 24px 80px ${T.teal}40, 0 0 0 1px ${T.teal}30`,
            }}
          >
            <QRCodeSVG
              value="https://facundopadilla.github.io/bitget?referCode=facundopadilla"
              size={340}
              bgColor="#FFFFFF"
              fgColor="#000000"
              level="M"
            />

            {/* Scanning line — moves top to bottom and back */}
            <motion.div
              animate={{ top: [22, 358, 22] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                left: 22, right: 22,
                height: 3,
                background: `linear-gradient(90deg, transparent, ${T.teal} 20%, ${T.tealBright} 50%, ${T.teal} 80%, transparent)`,
                boxShadow: `0 0 14px ${T.teal}, 0 0 28px ${T.teal}80`,
                pointerEvents: 'none',
                borderRadius: 2,
              }}
            />

            {/* Corner brackets — viewfinder style, pulsing */}
            {[
              { top: -10, left: -10, bt: 3, bl: 3 },
              { top: -10, right: -10, bt: 3, br: 3 },
              { bottom: -10, left: -10, bb: 3, bl: 3 },
              { bottom: -10, right: -10, bb: 3, br: 3 },
            ].map((p, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  width: 32, height: 32,
                  borderColor: T.teal,
                  borderStyle: 'solid',
                  borderTopWidth: p.bt || 0,
                  borderRightWidth: p.br || 0,
                  borderBottomWidth: p.bb || 0,
                  borderLeftWidth: p.bl || 0,
                  borderRadius: 4,
                  top: p.top, bottom: p.bottom, left: p.left, right: p.right,
                  pointerEvents: 'none',
                }}
              />
            ))}
          </motion.div>

          {/* Floating "Escaneá" label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .5, delay: .55 }}
            style={{ marginTop: 34, display: 'flex', alignItems: 'center', gap: 12 }}
          >
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                color: T.teal, fontSize: 24, fontFamily: T.M, fontWeight: 700,
                lineHeight: 1,
              }}
            >
              ↑
            </motion.div>
            <span style={{
              fontFamily: T.M, fontSize: 14, color: T.teal, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '.08em',
            }}>
              Escaneá con tu celular
            </span>
          </motion.div>
        </div>
      </div>
    </Slide>
  )
}

// ─── SLIDE 1: PORTADA ─────────────────────────────────────────
function SlideCover() {
  const words = ['DE', 'CERO', 'A', 'CRIPTO']
  return (
    <Slide style={{ alignItems: 'center', textAlign: 'center', padding: '40px' }}>
      <div style={{
        position: 'absolute', width: 720, height: 720, borderRadius: '50%',
        background: `radial-gradient(circle, ${T.teal}14 0%, transparent 65%)`,
        top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none',
      }} />

      <motion.div initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .5 }} style={{ marginBottom: 24 }}>
        <Tag>SaltaDev × Bitget · 2026</Tag>
      </motion.div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 0.2em', lineHeight: 1, marginBottom: 28 }}>
        {words.map((word, wi) => (
          <div key={wi} style={{ overflow: 'hidden', display: 'inline-block' }}>
            <motion.span
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: wi * 0.13, duration: .55, ease: [.22, 1, .36, 1] }}
              style={{
                display: 'inline-block', fontFamily: T.D, fontWeight: 800,
                fontSize: 'clamp(60px, 11vw, 144px)', letterSpacing: '-0.03em',
                background: grad,
                WebkitBackgroundClip: 'text', backgroundClip: 'text',
                WebkitTextFillColor: 'transparent', color: 'transparent',
              }}
            >
              {word}
            </motion.span>
          </div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .8, duration: .7 }}
        style={{ color: T.muted, fontSize: 22, fontFamily: T.B, marginBottom: 52, maxWidth: 560 }}
      >
        Cómo entrar al mundo cripto sin perderse en el camino
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: .5 }}
        style={{ display: 'flex', gap: 28, alignItems: 'center', justifyContent: 'center' }}
      >
        <img
          src="/saltadev.png"
          alt="SaltaDev"
          style={{ height: 68, width: 'auto', objectFit: 'contain', display: 'block' }}
        />
        <div style={{ width: 1, height: 44, background: T.border }} />
        <img
          src="/bitget.png"
          alt="Bitget"
          style={{ height: 68, width: 'auto', objectFit: 'contain', display: 'block' }}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        style={{ position: 'absolute', bottom: 36, color: T.muted, fontSize: 13, fontFamily: T.M }}
      >
        → usá las flechas del teclado para navegar
      </motion.p>
    </Slide>
  )
}

// ─── SLIDE 2: QUIÉN SOY ───────────────────────────────────────
function SlideWhoAmI() {
  return (
    <Slide>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 64, alignItems: 'center', height: '100%' }}>
        <div>
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" style={{ marginBottom: 20 }}>
            <Tag>Ponente</Tag>
          </motion.div>
          <motion.h2 custom={.12} variants={fadeUp} initial="hidden" animate="show"
            style={{ fontFamily: T.D, fontSize: 'clamp(40px,5vw,64px)', fontWeight: 800, color: T.text, lineHeight: 1.05, marginBottom: 12 }}
          >
            Facundo<br />Padilla
          </motion.h2>
          <motion.p custom={.18} variants={fadeUp} initial="hidden" animate="show"
            style={{ color: T.teal, fontFamily: T.B, fontWeight: 600, fontSize: 18, marginBottom: 20 }}
          >
            Software Engineer · Founder SaltaDev
          </motion.p>
          <motion.p custom={.24} variants={fadeUp} initial="hidden" animate="show"
            style={{ color: T.muted, fontSize: 17, fontFamily: T.B, lineHeight: 1.65, marginBottom: 28 }}
          >
            Desarrollador con <strong style={{ color: T.text }}>+6 años de experiencia</strong> en Santander Tecnología.
            Referente del ecosistema tech del norte argentino.
            Apasionado por AI, automatización y comunidad.
          </motion.p>
        </div>

        <motion.div
          custom={.18} variants={fadeUp} initial="hidden" animate="show"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
        >
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: -20,
              background: `radial-gradient(circle, ${T.teal}25 0%, transparent 65%)`,
              filter: 'blur(28px)', borderRadius: '50%', pointerEvents: 'none',
            }} />
            <img
              src="/facundopadilla.jpg"
              alt="Facundo Padilla"
              style={{
                position: 'relative',
                width: 'min(460px, 100%)', aspectRatio: '1 / 1',
                borderRadius: '50%', objectFit: 'cover', display: 'block',
                border: `3px solid ${T.teal}70`,
                boxShadow: `0 24px 80px ${T.teal}35`,
              }}
            />
          </div>
        </motion.div>
      </div>
    </Slide>
  )
}

// ─── SLIDE 3: MATIAS PART ────────────────────────────────────
function SlideMatiasPart() {
  return (
    <Slide>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 64, alignItems: 'center', height: '100%' }}>
        <div>
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" style={{ marginBottom: 20 }}>
            <Tag>Ponente</Tag>
          </motion.div>
          <motion.h2 custom={.12} variants={fadeUp} initial="hidden" animate="show"
            style={{ fontFamily: T.D, fontSize: 'clamp(40px,5vw,64px)', fontWeight: 800, color: T.text, lineHeight: 1.05, marginBottom: 12 }}
          >
            Matias<br />Part
          </motion.h2>
          <motion.p custom={.18} variants={fadeUp} initial="hidden" animate="show"
            style={{ color: T.teal, fontFamily: T.B, fontWeight: 600, fontSize: 18, marginBottom: 20 }}
          >
            Regional Manager P2P|B2B · Americas & EUR · África & MENA
          </motion.p>
          <motion.p custom={.24} variants={fadeUp} initial="hidden" animate="show"
            style={{ color: T.muted, fontSize: 17, fontFamily: T.B, lineHeight: 1.65 }}
          >
            Con <strong style={{ color: T.text }}>más de una década</strong> en la industria IT,
            especialista en blockchain, gestión de proyectos y desarrollo de negocios.
            Educador y consultor, impulsor del ecosistema cripto en LATAM.
          </motion.p>
        </div>

        <motion.div
          custom={.18} variants={fadeUp} initial="hidden" animate="show"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
        >
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: -20,
              background: `radial-gradient(circle, ${T.teal}25 0%, transparent 65%)`,
              filter: 'blur(28px)', borderRadius: '50%', pointerEvents: 'none',
            }} />
            <img
              src="/matiaspart.jpeg"
              alt="Matias Part"
              style={{
                position: 'relative',
                width: 'min(460px, 100%)', aspectRatio: '1 / 1',
                borderRadius: '50%', objectFit: 'cover', display: 'block',
                border: `3px solid ${T.teal}70`,
                boxShadow: `0 24px 80px ${T.teal}35`,
              }}
            />
          </div>
        </motion.div>
      </div>
    </Slide>
  )
}

// ─── SLIDE 4: SALTADEV ────────────────────────────────────────
function SlideSaltaDev() {
  return (
    <Slide>
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" style={{ marginBottom: 10 }}>
        <Tag>Sponsor · Comunidad</Tag>
      </motion.div>
      <motion.h2 custom={.06} variants={fadeUp} initial="hidden" animate="show"
        style={{ fontFamily: T.D, fontSize: 'clamp(38px,5.5vw,68px)', fontWeight: 800, color: T.text, marginBottom: 8, lineHeight: 1.05 }}
      >¿Qué es SaltaDev?</motion.h2>
      <motion.p custom={.12} variants={fadeUp} initial="hidden" animate="show"
        style={{ color: T.muted, fontSize: 20, fontFamily: T.B, marginBottom: 28 }}
      >El Hub Tech del Norte Argentino</motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 32, alignItems: 'stretch' }}>
        {/* Foto comunidad */}
        <motion.div custom={.18} variants={fadeUp} initial="hidden" animate="show"
          style={{ borderRadius: 18, overflow: 'hidden', border: `1px solid ${T.border}`, minHeight: 280 }}
        >
          <img
            src="/miembros.jpg"
            alt="Comunidad SaltaDev"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { v: '1K+', l: 'Miembros activos' },
            { v: '20+', l: 'Partners estratégicos' },
            { v: '#1', l: 'Hub tech del norte argentino' },
          ].map((s, i) => (
            <motion.div key={i} custom={.15 * (i + 2)} variants={fadeUp} initial="hidden" animate="show">
              <Card>
                <div style={{ fontFamily: T.M, fontSize: 36, fontWeight: 700, color: T.teal }}>{s.v}</div>
                <div style={{ color: T.muted, fontSize: 15, fontFamily: T.B, marginTop: 5 }}>{s.l}</div>
              </Card>
            </motion.div>
          ))}
          <motion.div custom={.5} variants={fadeUp} initial="hidden" animate="show">
            <Card style={{ background: `${T.teal}08`, borderColor: `${T.teal}30` }}>
              <div style={{ color: T.text, fontSize: 14, fontFamily: T.B, lineHeight: 1.8 }}>
                Inteligencia Artificial · Blockchain · Web3 · Ciberseguridad · Emprendedores tecnológicos · Eventos
              </div>
              <div style={{ color: T.teal, fontSize: 14, fontFamily: T.M, marginTop: 10 }}>salta.dev</div>
            </Card>
          </motion.div>
        </div>
      </div>
    </Slide>
  )
}

// ─── SLIDE 4: BITGET ──────────────────────────────────────────
function SlideBitget() {
  const stats = [
    { v: '150M+', l: 'Usuarios' }, { v: '100+', l: 'Países' },
    { v: 'Top 1', l: 'Exchange' }, { v: '$400M', l: 'Fondo protección' },
  ]
  const prods = [
    { Icon: TrendingUp,    t: 'Spot Trading',  d: 'Compra y venta al instante' },
    { Icon: Zap,           t: 'Futuros',        d: 'Apalancamiento avanzado' },
    { Icon: Bot,           t: 'Copy Trading',   d: 'Seguí a traders expertos' },
    { Icon: Coins,         t: 'Earn',           d: 'Rendimiento en cripto' },
    { Icon: GraduationCap, t: 'Academy',        d: 'Aprendé desde cero, gratis' },
    { Icon: ShieldCheck,   t: 'Seguridad',      d: 'Reservas 1:1 certificadas' },
  ]
  return (
    <Slide>
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" style={{ marginBottom: 10 }}>
        <Tag>Sponsor · Exchange Global</Tag>
      </motion.div>
      <motion.h2 custom={.06} variants={fadeUp} initial="hidden" animate="show"
        style={{ fontFamily: T.D, fontSize: 'clamp(38px,5.5vw,68px)', fontWeight: 800, color: T.text, marginBottom: 8, lineHeight: 1.05 }}
      >¿Qué es Bitget?</motion.h2>
      <motion.p custom={.12} variants={fadeUp} initial="hidden" animate="show"
        style={{ color: T.muted, fontSize: 20, fontFamily: T.B, marginBottom: 28 }}
      >El exchange cripto pensado para todos los niveles</motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.7fr', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {stats.map((s, i) => (
              <motion.div key={i} custom={.1 * (i + 2)} variants={fadeUp} initial="hidden" animate="show">
                <Card style={{ textAlign: 'center', padding: '18px 12px' }}>
                  <div style={{ fontFamily: T.M, fontSize: 24, fontWeight: 700, color: T.teal }}>{s.v}</div>
                  <div style={{ color: T.muted, fontSize: 13, fontFamily: T.B, marginTop: 4 }}>{s.l}</div>
                </Card>
              </motion.div>
            ))}
          </div>
          <motion.div custom={.38} variants={fadeUp} initial="hidden" animate="show">
            <img
              src="/bitget.png"
              alt="Bitget"
              style={{ height: 56, width: 'auto', objectFit: 'contain', display: 'block', margin: '0 auto' }}
            />
          </motion.div>
          <motion.div custom={.45} variants={fadeUp} initial="hidden" animate="show">
            <Card style={{ background: `${T.teal}08`, borderColor: `${T.teal}30` }}>
              <div style={{ color: T.teal, fontFamily: T.M, fontSize: 12, marginBottom: 4 }}>FUNDADO</div>
              <div style={{ color: T.text, fontFamily: T.B, fontSize: 16 }}>2018 · Disponible en Argentina</div>
            </Card>
          </motion.div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {prods.map(({ Icon, t, d }, i) => (
            <motion.div key={i} custom={.1 * (i + 2)} variants={fadeUp} initial="hidden" animate="show">
              <Card style={{ textAlign: 'center', padding: '26px 18px', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
                <Icon size={40} color={T.teal} strokeWidth={1.5} />
                <div style={{ fontFamily: T.D, fontWeight: 700, color: T.text, fontSize: 19 }}>{t}</div>
                <div style={{ color: T.muted, fontSize: 15, fontFamily: T.B, flex: 1, lineHeight: 1.5 }}>{d}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  )
}

// ─── SLIDE 5: QUÉ SON LAS CRIPTO ─────────────────────────────
function SlideCrypto() {
  const pillars = [
    { Icon: Monitor,  t: 'Digital',        d: 'Solo existen en internet. No hay monedas físicas que guardar.', c: T.teal },
    { Icon: Globe,    t: 'Descentralizado', d: 'Sin banco central ni gobierno que las controle o emita.',      c: T.tealBright },
    { Icon: Eye,      t: 'Transparente',    d: 'Cada transacción es pública y verificable por cualquier persona.', c: T.gold },
    { Icon: Lock,     t: 'Seguro',          d: 'Criptografía avanzada protege cada operación en la red.',      c: T.green },
  ]
  return (
    <Slide>
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" style={{ marginBottom: 10 }}>
        <Tag>Fundamentos</Tag>
      </motion.div>
      <motion.h2 custom={.06} variants={fadeUp} initial="hidden" animate="show"
        style={{ fontFamily: T.D, fontSize: 'clamp(36px,5vw,64px)', fontWeight: 800, color: T.text, marginBottom: 8, lineHeight: 1.05 }}
      >¿Qué son las criptomonedas?</motion.h2>
      <motion.p custom={.12} variants={fadeUp} initial="hidden" animate="show"
        style={{ color: T.muted, fontSize: 20, fontFamily: T.B, marginBottom: 32 }}
      >Dinero digital que no le pertenece a nadie... y le pertenece a todos.</motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginBottom: 24 }}>
        {pillars.map(({ Icon, t, d, c }, i) => (
          <motion.div key={i} custom={.1 * (i + 2)} variants={fadeUp} initial="hidden" animate="show"
            whileHover={{ scale: 1.03, y: -4 }} style={{ cursor: 'default' }}
          >
            <Card style={{ height: '100%', textAlign: 'center', padding: '30px 18px', border: `1px solid ${c}25`, background: `${c}07`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              <Icon size={40} color={c} strokeWidth={1.5} />
              <div style={{ fontFamily: T.D, fontWeight: 700, fontSize: 20, color: c }}>{t}</div>
              <div style={{ color: T.muted, fontSize: 15, fontFamily: T.B, lineHeight: 1.55, flex: 1 }}>{d}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div custom={.55} variants={fadeUp} initial="hidden" animate="show" style={{ textAlign: 'center' }}>
        <div style={{
          display: 'inline-block', padding: '16px 32px', borderRadius: 99,
          background: `${T.teal}10`, border: `1px solid ${T.teal}30`,
          color: T.text, fontFamily: T.B, fontSize: 17,
        }}>
          💡 <strong>Analogía:</strong> Es como el peso, pero <strong style={{ color: T.teal }}>sin Banco Central</strong> y con emisión <strong style={{ color: T.teal }}>fija por código matemático</strong>
        </div>
      </motion.div>
    </Slide>
  )
}

// ─── SLIDE 6: BITCOIN ─────────────────────────────────────────
function SlideBitcoin() {
  const facts = [
    { Icon: Calendar,  l: 'Creado',       v: '2009 — Bloque génesis el 3 de enero' },
    { Icon: User,      l: 'Creador',      v: 'Satoshi Nakamoto (identidad anónima hasta hoy)' },
    { Icon: Package,   l: 'Supply máximo',v: '21.000.000 BTC — Nunca habrá más' },
    { Icon: Pickaxe,   l: 'Generación',   v: 'Mining — Proof of Work (computadoras compiten)' },
    { Icon: BarChart2, l: 'Posición',     v: '#1 criptomoneda del mundo por capitalización' },
  ]
  return (
    <Slide>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 64, alignItems: 'center', height: '100%' }}>
        <div style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 110, damping: 14, delay: .1 }}
            style={{ position: 'relative', display: 'inline-block' }}
          >
            <div style={{
              position: 'absolute', inset: -60,
              background: `radial-gradient(circle, ${T.orange}28 0%, transparent 70%)`,
              borderRadius: '50%',
            }} />
            <div style={{
              width: 200, height: 200, borderRadius: '50%', background: gradBTC,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 96, fontWeight: 900, color: 'rgba(0,0,0,0.45)',
              boxShadow: `0 0 80px ${T.orange}50, 0 0 160px ${T.orange}18`,
              position: 'relative',
            }}>₿</div>
          </motion.div>
          <motion.div custom={.3} variants={fadeUp} initial="hidden" animate="show">
            <h3 style={{ fontFamily: T.D, fontSize: 48, fontWeight: 800, color: T.text, marginTop: 28, marginBottom: 8 }}>Bitcoin</h3>
            <p style={{ color: T.orange, fontFamily: T.B, fontWeight: 600, fontSize: 18 }}>"El Oro Digital"</p>
          </motion.div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <motion.div custom={.05} variants={fadeUp} initial="hidden" animate="show" style={{ marginBottom: 6 }}>
            <Tag color={T.orange}>La primera criptomoneda</Tag>
          </motion.div>
          {facts.map(({ Icon, l, v }, i) => (
            <motion.div key={i} custom={.1 * (i + 1)} variants={fadeUp} initial="hidden" animate="show">
              <Card style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '16px 20px' }}>
                <Icon size={22} color={T.orange} strokeWidth={1.5} style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ color: T.muted, fontSize: 11, fontFamily: T.M, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 3 }}>{l}</div>
                  <div style={{ color: T.text, fontSize: 16, fontFamily: T.B, fontWeight: 600 }}>{v}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  )
}

// ─── SLIDE 6.5: VARIEDAD DE CRIPTOS ──────────────────────────
function SlideCryptoVariety() {
  const cryptos = [
    {
      Icon: Coins,
      color: T.orange,
      name: 'Bitcoin',
      ticker: 'BTC',
      tagline: 'Oro digital',
      what: 'La primera criptomoneda. Reserva de valor escasa — solo habrá 21 millones, para siempre.',
      use: 'Ahorrar valor fuera del sistema bancario tradicional.',
    },
    {
      Icon: Zap,
      color: T.teal,
      name: 'Ethereum',
      ticker: 'ETH',
      tagline: 'Computadora mundial',
      what: 'Plataforma programable. Ejecuta smart contracts y aplicaciones descentralizadas (dApps).',
      use: 'DeFi, NFTs, tokens, finanzas sin intermediarios.',
    },
    {
      Icon: Landmark,
      color: T.green,
      name: 'Stablecoins',
      ticker: 'USDT · USDC',
      tagline: 'Dólar digital',
      what: 'Criptos atadas 1:1 al dólar estadounidense. Sin volatilidad — 1 USDT = 1 USD.',
      use: 'Ahorrar en dólares sin banco, mandar USD al exterior al instante.',
    },
  ]

  return (
    <Slide>
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" style={{ marginBottom: 10 }}>
        <Tag>El ecosistema</Tag>
      </motion.div>
      <motion.h2 custom={.06} variants={fadeUp} initial="hidden" animate="show"
        style={{ fontFamily: T.D, fontSize: 'clamp(34px,4.8vw,60px)', fontWeight: 800, color: T.text, marginBottom: 8, lineHeight: 1.05 }}
      >¿<span style={{ color: T.teal }}>Solo</span> existe Bitcoin?</motion.h2>
      <motion.p custom={.12} variants={fadeUp} initial="hidden" animate="show"
        style={{ color: T.muted, fontSize: 19, fontFamily: T.B, marginBottom: 28 }}
      >Spoiler: no. Hay miles. Pero <strong style={{ color: T.text }}>3 categorías</strong> te explican el 95% del ecosistema.</motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 24 }}>
        {cryptos.map(({ Icon, color, name, ticker, tagline, what, use }, i) => (
          <motion.div key={i} custom={.2 + i * .1} variants={fadeUp} initial="hidden" animate="show"
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <Card style={{ height: '100%', border: `1px solid ${color}40`, background: `${color}08`, display: 'flex', flexDirection: 'column', gap: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18, paddingBottom: 16, borderBottom: `1px solid rgba(255,255,255,0.07)` }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: `${color}18`, border: `1px solid ${color}50`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={30} color={color} strokeWidth={1.5} />
                </div>
                <div>
                  <div style={{ fontFamily: T.D, fontWeight: 800, fontSize: 22, color: T.text, lineHeight: 1.1 }}>{name}</div>
                  <div style={{ fontFamily: T.M, fontSize: 11, color, letterSpacing: '.1em', marginTop: 3 }}>{ticker}</div>
                </div>
              </div>
              <div style={{ fontFamily: T.B, fontSize: 14, color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 10 }}>
                "{tagline}"
              </div>
              <div style={{ fontFamily: T.B, fontSize: 15, color: T.text, lineHeight: 1.55, marginBottom: 14 }}>
                {what}
              </div>
              <div style={{
                marginTop: 'auto', paddingTop: 14, borderTop: `1px solid rgba(255,255,255,0.07)`,
                fontFamily: T.B, fontSize: 13, color: T.muted, lineHeight: 1.5,
              }}>
                <span style={{ color: T.muted, fontFamily: T.M, fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em', display: 'block', marginBottom: 4 }}>Para qué se usa</span>
                {use}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div custom={.55} variants={fadeUp} initial="hidden" animate="show" style={{ textAlign: 'center' }}>
        <div style={{
          display: 'inline-block', padding: '14px 30px', borderRadius: 99,
          background: `${T.teal}10`, border: `1px solid ${T.teal}35`,
          color: T.text, fontFamily: T.B, fontSize: 16,
        }}>
          Bitcoin es la <strong style={{ color: T.orange }}>puerta de entrada</strong>. Ethereum es el <strong style={{ color: T.teal }}>terreno</strong>. Las stablecoins son el <strong style={{ color: T.green }}>puente con el mundo real</strong>.
        </div>
      </motion.div>
    </Slide>
  )
}

// ─── SLIDE 7: CÓMO FUNCIONAN ──────────────────────────────────
function SlideHowItWorks() {
  const steps = [
    { n: '01', t: 'Transacción', d: 'Juan le manda 0.01 BTC a María', c: T.teal },
    { n: '02', t: 'Broadcast',   d: 'Se transmite a toda la red global', c: T.gold },
    { n: '03', t: 'Validación',  d: 'Miles de nodos verifican los fondos', c: T.tealBright },
    { n: '04', t: 'Bloque',      d: 'Se agrupa con otras transacciones', c: T.gold },
    { n: '05', t: 'Confirmación',d: 'Queda grabado permanentemente', c: T.green },
  ]
  const props = [
    { Icon: Link2,  t: 'Inmutable',   d: 'Lo que entra al blockchain no se puede modificar ni borrar jamás' },
    { Icon: Globe,  t: 'Distribuido', d: 'Miles de copias del historial en computadoras por todo el mundo' },
    { Icon: Eye,    t: 'Auditable',   d: 'Cualquiera puede verificar cualquier transacción en tiempo real' },
  ]
  return (
    <Slide>
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" style={{ marginBottom: 10 }}>
        <Tag>Tecnología</Tag>
      </motion.div>
      <motion.h2 custom={.06} variants={fadeUp} initial="hidden" animate="show"
        style={{ fontFamily: T.D, fontSize: 'clamp(36px,5vw,62px)', fontWeight: 800, color: T.text, marginBottom: 8, lineHeight: 1.05 }}
      >¿Cómo funcionan?</motion.h2>
      <motion.p custom={.12} variants={fadeUp} initial="hidden" animate="show"
        style={{ color: T.muted, fontSize: 19, fontFamily: T.B, marginBottom: 24 }}
      >Blockchain: un libro contable público, transparente e incorruptible</motion.p>

      <div style={{ display: 'flex', alignItems: 'stretch', marginBottom: 22 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <motion.div custom={.08 * i + .15} variants={fadeUp} initial="hidden" animate="show" style={{ flex: 1 }}>
              <Card style={{ border: `1px solid ${s.c}35`, background: `${s.c}07`, textAlign: 'center', padding: '18px 12px' }}>
                <div style={{ fontFamily: T.M, fontSize: 11, color: s.c, marginBottom: 6, letterSpacing: '.1em' }}>BLOQUE {s.n}</div>
                <div style={{ fontFamily: T.D, fontWeight: 700, fontSize: 16, color: T.text, marginBottom: 6 }}>{s.t}</div>
                <div style={{ color: T.muted, fontSize: 13, fontFamily: T.B, lineHeight: 1.4 }}>{s.d}</div>
              </Card>
            </motion.div>
            {i < steps.length - 1 && (
              <motion.div
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ delay: .08 * (i + 2) + .1, duration: .3 }}
                style={{ height: 2, width: 16, flexShrink: 0, background: `linear-gradient(90deg, ${steps[i].c}, ${steps[i + 1].c})`, transformOrigin: 'left' }}
              />
            )}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {props.map(({ Icon, t, d }, i) => (
          <motion.div key={i} custom={.5 + i * .08} variants={fadeUp} initial="hidden" animate="show">
            <Card style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Icon size={30} color={T.teal} strokeWidth={1.5} />
              <div style={{ fontFamily: T.D, fontWeight: 700, color: T.text, fontSize: 18 }}>{t}</div>
              <div style={{ color: T.muted, fontSize: 15, fontFamily: T.B, lineHeight: 1.5 }}>{d}</div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Slide>
  )
}

// ─── SLIDE 8: VALOR ───────────────────────────────────────────
function SlideValue() {
  const drivers = [
    { Icon: TrendingDown, t: 'Escasez',   d: 'Bitcoin tiene máximo 21M unidades. La oferta nunca aumenta.',       c: T.teal },
    { Icon: Wrench,       t: 'Utilidad',  d: 'Ethereum corre apps financieras reales sin intermediarios.',        c: T.tealBright },
    { Icon: Users,        t: 'Adopción',  d: 'Más usuarios + empresas + países = más demanda sostenida.',         c: T.gold },
    { Icon: Landmark,     t: 'Confianza', d: 'ETFs de Bitcoin aprobados por la SEC en 2024. Adopción institucional.', c: T.green },
  ]
  return (
    <Slide>
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" style={{ marginBottom: 10 }}>
        <Tag>Economía</Tag>
      </motion.div>
      <motion.h2 custom={.06} variants={fadeUp} initial="hidden" animate="show"
        style={{ fontFamily: T.D, fontSize: 'clamp(36px,5vw,64px)', fontWeight: 800, color: T.text, marginBottom: 8, lineHeight: 1.05 }}
      >¿De dónde sale el valor?</motion.h2>
      <motion.p custom={.12} variants={fadeUp} initial="hidden" animate="show"
        style={{ color: T.muted, fontSize: 20, fontFamily: T.B, marginBottom: 30 }}
      >Igual que cualquier activo: oferta y demanda. Pero con superpoderes.</motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginBottom: 20 }}>
        {drivers.map(({ Icon, t, d, c }, i) => (
          <motion.div key={i} custom={.1 * (i + 2)} variants={fadeUp} initial="hidden" animate="show"
            whileHover={{ y: -5 }} style={{ cursor: 'default' }}
          >
            <Card style={{ height: '100%', border: `1px solid ${c}25`, background: `${c}07`, padding: '26px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Icon size={38} color={c} strokeWidth={1.5} />
              <div style={{ fontFamily: T.D, fontWeight: 700, fontSize: 20, color: c }}>{t}</div>
              <div style={{ color: T.muted, fontSize: 15, fontFamily: T.B, lineHeight: 1.55, flex: 1 }}>{d}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div custom={.55} variants={fadeUp} initial="hidden" animate="show">
        <Card style={{ background: `${T.teal}08`, borderColor: `${T.teal}28`, textAlign: 'center' }}>
          <p style={{ color: T.text, fontSize: 17, fontFamily: T.B }}>
            📊 En 2010 Bitcoin valía <strong style={{ color: T.orange }}>$0.003</strong>.
            En 2024 superó los <strong style={{ color: T.gold }}>$100.000</strong>.
            No es magia: es <strong style={{ color: T.teal }}>adopción global compuesta en el tiempo</strong>.
          </p>
        </Card>
      </motion.div>
    </Slide>
  )
}

// ─── SLIDE 9: NO SON ESTAFA ───────────────────────────────────
function SlideNotScam() {
  const evidence = [
    { t: 'Bitcoin lleva +15 años funcionando sin una sola interrupción', d: 'Ninguna estafa dura 15 años' },
    { t: 'La SEC de EE.UU. aprobó ETFs de Bitcoin spot en enero 2024', d: 'Validación regulatoria máxima' },
    { t: 'Tesla, MicroStrategy y El Salvador adoptaron Bitcoin oficialmente', d: 'Adopción institucional real' },
    { t: 'El código de Bitcoin y Ethereum es 100% público en GitHub', d: 'Transparencia y auditabilidad total' },
    { t: 'Ethereum corre millones de contratos inteligentes diariamente', d: 'Utilidad real, no solo especulación' },
  ]
  return (
    <Slide>
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" style={{ marginBottom: 10 }}>
        <Tag color={T.green}>Aclarando el panorama</Tag>
      </motion.div>
      <motion.h2 custom={.06} variants={fadeUp} initial="hidden" animate="show"
        style={{ fontFamily: T.D, fontSize: 'clamp(36px,5vw,64px)', fontWeight: 800, color: T.text, marginBottom: 8, lineHeight: 1.05 }}
      >Bitcoin ≠ Estafa</motion.h2>
      <motion.p custom={.12} variants={fadeUp} initial="hidden" animate="show"
        style={{ color: T.muted, fontSize: 20, fontFamily: T.B, marginBottom: 24 }}
      >El protocolo es código abierto y matemáticas. No una empresa de dudosa procedencia.</motion.p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        {evidence.map(({ t, d }, i) => (
          <motion.div key={i} custom={.08 * (i + 2)} variants={fadeUp} initial="hidden" animate="show">
            <Card style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '15px 22px' }}>
              <CheckCircle2 size={22} color={T.green} strokeWidth={2} style={{ flexShrink: 0 }} />
              <span style={{ flex: 1, color: T.text, fontSize: 16, fontFamily: T.B }}>{t}</span>
              <span style={{
                color: T.green, fontSize: 12, fontFamily: T.M,
                background: `${T.green}12`, padding: '4px 12px', borderRadius: 99, whiteSpace: 'nowrap',
              }}>{d}</span>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div custom={.55} variants={fadeUp} initial="hidden" animate="show">
        <div style={{ padding: '16px 26px', borderRadius: 12, background: `${T.gold}10`, border: `1px solid ${T.gold}30`, color: T.text, fontFamily: T.B, fontSize: 16 }}>
          ⚡ La diferencia clave: <strong style={{ color: T.gold }}>Bitcoin es un protocolo</strong>, como HTTP que usás para navegar.
          OneCoin era una empresa prometiendo retornos con tecnología que no existía.
        </div>
      </motion.div>
    </Slide>
  )
}

// ─── SLIDE 10: WALLETS ────────────────────────────────────────
function SlideWallets() {
  const custodial = [
    '✓ Fácil para principiantes',
    '✓ Sin seed phrase que recordar',
    '✓ Soporte 24/7 ante cualquier problema',
    '✓ Seguridad institucional con protección de fondos',
    '✓ Comprás, vendés y operás en segundos',
  ]
  const selfCust = [
    '✓ Control absoluto de tus activos',
    '✓ Máxima soberanía financiera',
    '⚠ Curva técnica para empezar',
    '⚠ Vos sos responsable del backup',
    '⚠ Sin seed phrase = sin fondos',
  ]
  return (
    <Slide>
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" style={{ marginBottom: 10 }}>
        <Tag>Infraestructura</Tag>
      </motion.div>
      <motion.h2 custom={.06} variants={fadeUp} initial="hidden" animate="show"
        style={{ fontFamily: T.D, fontSize: 'clamp(34px,5vw,62px)', fontWeight: 800, color: T.text, marginBottom: 8, lineHeight: 1.05 }}
      >¿Qué son las wallets?</motion.h2>
      <motion.p custom={.12} variants={fadeUp} initial="hidden" animate="show"
        style={{ color: T.muted, fontSize: 20, fontFamily: T.B, marginBottom: 24 }}
      >Tu billetera no guarda cripto. Guarda las <strong style={{ color: T.teal }}>llaves</strong> para acceder a ellas en la blockchain.</motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 16 }}>
        <motion.div custom={.2} variants={fadeUp} initial="hidden" animate="show">
          <Card style={{ height: '100%', border: `1px solid ${T.tealDark}40`, background: `rgba(0,196,212,0.05)` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
              <Building2 size={34} color={T.tealDark} strokeWidth={1.5} />
              <div>
                <div style={{ fontFamily: T.D, fontWeight: 700, fontSize: 20, color: T.text }}>Custodial</div>
                <div style={{ color: T.tealDark, fontFamily: T.B, fontWeight: 600, fontSize: 14 }}>Exchange la gestiona por vos</div>
              </div>
            </div>
            {custodial.map((x, i) => (
              <div key={i} style={{ color: x.startsWith('⚠') ? T.muted : T.text, fontSize: 15, fontFamily: T.B, marginBottom: 7 }}>{x}</div>
            ))}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 16 }}>
              <Tag color={T.tealDark}>Bitget</Tag>
            </div>
          </Card>
        </motion.div>

        <motion.div custom={.3} variants={fadeUp} initial="hidden" animate="show">
          <Card style={{ height: '100%', border: `1px solid ${T.teal}30`, background: `${T.teal}05` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
              <KeyRound size={34} color={T.teal} strokeWidth={1.5} />
              <div>
                <div style={{ fontFamily: T.D, fontWeight: 700, fontSize: 20, color: T.text }}>Self-Custodial</div>
                <div style={{ color: T.teal, fontFamily: T.B, fontWeight: 600, fontSize: 14 }}>Vos sos el dueño absoluto</div>
              </div>
            </div>
            {selfCust.map((x, i) => (
              <div key={i} style={{ color: x.startsWith('⚠') ? T.muted : T.text, fontSize: 15, fontFamily: T.B, marginBottom: 7 }}>{x}</div>
            ))}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 16 }}>
              {['MetaMask', 'Ledger', 'Trezor', 'Trust Wallet'].map(x => <Tag key={x} color={T.teal}>{x}</Tag>)}
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div custom={.45} variants={fadeUp} initial="hidden" animate="show" style={{ textAlign: 'center' }}>
        <div style={{
          display: 'inline-block', padding: '14px 28px', borderRadius: 99,
          background: `${T.teal}12`, border: `1px solid ${T.teal}35`,
          fontFamily: T.B, fontWeight: 600, fontSize: 16, color: T.teal,
        }}>
          Para la mayoría, un exchange confiable es la forma más simple y segura de empezar.
        </div>
      </motion.div>
    </Slide>
  )
}

// ─── SLIDE 12: ANATOMÍA DE UNA WALLET ────────────────────────
function SlideKeys() {
  const seedWords = [
    'witch', 'collapse', 'practice', 'feed',
    'shame', 'open', 'despair', 'creek',
    'road', 'again', 'ice', 'least',
  ]
  return (
    <Slide>
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" style={{ marginBottom: 10 }}>
        <Tag>Anatomía de una wallet</Tag>
      </motion.div>
      <motion.h2 custom={.06} variants={fadeUp} initial="hidden" animate="show"
        style={{ fontFamily: T.D, fontSize: 'clamp(34px,5vw,62px)', fontWeight: 800, color: T.text, marginBottom: 8, lineHeight: 1.05 }}
      >Así se ven <span style={{ color: T.teal }}>realmente</span> las llaves</motion.h2>
      <motion.p custom={.12} variants={fadeUp} initial="hidden" animate="show"
        style={{ color: T.muted, fontSize: 19, fontFamily: T.B, marginBottom: 22 }}
      >Tu wallet es un par de llaves criptográficas. Esto es exactamente lo que hay adentro.</motion.p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* PUBLIC ADDRESS — SAFE */}
        <motion.div custom={.18} variants={fadeUp} initial="hidden" animate="show">
          <Card style={{ border: `1px solid ${T.teal}40`, background: `${T.teal}08` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <Eye size={22} color={T.teal} strokeWidth={2} />
              <div style={{ fontFamily: T.D, fontWeight: 700, fontSize: 17, color: T.text, letterSpacing: .3 }}>
                DIRECCIÓN PÚBLICA
              </div>
              <div style={{
                marginLeft: 'auto', padding: '4px 10px', borderRadius: 6,
                background: `${T.teal}20`, border: `1px solid ${T.teal}50`,
                fontFamily: T.M, fontSize: 11, fontWeight: 600, color: T.teal, letterSpacing: .5,
              }}>COMPARTILA LIBREMENTE</div>
            </div>
            <div style={{
              fontFamily: T.M, fontSize: 'clamp(13px, 1.35vw, 17px)', color: T.text,
              background: 'rgba(0,0,0,0.35)', padding: '12px 16px', borderRadius: 8,
              border: `1px solid ${T.teal}25`, marginBottom: 10, wordBreak: 'break-all', lineHeight: 1.5,
            }}>
              <span style={{ color: T.muted, fontSize: 11, marginRight: 8 }}>BTC</span>
              bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq
              <br />
              <span style={{ color: T.muted, fontSize: 11, marginRight: 8 }}>ETH</span>
              0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7
            </div>
            <div style={{ color: T.muted, fontSize: 14, fontFamily: T.B }}>
              Funciona como tu <strong style={{ color: T.text }}>CBU o alias</strong> — la das para que te envíen cripto. Cualquiera puede verla, nadie puede robarte con ella.
            </div>
          </Card>
        </motion.div>

        {/* PRIVATE KEY — DANGER */}
        <motion.div custom={.26} variants={fadeUp} initial="hidden" animate="show">
          <Card style={{ border: `1px solid ${T.red}40`, background: `${T.red}08` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <Lock size={22} color={T.red} strokeWidth={2} />
              <div style={{ fontFamily: T.D, fontWeight: 700, fontSize: 17, color: T.text, letterSpacing: .3 }}>
                LLAVE PRIVADA
              </div>
              <div style={{
                marginLeft: 'auto', padding: '4px 10px', borderRadius: 6,
                background: `${T.red}20`, border: `1px solid ${T.red}50`,
                fontFamily: T.M, fontSize: 11, fontWeight: 600, color: T.red, letterSpacing: .5,
              }}>JAMÁS LA COMPARTAS</div>
            </div>
            <div style={{
              fontFamily: T.M, fontSize: 'clamp(12px, 1.25vw, 16px)', color: T.text,
              background: 'rgba(0,0,0,0.45)', padding: '12px 16px', borderRadius: 8,
              border: `1px solid ${T.red}25`, marginBottom: 10, wordBreak: 'break-all', lineHeight: 1.5,
            }}>
              E9873D79C6D87DC0FB6A5778633389F4453213303DA61F20BD67FC233AA33262
            </div>
            <div style={{ color: T.muted, fontSize: 14, fontFamily: T.B }}>
              Quien tenga estos 64 caracteres, <strong style={{ color: T.red }}>tiene tus fondos</strong>. Punto. No hay banco que te ayude, no hay reversal.
            </div>
          </Card>
        </motion.div>

        {/* SEED PHRASE — CRITICAL */}
        <motion.div custom={.34} variants={fadeUp} initial="hidden" animate="show">
          <Card style={{ border: `1px solid ${T.gold}40`, background: `${T.gold}08` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <KeyRound size={22} color={T.gold} strokeWidth={2} />
              <div style={{ fontFamily: T.D, fontWeight: 700, fontSize: 17, color: T.text, letterSpacing: .3 }}>
                SEED PHRASE
              </div>
              <div style={{
                marginLeft: 'auto', padding: '4px 10px', borderRadius: 6,
                background: `${T.gold}20`, border: `1px solid ${T.gold}55`,
                fontFamily: T.M, fontSize: 11, fontWeight: 600, color: T.gold, letterSpacing: .5,
              }}>SOLO EN PAPEL · NUNCA DIGITAL</div>
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8,
              background: 'rgba(0,0,0,0.45)', padding: '14px 16px', borderRadius: 8,
              border: `1px solid ${T.gold}25`, marginBottom: 10,
            }}>
              {seedWords.map((w, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'baseline', gap: 6,
                  padding: '6px 10px', borderRadius: 6,
                  background: 'rgba(255,255,255,0.04)', border: `1px solid ${T.gold}20`,
                }}>
                  <span style={{ fontFamily: T.M, fontSize: 10, color: T.muted, minWidth: 14 }}>{i + 1}.</span>
                  <span style={{ fontFamily: T.M, fontSize: 'clamp(13px, 1.1vw, 15px)', color: T.text, fontWeight: 500 }}>{w}</span>
                </div>
              ))}
            </div>
            <div style={{ color: T.muted, fontSize: 14, fontFamily: T.B }}>
              12 o 24 palabras que <strong style={{ color: T.text }}>reconstruyen TODA tu wallet</strong>. Si la perdés, perdés todo. Si te la roban, perdiste todo. <strong style={{ color: T.gold }}>Anotala en papel y guardala como guardás tu DNI.</strong>
            </div>
          </Card>
        </motion.div>
      </div>
    </Slide>
  )
}

// ─── SLIDE 13: TIPOS DE BILLETERA ────────────────────────────
function SlideWalletTypes() {
  const row = (label, val, color) => (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontFamily: T.M, fontSize: 11, color: T.muted, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 3 }}>{label}</div>
      <div style={{ fontFamily: T.B, fontSize: 15, color: color || T.text, lineHeight: 1.4 }}>{val}</div>
    </div>
  )

  const cards = [
    {
      icon: <Building2 size={34} color={T.teal} strokeWidth={1.5} />,
      name: 'Bitget',
      type: 'Exchange Custodial',
      typeColor: T.teal,
      what: <><span style={{ color: T.green, fontWeight: 700 }}>✓ CRIPTO</span> — BTC, ETH, USDT, +500 más</>,
      whatColor: T.text,
      keys: 'El exchange las gestiona por vos',
      keysColor: T.muted,
      net: 'Blockchain + libro interno del exchange',
      footer: 'Fácil de usar. Podés comprar, vender y retirar cripto a otra wallet.',
      border: `${T.teal}40`,
      bg: `${T.teal}08`,
    },
    {
      icon: <KeyRound size={34} color={T.gold} strokeWidth={1.5} />,
      name: 'Bitget Wallet',
      type: 'Self-custodial',
      typeColor: T.gold,
      what: <><span style={{ color: T.green, fontWeight: 700 }}>✓ CRIPTO</span> — BTC, ETH, Solana, BNB y +100 redes</>,
      whatColor: T.text,
      keys: 'VOS — mediante la seed phrase de 12 palabras',
      keysColor: T.gold,
      net: 'Multi-chain directo, sin intermediarios',
      footer: 'Máximo control. Requiere conocimiento técnico y responsabilidad para cuidar la seed.',
      border: `${T.gold}40`,
      bg: `${T.gold}08`,
    },
    {
      icon: <Smartphone size={34} color={T.muted} strokeWidth={1.5} />,
      name: 'Mercado Pago',
      type: 'Billetera fintech (PSP)',
      typeColor: T.muted,
      what: <><span style={{ color: T.red, fontWeight: 700 }}>✗ PESOS</span> — Pesos, dólar MEP, FCI. <span style={{ color: T.red }}>No tiene cripto en Argentina.</span></>,
      whatColor: T.text,
      keys: 'No aplica — no hay cripto, solo una cuenta en pesos',
      keysColor: T.muted,
      net: 'Sistema bancario tradicional (CBU, transferencias)',
      footer: 'Excelente para pagos y ahorros en pesos. No es una wallet cripto.',
      border: 'rgba(255,255,255,0.15)',
      bg: 'rgba(255,255,255,0.03)',
    },
  ]

  return (
    <Slide>
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" style={{ marginBottom: 10 }}>
        <Tag>Comparativa</Tag>
      </motion.div>
      <motion.h2 custom={.06} variants={fadeUp} initial="hidden" animate="show"
        style={{ fontFamily: T.D, fontSize: 'clamp(30px,4.5vw,56px)', fontWeight: 800, color: T.text, marginBottom: 6, lineHeight: 1.05 }}
      >¿Todas las <span style={{ color: T.teal }}>"billeteras"</span> son iguales?</motion.h2>
      <motion.p custom={.12} variants={fadeUp} initial="hidden" animate="show"
        style={{ color: T.muted, fontSize: 18, fontFamily: T.B, marginBottom: 22 }}
      >Spoiler: dos guardan cripto, una guarda pesos. <strong style={{ color: T.text }}>La palabra es la misma, el producto es completamente distinto.</strong></motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18, marginBottom: 16 }}>
        {cards.map((c, i) => (
          <motion.div key={i} custom={.2 + i * .1} variants={fadeUp} initial="hidden" animate="show">
            <Card style={{ height: '100%', border: `1px solid ${c.border}`, background: c.bg, display: 'flex', flexDirection: 'column', gap: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, paddingBottom: 14, borderBottom: `1px solid rgba(255,255,255,0.07)` }}>
                {c.icon}
                <div>
                  <div style={{ fontFamily: T.D, fontWeight: 800, fontSize: 20, color: T.text }}>{c.name}</div>
                  <div style={{ fontFamily: T.M, fontSize: 12, color: c.typeColor, letterSpacing: '.04em' }}>{c.type}</div>
                </div>
              </div>
              {row('Qué guarda', c.what)}
              {row('Quién tiene las llaves', c.keys, c.keysColor)}
              {row('Opera en', c.net)}
              <div style={{
                marginTop: 'auto', paddingTop: 12, borderTop: `1px solid rgba(255,255,255,0.07)`,
                fontFamily: T.B, fontSize: 13, color: T.muted, lineHeight: 1.5,
              }}>{c.footer}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div custom={.52} variants={fadeUp} initial="hidden" animate="show" style={{ textAlign: 'center' }}>
        <div style={{
          display: 'inline-block', padding: '12px 28px', borderRadius: 99,
          background: `${T.teal}12`, border: `1px solid ${T.teal}35`,
          fontFamily: T.B, fontWeight: 700, fontSize: 16, color: T.teal,
        }}>
          "Las tres se llaman billetera. Solo DOS son wallets cripto."
        </div>
      </motion.div>

    </Slide>
  )
}

// ─── SLIDE 14: IDENTIFICAR ESTAFAS ───────────────────────────
function SlideScams() {
  const flags = [
    { t: 'Retornos garantizados altísimos — 50%, 100% mensual', type: 'RIESGO ALTO' },
    { t: '"Invitá amigos y ganás más" — Estructura piramidal clásica', type: 'ESQUEMA PONZI' },
    { t: 'Presión para invertir YA — "oferta solo por 24 horas"', type: 'URGENCIA FALSA' },
    { t: 'Sin whitepaper técnico ni código público ni auditorías', type: 'SIN SUSTENTO' },
    { t: 'Influencers que te "garantizan" riqueza rápida y segura', type: 'PUMP & DUMP' },
  ]
  const cases = [
    { n: 'OneCoin',     d: 'Estafa de $4B. Sin blockchain real. Fundadora presa.' },
    { n: 'Bitconnect',  d: 'Ponzi disfrazado de exchange. Colapso total 2018.' },
    { n: 'FTX (2022)',  d: 'Fraude corporativo interno. $8B en fondos de clientes.' },
  ]
  return (
    <Slide>
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" style={{ marginBottom: 10 }}>
        <Tag color={T.red}>Protegete</Tag>
      </motion.div>
      <motion.h2 custom={.06} variants={fadeUp} initial="hidden" animate="show"
        style={{ fontFamily: T.D, fontSize: 'clamp(34px,4.8vw,60px)', fontWeight: 800, color: T.text, marginBottom: 8, lineHeight: 1.05 }}
      >¿Cómo identificar estafas?</motion.h2>
      <motion.p custom={.12} variants={fadeUp} initial="hidden" animate="show"
        style={{ color: T.muted, fontSize: 19, fontFamily: T.B, marginBottom: 22 }}
      >El ecosistema cripto legítimo tiene reglas. Las estafas tienen patrones reconocibles.</motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 22 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {flags.map(({ t, type }, i) => (
            <motion.div key={i} custom={.08 * (i + 2)} variants={fadeUp} initial="hidden" animate="show">
              <Card style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '14px 18px', borderColor: `${T.red}25`, background: `${T.red}05` }}>
                <Flag size={18} color={T.red} strokeWidth={2} style={{ flexShrink: 0 }} />
                <span style={{ flex: 1, color: T.text, fontSize: 15, fontFamily: T.B }}>{t}</span>
                <span style={{ background: `${T.red}18`, color: T.red, padding: '4px 10px', borderRadius: 6, fontFamily: T.M, fontSize: 10, whiteSpace: 'nowrap' }}>{type}</span>
              </Card>
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <motion.div custom={.35} variants={fadeUp} initial="hidden" animate="show">
            <Card style={{ borderColor: `${T.red}20`, background: `${T.red}05` }}>
              <div style={{ fontFamily: T.D, fontWeight: 700, color: T.red, fontSize: 16, marginBottom: 14 }}>Casos reales</div>
              {cases.map((c, i) => (
                <div key={i} style={{ marginBottom: i < cases.length - 1 ? 12 : 0 }}>
                  <div style={{ color: T.text, fontFamily: T.B, fontSize: 15, fontWeight: 600 }}>{c.n}</div>
                  <div style={{ color: T.muted, fontFamily: T.B, fontSize: 14 }}>{c.d}</div>
                </div>
              ))}
              <div style={{
                marginTop: 14,
                paddingTop: 12,
                borderTop: `1px solid ${T.red}15`,
                color: T.muted,
                fontFamily: T.B,
                fontSize: 11,
                lineHeight: 1.5,
                fontStyle: 'italic',
              }}>
                * FTX fue un caso excepcional de fraude corporativo interno. Los exchanges regulados con auditorías transparentes y pruebas de reservas no operan así.
              </div>
            </Card>
          </motion.div>
          <motion.div custom={.48} variants={fadeUp} initial="hidden" animate="show">
            <div style={{ padding: '18px', background: `${T.teal}10`, border: `1px solid ${T.teal}30`, borderRadius: 12 }}>
              <p style={{ color: T.teal, fontFamily: T.B, fontWeight: 700, fontSize: 13 }}>REGLA DE ORO</p>
              <p style={{ color: T.text, fontFamily: T.B, fontSize: 15, marginTop: 6, lineHeight: 1.55 }}>
                Si promete riqueza sin riesgo, es una estafa. Sin excepciones.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Slide>
  )
}

// ─── SLIDE 12: USO REAL ───────────────────────────────────────
function SlideRealUse() {
  const uses = [
    { Icon: Globe2,        t: 'Remesas',               d: 'Enviá dinero al exterior sin las comisiones del 10-15% de los bancos', c: T.teal },
    { Icon: Building2,     t: 'DeFi',                  d: 'Préstamos y depósitos sin banco ni historial crediticio',                c: T.tealBright },
    { Icon: ShoppingCart,  t: 'Pagos globales',         d: 'Freelancers, software, servicios internacionales sin fronteras',        c: T.gold },
    { Icon: FileText,      t: 'Contratos inteligentes', d: 'Se ejecutan solos, sin abogados, notarios ni intermediarios',           c: T.gold },
    { Icon: Shield,        t: 'Reserva de valor',       d: 'Protección contra la inflación. El Salvador lo adoptó como moneda oficial.', c: T.green },
    { Icon: Gamepad2,      t: 'Economías digitales',    d: 'Gaming, propiedad digital, creadores de contenido y metaverso',         c: T.red },
  ]
  return (
    <Slide>
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" style={{ marginBottom: 10 }}>
        <Tag>Casos de uso</Tag>
      </motion.div>
      <motion.h2 custom={.06} variants={fadeUp} initial="hidden" animate="show"
        style={{ fontFamily: T.D, fontSize: 'clamp(36px,5vw,64px)', fontWeight: 800, color: T.text, marginBottom: 8, lineHeight: 1.05 }}
      >Uso real de las criptomonedas</motion.h2>
      <motion.p custom={.12} variants={fadeUp} initial="hidden" animate="show"
        style={{ color: T.muted, fontSize: 20, fontFamily: T.B, marginBottom: 28 }}
      >No es solo especulación. Hay aplicaciones que ya están cambiando vidas.</motion.p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {uses.map(({ Icon, t, d, c }, i) => (
          <motion.div key={i} custom={.08 * (i + 2)} variants={fadeUp} initial="hidden" animate="show"
            whileHover={{ scale: 1.02 }} style={{ cursor: 'default' }}
          >
            <Card style={{ border: `1px solid ${c}22`, background: `${c}07`, height: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Icon size={32} color={c} strokeWidth={1.5} />
              <div style={{ fontFamily: T.D, fontWeight: 700, fontSize: 17, color: c }}>{t}</div>
              <div style={{ color: T.muted, fontSize: 14, fontFamily: T.B, lineHeight: 1.55, flex: 1 }}>{d}</div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Slide>
  )
}

// ─── SLIDE 13: BITGET ACADEMY ─────────────────────────────────
function SlideBitgetAcademy() {
  const resources = [
    { Icon: BookOpen,   t: 'Bitget Academy',    d: 'Artículos, guías y tutoriales desde nivel cero hasta avanzado' },
    { Icon: LineChart,  t: 'Análisis de mercado', d: 'Informes diarios y análisis técnico profesional' },
    { Icon: Bot,        t: 'Copy Trading',       d: 'Aprendé copiando en vivo las estrategias de traders expertos' },
    { Icon: Smartphone, t: 'App Bitget',          d: 'Disponible para iOS y Android, en español, completamente gratis' },
  ]
  return (
    <Slide>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', height: '100%' }}>
        <div>
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" style={{ marginBottom: 14 }}>
            <Tag>Para seguir aprendiendo</Tag>
          </motion.div>
          <motion.h2 custom={.1} variants={fadeUp} initial="hidden" animate="show"
            style={{ fontFamily: T.D, fontSize: 'clamp(34px,4.5vw,58px)', fontWeight: 800, color: T.text, lineHeight: 1.08, marginBottom: 20 }}
          >
            Empezá tu journey<br />
            <span style={{
              background: grad, WebkitBackgroundClip: 'text', backgroundClip: 'text',
              WebkitTextFillColor: 'transparent', color: 'transparent',
            }}>hoy mismo</span>
          </motion.h2>
          <motion.p custom={.2} variants={fadeUp} initial="hidden" animate="show"
            style={{ color: T.muted, fontSize: 17, fontFamily: T.B, lineHeight: 1.65, marginBottom: 26 }}
          >
            Bitget tiene todo lo que necesitás para aprender a invertir con seguridad: desde artículos básicos hasta herramientas avanzadas.
          </motion.p>
          <motion.div custom={.3} variants={fadeUp} initial="hidden" animate="show"
            style={{ display: 'flex', gap: 18, alignItems: 'center', marginBottom: 24 }}
          >
            <div style={{
              padding: 8, background: '#FFFFFF', borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 6px 24px ${T.teal}30, 0 0 0 1px ${T.teal}40`,
            }}>
              <QRCodeSVG
                value="https://www.bitget.com/es-AR/academy"
                size={96}
                bgColor="#FFFFFF"
                fgColor="#000000"
                level="M"
              />
            </div>
            <div>
              <div style={{ color: T.text, fontFamily: T.B, fontWeight: 600, fontSize: 16, marginBottom: 4 }}>bitget.com/es-AR/academy</div>
              <div style={{ color: T.muted, fontFamily: T.M, fontSize: 13 }}>Escaneá para acceder</div>
            </div>
          </motion.div>
          <motion.div custom={.38} variants={fadeUp} initial="hidden" animate="show">
            <div style={{
              padding: '16px 22px', borderRadius: 12,
              background: `linear-gradient(135deg, ${T.teal}14, ${T.tealBright}06)`,
              border: `1px solid ${T.teal}30`,
            }}>
              <p style={{ color: T.text, fontFamily: T.B, fontSize: 15, fontStyle: 'italic', lineHeight: 1.65 }}>
                "El mejor momento para empezar fue ayer.<br />
                El segundo mejor es <strong style={{ color: T.teal }}>hoy</strong>."
              </p>
            </div>
          </motion.div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {resources.map(({ Icon, t, d }, i) => (
            <motion.div key={i} custom={.1 * (i + 1)} variants={fadeUp} initial="hidden" animate="show">
              <Card style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <Icon size={30} color={T.teal} strokeWidth={1.5} style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: T.D, fontWeight: 700, color: T.text, fontSize: 17, marginBottom: 4 }}>{t}</div>
                  <div style={{ color: T.muted, fontSize: 14, fontFamily: T.B }}>{d}</div>
                </div>
              </Card>
            </motion.div>
          ))}
          <motion.div custom={.5} variants={fadeUp} initial="hidden" animate="show">
            <div style={{ background: grad, borderRadius: 14, padding: '20px 28px', textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ fontFamily: T.D, fontWeight: 800, fontSize: 20, color: 'rgba(0,0,0,0.65)' }}>
                Registrarse en Bitget →
              </div>
              <div style={{ fontFamily: T.M, fontSize: 12, color: 'rgba(0,0,0,0.4)', marginTop: 4 }}>bitget.com/es</div>
            </div>
          </motion.div>
        </div>
      </div>
    </Slide>
  )
}

// ─── SLIDE FINAL: KAHOOT / JUEGO ─────────────────────────────
function SlideKahoot() {
  const prizes = [
    { place: '1°', label: 'Primer lugar', color: T.gold },
    { place: '2°', label: 'Segundo lugar', color: '#C0C0C0' },
    { place: '3°', label: 'Tercer lugar',  color: '#CD7C3A' },
  ]
  return (
    <Slide>
      {/* Ambient — teal + gold drift */}
      <motion.div
        animate={{
          background: [
            `radial-gradient(circle at 20% 30%, ${T.teal}20 0%, transparent 55%), radial-gradient(circle at 75% 70%, ${T.gold}18 0%, transparent 45%)`,
            `radial-gradient(circle at 70% 60%, ${T.teal}20 0%, transparent 55%), radial-gradient(circle at 25% 40%, ${T.gold}18 0%, transparent 45%)`,
            `radial-gradient(circle at 20% 30%, ${T.teal}20 0%, transparent 55%), radial-gradient(circle at 75% 70%, ${T.gold}18 0%, transparent 45%)`,
          ],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      />

      <div style={{
        display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 56,
        alignItems: 'center', height: '100%', position: 'relative', zIndex: 1,
      }}>

        {/* LEFT — Texto + premios */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}
            style={{ marginBottom: 22 }}
          >
            <Tag color={T.gold}>Hora del juego</Tag>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .1 }}
            style={{
              fontFamily: T.D, fontSize: 'clamp(40px,5.2vw,72px)', fontWeight: 800,
              color: T.text, lineHeight: 1.02, marginBottom: 4, letterSpacing: '-0.02em',
            }}
          >Vamos a</motion.h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 24 }}>
            <motion.h1
              animate={{ backgroundPosition: ['0% 50%', '200% 50%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={{
                fontFamily: T.D, fontSize: 'clamp(40px,5.2vw,72px)', fontWeight: 900,
                lineHeight: 1.02, letterSpacing: '-0.02em',
                background: `linear-gradient(90deg, ${T.gold}, ${T.tealBright}, ${T.gold}, ${T.tealBright}, ${T.gold})`,
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text', backgroundClip: 'text',
                WebkitTextFillColor: 'transparent', color: 'transparent',
              }}
            >JUGAR</motion.h1>
            <motion.div
              animate={{ rotate: [-12, 12, -12], y: [0, -5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Gamepad2 size={52} color={T.gold} strokeWidth={1.8} />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .35 }}
            style={{ color: T.muted, fontSize: 19, fontFamily: T.B, lineHeight: 1.6, marginBottom: 32, maxWidth: 520 }}
          >
            Escaneá el QR, entrá al Kahoot y respondé bien.<br />
            <strong style={{ color: T.text }}>Los 3 primeros en responder correctamente ganan premios.</strong>
          </motion.p>

          {/* Prize cards */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .5 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 11 }}
          >
            {prizes.map(({ place, label, color }, i) => (
              <motion.div key={i}
                animate={{ x: [0, i % 2 === 0 ? 5 : -5, 0] }}
                transition={{ duration: 3.2 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
              >
                <Card style={{
                  display: 'flex', alignItems: 'center', gap: 18, padding: '15px 22px',
                  borderColor: `${color}30`, background: `${color}08`,
                }}>
                  <motion.div
                    animate={{ scale: [1, 1.13, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.45, ease: 'easeInOut' }}
                    style={{
                      width: 46, height: 46, borderRadius: 10,
                      background: `${color}20`, border: `1.5px solid ${color}55`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: T.D, fontWeight: 900, fontSize: 20, color,
                      flexShrink: 0,
                    }}
                  >{place}</motion.div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: T.text, fontFamily: T.B, fontWeight: 700, fontSize: 17 }}>{label}</div>
                    <div style={{ color: T.muted, fontFamily: T.B, fontSize: 13 }}>Premio sorpresa Bitget</div>
                  </div>
                  <Gift size={22} color={color} strokeWidth={1.8} style={{ opacity: .75 }} />
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — QR Kahoot */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', position: 'relative',
        }}>
          {/* Glow gold + teal */}
          <motion.div
            animate={{ scale: [1, 1.16, 1], opacity: [0.28, 0.68, 0.28] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: 460, height: 460,
              top: '50%', left: '50%',
              transform: 'translate(-50%, -58%)',
              background: `radial-gradient(circle, ${T.gold}50 0%, ${T.teal}22 40%, transparent 70%)`,
              borderRadius: '50%', filter: 'blur(32px)', pointerEvents: 'none',
            }}
          />
          <motion.div
            animate={{ scale: [1.06, 0.94, 1.06], opacity: [0.2, 0.44, 0.2] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: 360, height: 360,
              top: '50%', left: '50%',
              transform: 'translate(-50%, -58%)',
              background: `radial-gradient(circle, ${T.tealBright}28 0%, transparent 65%)`,
              borderRadius: '50%', filter: 'blur(26px)', pointerEvents: 'none',
            }}
          />

          {/* Kahoot logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: .6, delay: .25, ease: [.22, 1, .36, 1] }}
            style={{ position: 'relative' }}
          >
            {/* Glow púrpura */}
            <motion.div
              animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0.65, 0.3] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', inset: -30,
                background: 'radial-gradient(circle, #46178F80 0%, transparent 70%)',
                filter: 'blur(24px)', borderRadius: '50%', pointerEvents: 'none',
              }}
            />
            <div style={{
              position: 'relative',
              background: '#46178F',
              borderRadius: 28,
              padding: '48px 64px',
              boxShadow: '0 24px 80px #46178F55, 0 0 0 1px #7C3AED40',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
            }}>
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  fontFamily: T.D, fontWeight: 900, fontSize: 72, color: '#FFFFFF',
                  letterSpacing: '-0.03em', lineHeight: 1,
                }}
              >Kahoot!</motion.div>
              <div style={{
                color: 'rgba(255,255,255,0.5)', fontFamily: T.M, fontSize: 13,
                letterSpacing: '.1em', textTransform: 'uppercase',
              }}>kahoot.it</div>
            </div>
          </motion.div>

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .5, delay: .6 }}
            style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 12 }}
          >
            <motion.div
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ color: T.gold, fontSize: 18, lineHeight: 1 }}
            >●</motion.div>
            <span style={{
              fontFamily: T.M, fontSize: 14, color: T.gold, fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '.08em',
            }}>El link lo proyectamos en pantalla</span>
          </motion.div>
        </div>
      </div>
    </Slide>
  )
}

// ─── SLIDE FINAL: AGRADECIMIENTOS ────────────────────────────
function SlideThanks() {
  const speakers = [
    {
      name: 'Facundo',
      surname: 'Padilla',
      role: 'Software Engineer · Founder SaltaDev',
      photo: '/facundopadilla.jpg',
      url: 'https://linktr.ee/facundopadilla',
      urlLabel: 'linktr.ee/facundopadilla',
      color: T.teal,
    },
    {
      name: 'Matias',
      surname: 'Part',
      role: 'Bitget · Best Manager 2025',
      photo: '/matiaspart.jpeg',
      url: 'https://www.linkedin.com/in/jmpart/',
      urlLabel: 'linkedin.com/in/jmpart',
      color: T.tealBright,
    },
  ]

  return (
    <Slide>
      {/* Ambient drift */}
      <motion.div
        animate={{
          background: [
            `radial-gradient(circle at 20% 40%, ${T.teal}18 0%, transparent 55%)`,
            `radial-gradient(circle at 80% 60%, ${T.teal}18 0%, transparent 55%)`,
            `radial-gradient(circle at 20% 40%, ${T.teal}18 0%, transparent 55%)`,
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      />

      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}
            style={{ marginBottom: 16 }}
          >
            <Tag>Hasta la próxima</Tag>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .1 }}
            style={{
              fontFamily: T.D, fontSize: 'clamp(48px,6.5vw,88px)', fontWeight: 900,
              lineHeight: 1.0, letterSpacing: '-0.025em', marginBottom: 12,
              background: `linear-gradient(90deg, ${T.teal}, ${T.tealBright}, ${T.gold})`,
              WebkitBackgroundClip: 'text', backgroundClip: 'text',
              WebkitTextFillColor: 'transparent', color: 'transparent',
            }}
          >¡Gracias!</motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .22 }}
            style={{ color: T.muted, fontSize: 18, fontFamily: T.B, letterSpacing: '.03em' }}
          >
            Seguinos en nuestras redes para más contenido
          </motion.p>
        </div>

        {/* Speaker cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
          {speakers.map(({ name, surname, role, photo, url, urlLabel, color }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .55, delay: .32 + i * .14, ease: [.22, 1, .36, 1] }}
            >
              <Card style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 16, padding: '28px 24px', textAlign: 'center',
                border: `1px solid ${color}30`, background: `${color}06`,
              }}>
                {/* Photo */}
                <div style={{ position: 'relative' }}>
                  <motion.div
                    animate={{ opacity: [0.4, 0.75, 0.4] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
                    style={{
                      position: 'absolute', inset: -10,
                      background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
                      filter: 'blur(14px)', borderRadius: '50%', pointerEvents: 'none',
                    }}
                  />
                  <img
                    src={photo}
                    alt={`${name} ${surname}`}
                    style={{
                      position: 'relative',
                      width: 88, height: 88, borderRadius: '50%', objectFit: 'cover',
                      border: `2.5px solid ${color}70`,
                      boxShadow: `0 8px 32px ${color}30`,
                    }}
                  />
                </div>

                {/* Name + role */}
                <div>
                  <div style={{
                    fontFamily: T.D, fontWeight: 800, fontSize: 24, color: T.text,
                    letterSpacing: '-0.01em', lineHeight: 1.1,
                  }}>
                    {name} {surname}
                  </div>
                  <div style={{ color: T.muted, fontFamily: T.B, fontSize: 13, marginTop: 5 }}>{role}</div>
                </div>

                {/* QR */}
                <div style={{ position: 'relative' }}>
                  <motion.div
                    animate={{ opacity: [0.3, 0.65, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                    style={{
                      position: 'absolute', inset: -12,
                      background: `radial-gradient(circle, ${color}35 0%, transparent 70%)`,
                      filter: 'blur(10px)', borderRadius: 12, pointerEvents: 'none',
                    }}
                  />
                  <div style={{
                    position: 'relative',
                    background: '#FFFFFF', borderRadius: 14, padding: 14,
                    boxShadow: `0 8px 40px ${color}30, 0 0 0 1px ${color}35`,
                  }}>
                    <QRCodeSVG
                      value={url}
                      size={148}
                      bgColor="#FFFFFF"
                      fgColor="#000000"
                      level="M"
                    />
                  </div>
                </div>

                {/* URL label */}
                <div style={{
                  fontFamily: T.M, fontSize: 12, color, fontWeight: 600,
                  letterSpacing: '.04em', opacity: .85,
                }}>
                  {urlLabel}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Event footer */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .6, delay: .65 }}
          style={{
            marginTop: 28, textAlign: 'center',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
          }}
        >
          <img src="/saltadev.png" alt="SaltaDev" style={{ height: 22, opacity: .6, objectFit: 'contain' }} />
          <span style={{ color: T.border, fontSize: 18 }}>×</span>
          <img src="/bitget.png" alt="Bitget" style={{ height: 22, opacity: .6, objectFit: 'contain' }} />
          <span style={{ color: T.muted, fontFamily: T.M, fontSize: 12, opacity: .65, marginLeft: 6 }}>
            De Cero a Cripto · 2026
          </span>
        </motion.div>
      </div>
    </Slide>
  )
}

// ─── SLIDES REGISTRY ──────────────────────────────────────────
const SLIDES = [
  { C: SlideRegister,      title: 'Registro · QR' },
  { C: SlideCover,         title: 'De Cero a Cripto' },
  { C: SlideWhoAmI,        title: 'Quién Soy — Facundo' },
  { C: SlideMatiasPart,    title: 'Quién Soy — Matias' },
  { C: SlideSaltaDev,      title: 'SaltaDev' },
  { C: SlideBitget,        title: 'Bitget' },
  { C: SlideCrypto,        title: 'Criptomonedas' },
  { C: SlideBitcoin,       title: 'Bitcoin' },
  { C: SlideCryptoVariety, title: 'Variedad de criptos' },
  { C: SlideHowItWorks,    title: 'Blockchain' },
  { C: SlideValue,         title: 'El Valor' },
  { C: SlideNotScam,       title: 'No son Estafa' },
  { C: SlideWallets,       title: 'Wallets' },
  { C: SlideKeys,          title: 'Anatomía de una Wallet' },
  { C: SlideWalletTypes,   title: 'Tipos de Billetera' },
  { C: SlideScams,         title: 'Estafas' },
  { C: SlideRealUse,       title: 'Uso Real' },
  { C: SlideBitgetAcademy, title: 'Bitget Academy' },
  { C: SlideKahoot,        title: 'Kahoot — Juguemos' },
  { C: SlideThanks,        title: 'Gracias' },
]

// ─── NAVIGATION ───────────────────────────────────────────────
function Navigation({ current, total, onPrev, onNext }) {
  return (
    <>
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.05)', zIndex: 100 }}>
        <motion.div
          animate={{ width: `${((current + 1) / total) * 100}%` }}
          transition={{ duration: .3, ease: 'easeOut' }}
          style={{ height: '100%', background: grad }}
        />
      </div>

      <div style={{
        position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)',
        fontFamily: T.M, fontSize: 12, color: T.muted, zIndex: 100,
        background: 'rgba(0,0,0,0.92)', padding: '6px 18px', borderRadius: 99,
        border: `1px solid ${T.border}`, backdropFilter: 'blur(12px)',
        display: 'flex', gap: 10, alignItems: 'center',
      }}>
        <span style={{ color: T.teal, fontWeight: 700 }}>{current + 1}</span>
        <span style={{ color: T.muted }}>/</span>
        <span>{total}</span>
        <div style={{ width: 1, height: 10, background: T.border }} />
        <span style={{ letterSpacing: '.06em', textTransform: 'uppercase', fontSize: 10 }}>{SLIDES[current].title}</span>
      </div>

      <div style={{
        position: 'fixed', top: 16, right: 24, zIndex: 100,
        background: 'rgba(0,0,0,0.85)', padding: '8px 16px', borderRadius: 99,
        border: `1px solid ${T.border}`, backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <img src="/saltadev.png" alt="SaltaDev" style={{ height: 24, width: 'auto', objectFit: 'contain', display: 'block' }} />
        <div style={{ width: 1, height: 16, background: T.border }} />
        <img src="/bitget.png" alt="Bitget" style={{ height: 24, width: 'auto', objectFit: 'contain', display: 'block' }} />
      </div>

      <AnimatePresence>
        {current > 0 && (
          <motion.button key="prev"
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
            onClick={onPrev}
            whileHover={{ background: `rgba(0,240,255,0.15)`, borderColor: T.teal }}
            style={{
              position: 'fixed', left: 18, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.85)', border: `1px solid ${T.border}`,
              color: T.text, width: 44, height: 44, borderRadius: '50%',
              cursor: 'pointer', zIndex: 100, backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <ChevronLeft size={20} strokeWidth={2} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {current < total - 1 && (
          <motion.button key="next"
            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
            onClick={onNext}
            whileHover={{ scale: 1.08 }}
            style={{
              position: 'fixed', right: 18, top: '50%', transform: 'translateY(-50%)',
              background: `linear-gradient(135deg, ${T.teal}28, ${T.tealBright}14)`,
              border: `1px solid ${T.teal}55`,
              color: T.text, width: 44, height: 44, borderRadius: '50%',
              cursor: 'pointer', zIndex: 100, backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <ChevronRight size={20} strokeWidth={2} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── SLIDE VARIANTS ───────────────────────────────────────────
const slideV = {
  enter: dir => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: dir => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
}

// ─── APP ──────────────────────────────────────────────────────
export default function App() {
  const [cur, setCur] = useState(0)
  const [dir, setDir] = useState(1)

  const goTo = useCallback((i) => {
    setDir(i > cur ? 1 : -1)
    setCur(i)
  }, [cur])

  useEffect(() => {
    const h = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); if (cur < SLIDES.length - 1) goTo(cur + 1) }
      if (e.key === 'ArrowLeft') { e.preventDefault(); if (cur > 0) goTo(cur - 1) }
    }
    addEventListener('keydown', h)
    return () => removeEventListener('keydown', h)
  }, [cur, goTo])

  const Comp = SLIDES[cur].C

  return (
    <div style={{ background: T.bg, width: '100vw', height: '100vh', overflow: 'hidden', fontFamily: T.B, userSelect: 'none' }}>
      <Particles />
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={cur} custom={dir} variants={slideV}
          initial="enter" animate="center" exit="exit"
          transition={{ duration: .45, ease: [.22, 1, .36, 1] }}
          style={{ position: 'absolute', inset: 0, zIndex: 1 }}
        >
          <Comp />
        </motion.div>
      </AnimatePresence>
      <Navigation current={cur} total={SLIDES.length} onPrev={() => goTo(cur - 1)} onNext={() => goTo(cur + 1)} />
    </div>
  )
}
