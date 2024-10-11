import React from 'react'
import './portfolio.css'
import Image from 'next/image'

const data = [
  {
    id: 1,
    image: `/assets/food_management.png`,
    title: 'Food Management App',
    github: 'https://github.com/Kyoko522/Food-Management'
  },
  {
    id: 2,
    image: `/assets/portfolio.png`,
    title: 'Personal Portfolio',
    github: 'https://github.com/Kyoko522/react-portfolio',
    demo: 'https://sheel-react-portfolio.netlify.app/'
  },
  {
    id: 3,
    image: `/assets/astro.jpg`,
    title: '3D Animated Portfolio',
    github: 'https://github.com/Kyoko522/Sheel-3D-Portfolio/tree/main',
    demo: 'https://sheel-portfolio.netlify.app/'
  },
  {
    id: 4,
    image: `/assets/Tasktonic.png`,
    title: 'TaskTonic',
    github: 'https://github.com/Kyoko522/TaskTonic',
    demo: 'https://tasktonic.netlify.app/',
  },
  {
    id: 5,
    image: `/assets/Minesweeper.png`,
    title: 'Minesweeper',
    github: 'https://github.com/Kyoko522/MineSweeper-Game'
  },
  {
    id: 6,
    image: `/assets/Flashcards-pic.png`,
    title: 'Python Flashcards',
    github: 'https://github.com/Kyoko522/Flash_Cards'
  },

]
export const Portfolio = () => {
  return (
    <section id='portfolio'>
      <h5>My Recent Projects</h5>
      <h2>Portfolio</h2>

      <div className='container portfolio__container'>
        {data.map(({ id, image, title, github, demo }) => (
          <article className='portfolio__item' key={id}>
            <div className='portfolio__item-image'>
              <Image className='portfolio__project-img' src={image} alt={title} width='1000' height='1000'/>
            </div>
            <h3 className='portfolio__item-title'>{title}</h3>
            <div className='portfolio__item-cta'>
              <a href={github} target='_blank' className='btn btn-primary'>
                View Code
              </a>
              {
                (id === 2 || id === 3 || id === 4) &&
                <a href={demo} target='_blank' className='btn btn-primary'>
                  Live Demo
                </a>
              }
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Portfolio