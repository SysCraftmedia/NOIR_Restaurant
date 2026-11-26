import Footer from '@/components/ui/Footer'
import OurGallery from '@/components/ui/Galery/ourGallery'
import Navbar from '@/components/ui/Navbar'
import React from 'react'

const page = () => {
  return (
    <>
    <header>
        <Navbar/>
    </header>
    <main>
        <OurGallery/>
    </main>
    <footer>
        <Footer/>
    </footer>
    </>
  )
}

export default page