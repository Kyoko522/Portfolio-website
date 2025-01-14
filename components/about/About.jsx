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
                            I&apos;sm Sheel Patel, a dedicated and versatile Computer Science student at Toronto Metropolitan University. Proficient in programming languages like Python, Java, and more, with a GPA of 3.7+. Ready to excel in computer science and contribute to innovative projects and teams. Explore my work below!
                        </p>
                        <a href='#contact' className='btn btn-primary'>Let&apos;s Talk</a>
                    </div>
                </div>
            </div>
        </section>
    )
}
