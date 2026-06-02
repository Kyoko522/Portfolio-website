'use client'
import React, { useEffect, useState } from 'react';
import './header.css';
import CTA from './CTA';
import HeaderSocials from './headerSocials';
import Image from 'next/image';

const ROLES = [
  'CS Graduate & Fullstack Developer',
  'F1 Telemetry Builder',
  'Mechatronics Tinkerer',
  'Cars, Code & Everything Between',
];

function useTypewriter(words, { typeMs = 70, holdMs = 1400, eraseMs = 35 } = {}) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState('typing');

  useEffect(() => {
    const word = words[wordIdx];
    let timer;
    if (phase === 'typing') {
      if (text.length < word.length) {
        timer = setTimeout(() => setText(word.slice(0, text.length + 1)), typeMs);
      } else {
        timer = setTimeout(() => setPhase('erasing'), holdMs);
      }
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(word.slice(0, text.length - 1)), eraseMs);
      } else {
        setWordIdx((wordIdx + 1) % words.length);
        setPhase('typing');
      }
    }
    return () => clearTimeout(timer);
  }, [text, phase, wordIdx, words, typeMs, holdMs, eraseMs]);

  return text;
}

export const Header = () => {
  const role = useTypewriter(ROLES);

  return (
    <header>
      <div className="container header__container">
        <h5>Hello I&apos;m</h5>
        <h1>Sheel Patel</h1>
        <h5 className='text'>
          <span className='role_typewriter' aria-live='polite'>{role}</span>
        </h5>
        <CTA />
        <HeaderSocials />
        <div className="sheel_img">
          <Image
            src="/assets/sheelmain.png"
            alt="Sheel Patel"
            fill
            sizes="(max-width: 768px) 0px, (max-width: 1200px) 40vw, 40rem"
            priority
          />
        </div>
        <a href='#about' className='scroll_down'>Scroll Down</a>
      </div>
    </header>
  );
};

export default Header;
