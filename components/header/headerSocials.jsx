import React from 'react'
import {BsLinkedin} from 'react-icons/bs'
import {BsGithub} from 'react-icons/bs'

export const HeaderSocials = () => {
  return (
    <div className='header__socials'>
        <a href="https://ca.linkedin.com/in/s60patel" target='_blank' rel="noreferrer"><BsLinkedin/></a>
        <a href="https://github.com/Kyoko522" target='_blank' rel="noreferrer"><BsGithub/></a>
    </div>
  )

}

export default HeaderSocials