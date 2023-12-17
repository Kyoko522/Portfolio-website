import React from 'react'
import './about.css'
import Sheel from '../../assets/sheel.png';
import {FaAward} from 'react-icons/fa'

export const About = () => {
  return (
    <section id='about'>
      <h5>Get To Know</h5>
      <h2>About Me</h2>


      <div className='container about__container'>

        <div className= 'about__me'>
          <div className= 'about__me-image'>
            <img src={Sheel} alt='Sheel About Image'/>
          </div>
        </div>

        <div className='about__content'>
          <div className='about__cards'>
            <article className='about__card'>
              <FaAward className='about__icon'/>
              <h5>School</h5>
              <small>2 Years</small>
              </article>
              <article className='about__card'>
              <FaAward className='about__icon'/>
              <h5>Experience</h5>
              <small>2 Years</small>
              </article>
              <article className='about__card'>
              <FaAward className='about__icon'/>
              <h5>Projects</h5>
              <small>10 plus</small>
              </article>

          </div>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet blanditiis mollitia autem possimus, atque ut at eveniet ea explicabo tenetur consequuntur eligendi, nam beatae dolores cum iusto! Quisquam, quas? Non.
          </p>
          <a href='#content' className='btn btn-primary'>Let's Talk</a> 
        </div>

      </div>
      
    </section>
  )
}

export default About