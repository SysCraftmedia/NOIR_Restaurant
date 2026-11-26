import ContactSection from '@/components/ui/contact/contactsection'
import ContactHero from '@/components/ui/contact/contactImageSection'
import Footer from '@/components/ui/Footer'
import Navbar from '@/components/ui/Navbar'
import React from 'react'

const page = () => {
  return (
    <>
    <header>
        <Navbar/>
    </header>
     <main>
       <ContactHero/>
       <ContactSection/>
     </main>
     <footer>
       <Footer/>
     </footer>
    </>
  )
}

export default page