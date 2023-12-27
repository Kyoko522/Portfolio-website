import React from 'react'
import './experience.css'
import { BsPatchCheckFill } from 'react-icons/bs'

export const Experience = () => {
  return (
    <section id='experience'>
      <h5>The Skills that I Have</h5>
      <h2>Experience</h2>

      <div className='container experience__container'>


        <div className='experience__item'>
          <h3>Frontend Development</h3>
          <div className='experience__content'>
          <article className='experience__details'>
              <BsPatchCheckFill className='experience__details-icon'/>
              <div>
              <h4 className='text-light'>HTML</h4>
              <small className='text-light-s'>Experienced</small>
              </div>
            </article>

            <article className='experience__details'>
              <BsPatchCheckFill className='experience__details-icon'/>
              <div>
              <h4 className='text-light'>CSS</h4>
              <small className='text-light-s'>Experienced</small>
              </div>
            </article>

            <article className='experience__details'>
              <BsPatchCheckFill className='experience__details-icon'/>
              <div>
              <h4 className='text-light'>JavaScript</h4>
              <small className='text-light-s'>Experienced</small>
              </div>
            </article>

            <article className='experience__details'>
              <BsPatchCheckFill className='experience__details-icon'/>
              <div>
              <h4 className='text-light'>BootStrap</h4>
              <small className='text-light-s'>Experienced</small>
              </div>
            </article>

            <article className='experience__details'>
              <BsPatchCheckFill className='experience__details-icon'/>
              <div>
              <h4 className='text-light'>TailWind</h4>
              <small className='text-light-s'>Experienced</small>
              </div>
            </article>

            <article className='experience__details'>
              <BsPatchCheckFill className='experience__details-icon'/>
              <div>
                <h4 className='text-light'>React</h4>
              <small className='text-light-s'>Experienced</small>
              </div>
            </article>
          </div>
        </div>

        <div className='experience__item'>
          <h3>Courses</h3>
          <div className='experience__content'>
          <article className='experience__details'>
              <BsPatchCheckFill className='experience__details-icon'/>
              <div>
              <h4 className='text-light'>Computer Science I (Python)</h4>
              <small className='text-light-s'>Experienced</small>
              </div>
            </article>

            <article className='experience__details'>
              <BsPatchCheckFill className='experience__details-icon'/>
              <div>
              <h4 className='text-light'>Computer Science II (Java)</h4>
              <small className='text-light-s'>Experienced</small>
              </div>
            </article>

            <article className='experience__details'>
              <BsPatchCheckFill className='experience__details-icon'/>
              <div>
              <h4 className='text-light'>Computer Organization I</h4>
              <small className='text-light-s'>Experienced</small>
              </div>
            </article>

            <article className='experience__details'>
              <BsPatchCheckFill className='experience__details-icon'/>
              <div>
              <h4 className='text-light'>Computer Organization II</h4>
              <small className='text-light-s'>Experienced</small>
              </div>
            </article>

            <article className='experience__details'>
              <BsPatchCheckFill className='experience__details-icon'/>
              <div>
              <h4 className='text-light'>Data Structures and Algorithm</h4>
              <small className='text-light-s'>Experienced</small>
              </div>
            </article>

            <article className='experience__details'>
              <BsPatchCheckFill className='experience__details-icon'/>
              <div>
              <h4 className='text-light'>Introduction to Robotics</h4>
              <small className='text-light-s'>Experienced</small>
              </div>
            </article>
          </div>
        </div>


      </div>
    </section>
  )
}

export default Experience
