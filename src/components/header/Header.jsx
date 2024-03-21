import React from 'react';
import './header.css';
import CTA from './CTA';
import HeaderSocials from './headerSocials';
import Sheel from '../../assets/sheelmain.png';

export const Header = () => {
  return (
    <header>
      <div className="container header__container">
        <h5>Hello I&apos;m</h5>
        <h1>Sheel Patel</h1>
        <h5 className='text'>Fullstack Developer and Mobile Developer</h5>
        <CTA />
        <HeaderSocials />
        <div className="sheel_img">
          <img src={Sheel} alt='Sheel Patel' />
        </div>
        <a href='#about' className='scroll_down'>Scroll Down</a>
      </div>
    </header>
  );
};

export default Header;
