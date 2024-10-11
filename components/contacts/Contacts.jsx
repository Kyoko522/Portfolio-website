import React from 'react'
import './contacts.css'
// import BiLogoGmail from 'react-icons/bi'

export const Contacts = () => {
  return (
    <section id='contact'>
      <h5>Get In Touch</h5>
      <h2>Contact Me</h2>

      <div className='container contact__container'>
        <div className='contact__options'>
          
           <article className='contact__option'>
            {/* <BiLogoGmail className='contact_option-icon'/> */}
            <h4>Email</h4>
            <h5>sheelpatel5252</h5>
            <a href="mailto:sheelpatel5252@gmail.com" target='_blank' rel="noreferrer">Send a message</a>
          </article>

          <article className='contact__option'>
            {/* <BiLogoGmail className='contact_option-icon'/> */}
            <h4>LinkedIn</h4>
            <h5>Sheel Patel</h5>
            <a href="https://www.linkedin.com/in/sheel-patel-1212a0262/?originalSubdomain=ca" target='_blank' rel="noreferrer">Send a message</a>
          </article> 

          <article className='contact__option'>
            {/* <BiLogoGmail className='contact_option-icon'/> */}
            <h4>Instagram</h4>
            <h5>sheel_52</h5>
            <a href="https://www.instagram.com/sheel_52/" target='_blank' rel="noreferrer">Send a message</a>
          </article> 
          
          
        </div>
    {/* END OF CONTACT OPTIONS */}
    <form action="https://formsubmit.co/sheelpatel5252@gmail.com" method="POST" >
          <input type="text" name='name' placeholder='Your Full Name' required/>
          <input type="email" name='email' placeholder='Your Email' required />
          <textarea name="message" rows="7" placeholder='Your Message' required ></textarea>
          <button type='submit' className='btn btn-primary'>Send Message</button>
        </form>
        </div>
    </section>
  )
}

export default Contacts