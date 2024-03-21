import React from 'react'
import CV from '../../assets/Sheel Patel Resume.pdf'
import './header.css'

export const CTA = () => {
  return (
    <div className='cta'>
        <a className='btn' href={CV} download>Download CV</a>
        <a className='btn btn-primary' href='#contact'>Contact Me</a>
    </div>
  )
}

export default CTA