'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import './about.css'
import { MdOutlineComputer } from "react-icons/md";
import { FaSchool } from "react-icons/fa6";
import { FaCode } from "react-icons/fa";

export default function About() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    '/assets/sheel.png',
    '/assets/sheel2.png',
    '/assets/sheel3.png'
  ];

  const handleImageClick = () => {
    const nextIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(nextIndex);
  };

  return (
    <section id="about">
      <h5>Get To Know</h5>
      <h2>About Me</h2>

      <div className="container about__container">
        <div className="about__me" onClick={handleImageClick}>
          <div className="about__me-image">
            <Image
              src={images[currentImageIndex]}
              alt={`Sheel About ${currentImageIndex + 1}`}
              width={3024}
              height={4032}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
            />
          </div>
        </div>

        <div className="about__content">
          <div className="about__cards">
            <article className="about__card">
              <FaSchool className="about__icon" />
              <h5>University</h5>
              <small>Toronto Metropolitan University</small>
              <small>B.Sc. Computer Science</small>
            </article>

            <article className="about__card">
              <MdOutlineComputer className="about__icon" />
              <h5>Experience</h5>
              <small>Java, Python, JavaScript</small>
            </article>

            <article className="about__card">
              <FaCode className="about__icon" />
              <h5>Projects</h5>
              <a href="https://sheelportfolio.vercel.app/vault" style={{ textDecoration: 'none', cursor: 'default' }}>
                <small>10+</small>
              </a>
            </article>
          </div>

          <div className="about__text">
            <p>Hey, I&apos;m Sheel.</p>
            <p>
              I just finished my Computer Science degree at TMU and I&apos;m already
              thinking about what&apos;s next. Mechatronics for my Master&apos;s feels
              right because honestly I&apos;ve never been able to pick just one side.
              I love coding, I love hardware, and I love the moment when the two
              actually work together. That&apos;s where the fun is.
            </p>
            <p>
              Cars and motorcycles are a big part of my life. I love engines,
              I love modding, and I love understanding exactly why something
              performs the way it does and then changing it. Getting under the
              hood and actually tweaking things is just as satisfying to me as
              writing code. I follow F1 closely too, and at some point I just
              built a full telemetry dashboard so I could replay races the way
              I actually wanted to see them. That kind of thing happens a lot
              with me. I get into something, I want to understand it completely,
              and then I want to build something around it.
            </p>
            <p>
              Outside of tech I stay pretty active. I play sports and I&apos;m always
              looking for the next physical thing to get into. There&apos;s something
              about being in the middle of a game where everything else just turns
              off and you&apos;re fully locked in. I chase that feeling a lot.
            </p>
            <p>
              The way I approach projects is pretty similar. I like figuring out
              what&apos;s actually going on under the surface and iterating until it
              feels right. I&apos;m not great at leaving things half finished. If
              something isn&apos;t working I&apos;d rather stay with it and figure it out
              than move on and forget about it.
            </p>
            <p>
              I also really enjoy collaborating. Some of my favorite projects came
              out of just sitting with people, throwing ideas around, and building
              something none of us would have come up with alone. That energy is
              hard to replicate and I look for it wherever I can.
            </p>
            <p>
              Anyway, this is my corner of the internet. Have a look around and
              feel free to reach out.
            </p>

            <a href="#contact" className="btn btn-primary">
              Let&apos;s Talk
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}