import React from 'react'
import ContactUsForm from './ContactUsForm'
import ContactUsMap from './ContactUsMap'

export default function ContactUs() {
  return (
    <section id="contact" className='container grid md:grid-cols-2 gap-4 p-1'>
        <ContactUsForm />
        <ContactUsMap />
    </section>
  )
}
