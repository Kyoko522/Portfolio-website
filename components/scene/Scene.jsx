'use client'
import React, { useEffect, useRef, useState } from 'react'
import './scene.css'
import { BsLaptop, BsHeadphones, BsJournal } from 'react-icons/bs'
import { GiF1Car, GiSteeringWheel, GiSoccerBall, GiCircuitry, GiToolbox } from 'react-icons/gi'

/* ──────────────────────────────────────────────────────────────────
   EDIT ME. Every object on the desk reveals one of these stories.
   Add, remove, rewrite freely. `pos` is { top, left } in % of the
   scene container so it scales on any screen size.
   ────────────────────────────────────────────────────────────────── */
const ITEMS = [
  {
    id: 'f1',
    label: 'F1',
    Icon: GiF1Car,
    pos: { top: '14%', left: '50%' },
    title: 'F1, especially the strategy',
    text: "I follow it way too closely. I built a full telemetry dashboard just so I could replay races the way I actually want to see them. Race weekends are sacred.",
  },
  {
    id: 'headphones',
    label: 'Headphones',
    Icon: BsHeadphones,
    pos: { top: '22%', left: '20%' },
    title: 'Background noise, always',
    text: "I cannot focus in silence. Usually it's lo-fi, or old F1 race replays on mute. Whichever one feels less distracting on the day.",
  },
  {
    id: 'steering',
    label: 'Cars',
    Icon: GiSteeringWheel,
    pos: { top: '50%', left: '16%' },
    title: 'Cars & modding',
    text: "Engines, modding, understanding exactly why something performs the way it does and then changing it. Getting under the hood is just as satisfying to me as writing code.",
  },
  {
    id: 'laptop',
    label: 'Code',
    Icon: BsLaptop,
    pos: { top: '50%', left: '50%' },
    title: 'The keyboard',
    text: "CS grad from TMU. Java was my first serious language, Python is where I prototype, React is where things like this site live. I rewrite working functions three times before admitting they were fine.",
  },
  {
    id: 'circuit',
    label: 'Mechatronics',
    Icon: GiCircuitry,
    pos: { top: '50%', left: '84%' },
    title: 'Going for Mechatronics',
    text: "I just finished my CS degree and I'm leaning into Mechatronics for the Master's. I've never been able to pick just one side. Code and hardware working together is where the fun is.",
  },
  {
    id: 'soccer',
    label: 'Sports',
    Icon: GiSoccerBall,
    pos: { top: '80%', left: '22%' },
    title: 'Staying active',
    text: "There's something about being in the middle of a game where everything else just turns off and you're fully locked in. I chase that feeling a lot.",
  },
  {
    id: 'journal',
    label: 'Learning',
    Icon: BsJournal,
    pos: { top: '82%', left: '50%' },
    title: 'Always something open',
    text: "Right now: iterating on EcoDex, a plant-data explorer. I get into something, want to understand it completely, then build something around it. That kind of spiral happens a lot.",
  },
  {
    id: 'toolbox',
    label: 'Tinkering',
    Icon: GiToolbox,
    pos: { top: '80%', left: '78%' },
    title: 'Hardware tinkering',
    text: "Building physical things and watching code make them move is its own reward. This is the part of my Master's I'm most excited about.",
  },
]

export default function Scene() {
  const [openId, setOpenId] = useState(null)
  const dialogRef = useRef(null)
  const lastFocusedRef = useRef(null)

  const open = (id, fromEl) => {
    lastFocusedRef.current = fromEl
    setOpenId(id)
  }

  const close = () => {
    setOpenId(null)
    setTimeout(() => lastFocusedRef.current?.focus(), 0)
  }

  useEffect(() => {
    if (!openId) return
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); close() }
      else if (e.key === 'Tab') {
        const card = dialogRef.current
        if (!card) return
        const focusables = card.querySelectorAll('button')
        if (!focusables.length) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.querySelector('button')?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [openId])

  const openItem = ITEMS.find((it) => it.id === openId)

  return (
    <section id="world" className="scene-section">
      <h5>My world</h5>
      <h2>Click anything to learn about me</h2>

      <div className="scene-stage" role="group" aria-label="Interactive scene. Click objects to learn more">
        <div className="scene-stage__bg" aria-hidden="true" />
        {ITEMS.map(({ id, label, Icon, pos }) => (
          <button
            key={id}
            type="button"
            className="scene-item"
            style={{ top: pos.top, left: pos.left }}
            onClick={(e) => open(id, e.currentTarget)}
            aria-label={`${label}: learn more`}
          >
            <span className="scene-item__icon"><Icon aria-hidden="true" /></span>
            <span className="scene-item__label">{label}</span>
          </button>
        ))}
        <p className="scene-hint" aria-hidden="true">tap or click any object →</p>
      </div>

      {openItem && (
        <div className="scene-modal" role="dialog" aria-modal="true" aria-labelledby="scene-modal-title">
          <button
            type="button"
            className="scene-modal__scrim"
            aria-label="Close"
            onClick={close}
          />
          <div ref={dialogRef} className="scene-modal__card">
            <div className="scene-modal__icon"><openItem.Icon aria-hidden="true" /></div>
            <h3 id="scene-modal-title" className="scene-modal__title">{openItem.title}</h3>
            <p className="scene-modal__text">{openItem.text}</p>
            <button
              type="button"
              className="btn btn-primary scene-modal__close"
              onClick={close}
            >Close</button>
          </div>
        </div>
      )}
    </section>
  )
}
