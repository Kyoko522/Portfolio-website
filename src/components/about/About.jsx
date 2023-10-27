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

        <p>I'm Sheel Patel, a dedicated and versatile Computer Science student at Toronto Metropolitan University. Proficient in programming languages like Python, Java, and more, with a GPA of 3.7+. Ready to excel in computer science and contribute to innovative projects and teams. Explore my work below!</p>

        <a href='#contact' className='btn btn-primary'>Let's Talk</a>
      </div>
      </div>
    </section>
  )
}

export default About