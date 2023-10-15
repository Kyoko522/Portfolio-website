import React from 'react'
import {BsLinkedin} from 'react-icons/bs'
import {BsGithub} from 'react-icons/bs'
import {BsInstagram} from 'react-icons/bs'

export const HeaderSocials = () => {
  return (
    <div className='header__socials'>
        <a href="https://ca.linkedin.com/in/sheel-patel-1212a0262" target='_blank'><BsLinkedin/></a>
        <a href="https://github.com/Kyoko522" target='_blank'><BsGithub/></a>
        <a href="https://https://www.instagram.com/sheel_52/" target='_blank'><BsInstagram/></a>
    </div>
  )

}

export default HeaderSocials