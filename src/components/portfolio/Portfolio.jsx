import React from 'react'
import './portfolio.css'
import IMG1 from '../../assets/Flashcards-pic.png'

export const Portfolio = () => {
  return (
    <section id='portfolio'>
      <h5>My Recent Projects</h5>
      <h2>Portfolio</h2>

      <div className='container portfolio__container'>
      <article className='portfolio__item'>
          <div className='portfolio__item-image'>
            <img src={IMG1} alt="" />
          </div>
          <h3>This is a protfolio item title</h3>
          <a href='#' className='btn btn-primary'>View Code</a>
          <a href='#' className='btn btn-primary'>Live Demo</a>
        </article>

        <article className='portfolio__item'>
          <div className='portfolio__item-image'>
            <img src={IMG1} alt="" />
          </div>
          <h3>This is a protfolio item title</h3>
          <a href='#' className='btn btn-primary'>View Code</a>
          <a href='#' className='btn btn-primary'>Live Demo</a>
        </article>

        <article className='portfolio__item'>
          <div className='portfolio__item-image'>
            <img src={IMG1} alt="" />
          </div>
          <h3>This is a protfolio item title</h3>
          <a href='#' className='btn btn-primary'>View Code</a>
          <a href='#' className='btn btn-primary'>Live Demo</a>
        </article>

        <article className='portfolio__item'>
          <div className='portfolio__item-image'>
            <img src={IMG1} alt="" />
          </div>
          <h3>This is a protfolio item title</h3>
          <a href='#' className='btn btn-primary'>View Code</a>
          <a href='#' className='btn btn-primary'>Live Demo</a>
        </article>

        <article className='portfolio__item'>
          <div className='portfolio__item-image'>
            <img src={IMG1} alt="" />
          </div>
          <h3>This is a protfolio item title</h3>
          <a href='#' className='btn btn-primary'>View Code</a>
          <a href='#' className='btn btn-primary'>Live Demo</a>
        </article>

      </div>

    </section>
  )
}

export default Portfolio