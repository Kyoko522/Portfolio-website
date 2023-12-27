import React from 'react'
import './contacts.css'
// import BiLogoGmail from 'react-icons/bi'

export const Contacts = () => {
  return (
    <section id='contact'>
      <h5>Get In Touch</h5>
      <h2>Contact Me</h2>

      <div className='container contact_container'>
        <div className='contact_options'>
    
          
          
        </div>
    {/* END OF CONTACT OPTIONS */}
        <form action=''>
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