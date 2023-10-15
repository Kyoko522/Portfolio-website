import React from 'react'
import CV from '../../assets/Sheel\'s Resume.pdf'
import './header.css'

export const CTA = () => {
  return (
    <div class='cta'>
        <a class='btm' href={CV} download>Download CV</a>
        <a class='btm btm-primary' href='#contact'>Contact Me</a>
    </div>
  )
}

export default CTA