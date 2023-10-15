import React from 'react'
import './header.css'
import CTA from './CTA'

export const Header = () => {
  return (
    <header>
      <div className="container header__container">
        <h5>Hello I'm</h5>
        <h1>Sheel Patel</h1>
        <h5 className='text-light'>Fullstack Developer and Mobile Developer</h5>
        <CTA />
      </div>
    </header>
  )
}

// us this link to comtinue working on it when u get free again
// https://youtu.be/G-Cr00UYokU?t=3020

export default Header