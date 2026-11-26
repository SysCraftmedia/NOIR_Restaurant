'use client'
import Footer from '@/components/ui/Footer'
import Navbar from '@/components/ui/Navbar'
import OurStoryHero from '@/components/ui/ourStory/OurStoryImageSection'
import TheBeginning from '@/components/ui/ourStory/TheBeginningOurStory'
import OurPhilosophy from '@/components/ui/ourStory/OurPhilosophy'
import OurValues from '@/components/ui/ourStory/OurValuesFeatureIcons'
import React from 'react'

const page = () => {
  return (
    <>
     <header>
      <Navbar/>
     </header>
     <main>
       <OurStoryHero/>
       <TheBeginning/>
        <div className="w-full py-10 bg-[#171514]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full h-[1.5px] bg-[#D4C4B0]/10" />
          </div>
        </div>
        <OurPhilosophy/>
          <div className="w-full py-10 bg-[#171514]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full h-[1.5px] bg-[#D4C4B0]/10" />
          </div>
        </div>
        <OurValues/>
     </main>
     <footer>
        <Footer/>
     </footer>
    </>
  )
}

export default page