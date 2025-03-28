'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import './about.css'
import { MdOutlineComputer } from "react-icons/md";
import { FaSchool } from "react-icons/fa6";
import { FaCode } from "react-icons/fa";

export default function About() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [`/assets/sheel.png`, `/assets/sheel2.png`, `/assets/sheel3.png`]; // Adding more images

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

                <div className='about__me' onClick={handleImageClick}>
                    <div className='about__me-image'>
                        <Image src={images[currentImageIndex]} alt={`Sheel About ${currentImageIndex + 1}`} width={3024} height={4032}/>
                        {/* <img src={Sheel} alt='Sheel About Image' /> */}
                    </div>
                </div>

                <div className='about__content'>
                    <div className='about__cards'>
                        <article className='about__card'>
                            <FaSchool className='about__icon' />
                            <h5>University </h5>
                            <small>Toronto Metropolitan University</small>
                            <small>3.7+ CGPA</small>
                        </article>
                        <article className='about__card'>
                            <MdOutlineComputer className='about__icon' />
                            <h5>Experience</h5>
                            <small>4 Years</small>
                            <small>Java Python JavaScript</small>
                        </article>
                        <article className='about__card'>
                            <FaCode className='about__icon' />
                            <h5>Projects</h5>
                            <small>10+</small>
                        </article>

                    </div>
                    <div className='about__text'>
                        <p>
                        Hi, I'm Sheel Patel
                        </p>
                        <p>
                        I'm a Computer Science student at Toronto Metropolitan University in my third year. I enjoy creating applications ranging from games to practical tools like flashcards and chess simulators.
                        </p>
                        <p>
                        When I'm not focused on schoolwork, you'll find me designing robots, working under the hood of a car, or coding with Arduino. I'm fascinated by AI and enjoy the perfect balance between solving complex programming challenges and getting my hands dirty with mechanical projects.
                        </p>
                        <p>
                        I thrive in collaborative environments where ideas can be openly discussed and tested. Gaming is another interest of mine - both playing and developing games that create engaging experiences.
                        </p>
                        <p>
                        My approach to computer science is versatile; I enjoy tackling different aspects of projects and paying attention to the details that make technology work smoothly.
                        </p>
                        <p>
                        Welcome to my site - I'm glad you're here!
                        </p>
                        <a href='#contact' className='btn btn-primary'>Let&apos;s Talk</a>
                    </div>
                </div>
            </div>
        </section>
    )
}
