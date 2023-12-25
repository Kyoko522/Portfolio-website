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
          <article className='contact_option'>
            {/* <BiLogoGmail className='contact_option-icon'/> */}
            <h4>Email</h4>
            <h5>sheelpatel5252@gmail.com</h5>
            <a href="mailto:sheelpatel5252@gmail.com" target='_blank' rel="noreferrer">Send a message</a>
          </article>

          <article className='contact_option'>
            {/* <BiLogoGmail className='contact_option-icon'/> */}
            <h4>Messanger</h4>
            <h5>sheelpatel52</h5>
            <a href="http://m.me/sheel.patel.1217" target='_blank' rel="noreferrer">Send a message</a>
          </article>

          <article className='contact_option'>
            {/* <BiLogoGmail className='contact_option-icon'/> */}
            <h4>WhatsApp</h4>
            <h5>sheelpatel</h5>
            <a href="http://api.whatsapp.com/send?phone+16478704641" target='_blank' rel="noreferrer">Send a message</a>
          </article>
          
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