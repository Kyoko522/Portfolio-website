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

      <div className='about__me'>
        <div className='about__me-image'>
          <img src={Sheel} alt="sheel photo" />
        </div>
      </div>

      <div className='about__description'>
        <div className="about_cards">

          <article className="about__card">
            <FaAward className='about__icons'/>
            <h5>Experience</h5>
            <small>3+ Years Working</small>
            </article>

            <article className="about__card">
            <FaAward className='about__icons'/>
            <h5>Experience</h5>
            <small>3+ Years Working</small>
            </article>

            <article className="about__card">
            <FaAward className='about__icons'/>
            <h5>Experience</h5>
            <small>3+ Years Working</small>
            </article>
            
        </div>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quibusdam harum, facilis eum culpa temporibus quas corporis rerum quisquam officia fugiat laboriosam autem sequi dignissimos voluptatibus impedit. Ducimus, facere sed.</p>

        <a href='#contact' className='btn btn-primary'>Let's Talk</a>
      </div>
      </div>
    </section>
  )
}

export default About