import React from 'react'
import './experience.css'
import { BsPatchCheckFill } from 'react-icons/bs'

const tools = [
  {
    name: 'React',
    projects: [
      { label: 'F1 Dashboard', url: 'https://github.com/Kyoko522/f1-dashboard' },
      { label: 'PawFind',      url: 'https://github.com/Kyoko522/Paw-App' },
      { label: 'Portfolio',    url: 'https://github.com/Kyoko522/react-portfolio' },
    ],
  },
  {
    name: 'Next.js',
    projects: [
      { label: 'Portfolio', url: 'https://github.com/Kyoko522/react-portfolio' },
    ],
  },
  {
    name: 'Node.js / Express',
    projects: [
      { label: 'PawFind', url: 'https://github.com/Kyoko522/Paw-App' },
    ],
  },
  {
    name: 'FastAPI (Python)',
    projects: [
      { label: 'F1 Dashboard', url: 'https://github.com/Kyoko522/f1-dashboard' },
    ],
  },
  {
    name: 'MongoDB',
    projects: [
      { label: 'PawFind', url: 'https://github.com/Kyoko522/Paw-App' },
    ],
  },
  {
    name: 'Socket.IO',
    projects: [
      { label: 'PawFind', url: 'https://github.com/Kyoko522/Paw-App' },
    ],
  },
  {
    name: 'Docker',
    projects: [
      { label: 'PawFind', url: 'https://github.com/Kyoko522/Paw-App' },
    ],
  },
  {
    name: 'JWT Auth',
    projects: [
      { label: 'PawFind', url: 'https://github.com/Kyoko522/Paw-App' },
    ],
  },
]

const courses = [
  'Machine Learning',
  'Artificial Intelligence I',
  'Database Systems (I & II)',
  'Operating Systems',
  'Computer Networks',
  'Software Engineering',
  'Algorithms',
  'Computer Security',
  'Comparative Programming Languages',
  'Computer Graphics',
  'Introduction to Computer Vision',
  'Autonomous Mobile Robotics',
]

export const Experience = () => {
  return (
    <section id='experience'>
      <h5>What I&apos;ve Built With</h5>
      <h2>Experience</h2>

      <div className='container experience__container'>

        <div className='experience__item'>
          <h3>Tools &amp; Projects</h3>
          <div className='experience__tools'>
            {tools.map(({ name, projects }) => (
              <div key={name} className='experience__tool-row'>
                <span className='experience__tool-name'>{name}</span>
                <span className='experience__tool-links'>
                  {projects.map((p, i) => (
                    <span key={p.url}>
                      <a href={p.url} target='_blank' rel='noopener noreferrer'>
                        {p.label}
                      </a>
                      {i < projects.length - 1 && ' · '}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className='experience__item'>
          <h3>Undergraduate Coursework</h3>
          <div className='experience__content'>
            {courses.map(course => (
              <article key={course} className='experience__details'>
                <BsPatchCheckFill className='experience__details-icon'/>
                <div>
                  <h4 className='text-light'>{course}</h4>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default Experience
