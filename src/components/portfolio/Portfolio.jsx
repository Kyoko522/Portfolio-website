import React from 'react'
import './portfolio.css'
import IMG1 from '../../assets/portfolio.png'
import IMG2 from '../../assets/icon.png'
import IMG3 from '../../assets/TaskTonic.png'
import IMG4 from '../../assets/Minesweeper.png'
import IMG5 from '../../assets/Flashcards-pic.png'

const data = [
  {
    id: 1,
    image: IMG1,
    title: 'Personal Portfolio',
    github: 'https://github.com/Kyoko522/react-portfolio',
    demo: 'still need to host to the web'
  },
{
  id: 2,
  image: IMG2,
  title: '3D Animated Portfolio',
  github: 'https://github.com/Kyoko522/Sheel-3D-Portfolio/tree/main',
  demo: 'https://sheel-portfolio.netlify.app/'
},
{
  id: 3,
  image: IMG3,
  title: 'TaskTonic',
  github: 'https://github.com/Kyoko522/TaskTonic',
  demo: 'https://tasktonic.netlify.app/',
},
{
  id: 4,
  image: IMG4,
  title: 'Minesweeper',
  github: 'https://github.com/Kyoko522/MineSweeper-Game'
},
{
  id: 5, 
  image: IMG5,
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
              <img className='portfolio__project-img' src={image} alt={title} />
            </div>
            <h3 className='portfolio__item-title'>{title}</h3>
            <div className='portfolio__item-cta'>
              <a href={github} className='btn btn-primary'>
                View Code
              </a>
              <a href={demo} className='btn btn-primary'>
                Live Demo
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Portfolio