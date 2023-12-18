import React, {useState} from 'react'
import './about.css'
import Sheel from '../../assets/sheel.png';
import Sheel2 from '../../assets/sheel2.png';
import Sheel3 from '../../assets/sheel3.png';
import Sheel4 from '../../assets/sheel4.png';
import { MdOutlineComputer } from "react-icons/md";
import { MdSchool } from "react-icons/md";
import { FaCode } from "react-icons/fa";


export const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [Sheel, Sheel2, Sheel3, Sheel4]; // Adding more images

  const handleImageClick = () => {
    console.log('Image clicked');
    const nextIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(nextIndex);
  };

  return (
    <section id='about'>
      <h5>Get To Know</h5>
      <h2>About Me</h2>


      <div className='container about__container'>

        <div className= 'about__me' onClick={handleImageClick}>
          <div className= 'about__me-image'>
            <img src={images[currentImageIndex]} alt={`Sheel About Image ${currentImageIndex + 1}`} />
            {/* <img src={Sheel} alt='Sheel About Image' /> */}
          </div>
        </div>

        <div className='about__content'>
          <div className='about__cards'>
            <article className='about__card'>
              <MdSchool className='about__icon'/>
              <h5>School</h5>
              <small>Toronto Metropolitan University</small>
              <small>3.7+ CGPA</small>
              </article>
              <article className='about__card'>
              <MdOutlineComputer className='about__icon'/>
              <h5>Experience</h5>
              <small>4 Years</small>
              <small>Java Python JavaScript</small>
              </article>
              <article className='about__card'>
              <FaCode className='about__icon'/>
              <h5>Projects</h5>
              <small>10+</small>
              </article>

          </div>
<div className='about__text'>
          <p>
          I'm Sheel Patel, a dedicated and versatile Computer Science student at Toronto Metropolitan University. Proficient in programming languages like Python, Java, and more, with a GPA of 3.7+. Ready to excel in computer science and contribute to innovative projects and teams. Explore my work below!
          </p>
          <a href='#contact' className='btn btn-primary'>Let's Talk</a> 
          </div>
        </div>

      </div>
      
    </section>
  )
}

export default About