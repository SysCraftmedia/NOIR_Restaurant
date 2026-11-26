import Footer from '@/components/ui/Footer'
import Navbar from '@/components/ui/Navbar'
import ReserveHero from '@/components/ui/reservations/reservationImageSection'
import ReservationSection from '@/components/ui/reservations/reservationssection'
import React from 'react'

const page = () => {
  return (
    <>
    <header>
        <Navbar/>
    </header>
    <main>
        <ReserveHero/>
        <ReservationSection/>
    </main>
    <footer>
        <Footer/>
    </footer>
    </>
  )
}

export default page