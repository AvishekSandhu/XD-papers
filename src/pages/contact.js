import React  from 'react';
import "../style/contact.css"

const Contact = () => {
  

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>

      <section className="contact-info">
        <h2>Get in Touch</h2>
        <p>We’d love to hear from you! Whether you have questions, feedback, or need assistance, feel free to reach out to us.</p>

        <div className="contact-details">
          <div className="info">
            <h3>Our Location</h3>
            <p>123 Knowledge Street, Education City, EC 45678</p>
          </div>
          <div className="info">
            <h3>Call Us</h3>
            <p>+1 (234) 567-8900</p>
          </div>
          <div className="info">
            <h3>Email Us</h3>
            <p>support@example.com</p>
          </div>
          <div className="info">
            <h3>Business Hours</h3>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>

        
      </section>

      
       
    </div>
  )
}
export  default Contact;

