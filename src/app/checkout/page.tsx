import CheckoutSection from '@/components/ui/Checkout/CheckoutForm'
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
        <CheckoutSection/>
       </main>
       <footer>
        <Footer/> 
        </footer> 
    </>
  )
}

export default page