import Footer from '@/components/ui/Footer'
import Navbar from '@/components/ui/Navbar'
import PrivateDiningFeatures from '@/components/ui/privateDining/priviateDiningFeatureSection'
import PrivateDiningHero from '@/components/ui/privateDining/PriviateDiningImageSection'
import React from 'react'

const page = () => {
  return (
    <>
     <header>
        <Navbar/>
     </header>
     <main>
        <PrivateDiningHero/>
        <PrivateDiningFeatures/>
     </main>
     <footer>
        <Footer/>
     </footer>
    </>
  )
}

export default page