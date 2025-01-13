import React from 'react';
import './header.css';
import CTA from './CTA';
import HeaderSocials from './headerSocials';
import Image from 'next/image'

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
        <Image src="/assets/sheelmain.png" alt="Sheel Patel" width={1364} height={2630} objectFit='contain' priority layout='intrinsic'/> 
        {/* Demension are set the the pixel of the image */}
        </div>
        <a href='#about' className='scroll_down'>Scroll Down</a>
      </div>
    </header>
  );
};

export default Header;