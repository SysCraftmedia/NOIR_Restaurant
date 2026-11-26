import Footer from '@/components/ui/Footer'
import MenuSection from '@/components/ui/menu/menuFeatureItemSection'
import MenuHero from '@/components/ui/menu/menuImageSection'
import ChefRecommendationSection from '@/components/ui/menu/menuRecomendation'
import Navbar from '@/components/ui/Navbar'
import React from 'react'

const page = () => {
  return (
    <>
    <header>
        <Navbar/>
    </header>
     <main>
       <MenuHero/>
       <MenuSection/>
       <ChefRecommendationSection/>
     </main>
     <footer>
        <Footer/>
     </footer>
    </>
  )
}

export default page