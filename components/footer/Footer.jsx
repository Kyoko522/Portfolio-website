import React from 'react'
import './footer.css'
import { BsLinkedin, BsGithub, BsInstagram } from 'react-icons/bs'

export const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer>
      <a href='/' className='footer__logo'>Sheel Patel</a>

      <ul className='permalinks'>
        <li><a href='/'>Home</a></li>
        <li><a href='#about'>About</a></li>
        <li><a href='#experience'>Experience</a></li>
        <li><a href='#portfolio'>Portfolio</a></li>
        <li><a href='#contact'>Contact</a></li>
        <li><a href='/admin'>Admin</a></li>
      </ul>

      <div className='footer__socials'>
        <a href='https://ca.linkedin.com/in/s60patel' target='_blank' rel='noreferrer'><BsLinkedin /></a>
        <a href='https://github.com/Kyoko522' target='_blank' rel='noreferrer'><BsGithub /></a>
        {/* <a href='https://www.instagram.com/sheel_52/' target='_blank' rel='noreferrer'><BsInstagram /></a> */}
      </div>

      <div className='footer__copyright'>
        <small>&copy; {year} Sheel Patel. All rights reserved.</small>
      </div>
    </footer>
  )
}

export default Footer
