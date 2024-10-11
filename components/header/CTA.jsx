import React from 'react'
import './header.css'

export const CTA = () => {
  return (
    <div className='cta'>
        <a className='btn' href={`/assets/resume.pdf`} download>Download CV</a>
        <a className='btn btn-primary' href='#contact'>Contact Me</a>
    </div>
  )
}

export default CTA