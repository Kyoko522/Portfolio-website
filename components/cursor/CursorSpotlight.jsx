'use client'
import { useEffect, useRef } from 'react'
import './cursor.css'

const FADE_MS = 720
const SPARK_MS = 520
const MIN_DIST = 28
const SPARK_COUNT = 7
const SPARK_LEN_MIN = 14
const SPARK_LEN_MAX = 28
const SVG_NS = 'http://www.w3.org/2000/svg'
const SPARK_COLOR = '#ffffff'

// classic circuit wire colors mapped to cardinal directions
const COLOR_RIGHT = '#ff4a4a' // red    (power / +)
const COLOR_DOWN  = '#4aa8ff' // blue   (signal / data)
const COLOR_LEFT  = '#3ddc77' // green  (active / ok)
const COLOR_UP    = '#f5f5f5' // white  (clock / neutral)

function colorForAngle(angle) {
  // atan2(dy, dx) → 0°=right, 90°=down, 180°=left, 270°=up (screen Y points down)
  const deg = ((angle * 180) / Math.PI + 360) % 360
  if (deg < 45 || deg >= 315) return COLOR_RIGHT
  if (deg < 135) return COLOR_DOWN
  if (deg < 225) return COLOR_LEFT
  return COLOR_UP
}

function makeSegment(container, x1, y1, cx, cy, x2, y2, color) {
  const svg = document.createElementNS(SVG_NS, 'svg')
  svg.setAttribute('class', 'cursor-circuit__seg')
  svg.setAttribute('aria-hidden', 'true')
  svg.style.color = color

  const line1 = document.createElementNS(SVG_NS, 'line')
  line1.setAttribute('x1', x1)
  line1.setAttribute('y1', y1)
  line1.setAttribute('x2', cx)
  line1.setAttribute('y2', cy)
  line1.setAttribute('class', 'cursor-circuit__line')

  const line2 = document.createElementNS(SVG_NS, 'line')
  line2.setAttribute('x1', cx)
  line2.setAttribute('y1', cy)
  line2.setAttribute('x2', x2)
  line2.setAttribute('y2', y2)
  line2.setAttribute('class', 'cursor-circuit__line')

  const dot = document.createElementNS(SVG_NS, 'circle')
  dot.setAttribute('cx', cx)
  dot.setAttribute('cy', cy)
  dot.setAttribute('r', '2.6')
  dot.setAttribute('class', 'cursor-circuit__dot')

  svg.appendChild(line1)
  svg.appendChild(line2)
  svg.appendChild(dot)
  container.appendChild(svg)
  setTimeout(() => svg.remove(), FADE_MS + 80)
}

function makeSparks(container, x, y) {
  for (let i = 0; i < SPARK_COUNT; i++) {
    const base = (i / SPARK_COUNT) * Math.PI * 2
    const jitter = (Math.random() - 0.5) * 0.4
    const angle = base + jitter
    const len = SPARK_LEN_MIN + Math.random() * (SPARK_LEN_MAX - SPARK_LEN_MIN)
    const ex = x + Math.cos(angle) * len
    const ey = y + Math.sin(angle) * len

    const svg = document.createElementNS(SVG_NS, 'svg')
    svg.setAttribute('class', 'cursor-circuit__seg cursor-circuit__seg--spark')
    svg.setAttribute('aria-hidden', 'true')
    svg.style.color = SPARK_COLOR

    const line = document.createElementNS(SVG_NS, 'line')
    line.setAttribute('x1', x)
    line.setAttribute('y1', y)
    line.setAttribute('x2', ex)
    line.setAttribute('y2', ey)
    line.setAttribute('class', 'cursor-circuit__line cursor-circuit__line--spark')

    const tip = document.createElementNS(SVG_NS, 'circle')
    tip.setAttribute('cx', ex)
    tip.setAttribute('cy', ey)
    tip.setAttribute('r', '1.8')
    tip.setAttribute('class', 'cursor-circuit__dot')

    svg.appendChild(line)
    svg.appendChild(tip)
    container.appendChild(svg)
    setTimeout(() => svg.remove(), SPARK_MS + 60)
  }
}

export default function CursorSpotlight() {
  const containerRef = useRef(null)
  const headRef = useRef(null)
  const lastPosRef = useRef({ x: -1000, y: -1000 })
  const lastTimeRef = useRef(0)
  const hasMovedRef = useRef(false)
  const axisToggleRef = useRef(true)
  const decayTimerRef = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return

    const container = containerRef.current
    const head = headRef.current
    if (!container || !head) return

    const onMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      head.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`

      if (!hasMovedRef.current) {
        lastPosRef.current = { x, y }
        lastTimeRef.current = performance.now()
        hasMovedRef.current = true
        head.classList.add('cursor-circuit__head--visible')
        return
      }

      const last = lastPosRef.current
      const dx = x - last.x
      const dy = y - last.y
      const dist = Math.hypot(dx, dy)

      const now = performance.now()
      const dt = Math.max(now - lastTimeRef.current, 1)
      const speed = dist / dt
      const intensity = Math.min(speed / 1.8, 1)
      head.style.setProperty('--head-scale', String(1 + intensity * 0.75))
      head.style.setProperty('--head-glow', String(intensity))

      clearTimeout(decayTimerRef.current)
      decayTimerRef.current = setTimeout(() => {
        head.style.setProperty('--head-scale', '1')
        head.style.setProperty('--head-glow', '0')
      }, 140)

      if (dist < MIN_DIST) return

      const goHorizontalFirst =
        Math.abs(dx) > Math.abs(dy)
          ? axisToggleRef.current
          : !axisToggleRef.current
      axisToggleRef.current = !axisToggleRef.current

      const cornerX = goHorizontalFirst ? x : last.x
      const cornerY = goHorizontalFirst ? last.y : y
      const angle = Math.atan2(dy, dx)
      const color = colorForAngle(angle)
      head.style.setProperty('--head-hue', color)

      makeSegment(container, last.x, last.y, cornerX, cornerY, x, y, color)

      lastPosRef.current = { x, y }
      lastTimeRef.current = now
    }

    const onLeave = () => {
      head.classList.remove('cursor-circuit__head--visible')
      hasMovedRef.current = false
      head.style.setProperty('--head-scale', '1')
      head.style.setProperty('--head-glow', '0')
    }

    const onClick = (e) => {
      makeSparks(container, e.clientX, e.clientY)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onClick, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onClick)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      clearTimeout(decayTimerRef.current)
      while (container.firstChild) container.removeChild(container.firstChild)
    }
  }, [])

  return (
    <>
      <div ref={containerRef} className="cursor-circuit-layer" aria-hidden="true" />
      <div ref={headRef} className="cursor-circuit__head" aria-hidden="true">
        <div className="cursor-circuit__head-core" />
      </div>
    </>
  )
}
