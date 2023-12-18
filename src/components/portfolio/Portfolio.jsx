import React from 'react'
import './portfolio.css'
import IMG1 from '../../assets/portfolio.png'


const data = [
  {
    id: 1,
    image: IMG1,
    title: 'Perssonal Portfolio',
    github: 'http://github.com',
    demo: 'http://github.com'
  },
{
  id: 2,
  image: IMG1,
  title: 'title of the project that i have done',
  github: 'http://github.com',
  demo: 'http://github.com'
}
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
              <img src={image} alt={title} />
            </div>
            <h3>{title}</h3>
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