import NoirExperience from '@/components/ui/experience/ExperienceImageSection'
import OurDiningSpaces from '@/components/ui/experience/ExperienceOurDiningSpace'
import SpecialOccasions from '@/components/ui/experience/ExperienceSpecialOccasions'
import ExperienceCta from '@/components/ui/experience/ExperienceCta'
import Footer from '@/components/ui/Footer'
import Navbar from '@/components/ui/Navbar'
import React from 'react'

const page = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <NoirExperience />
        <OurDiningSpaces />
        <div className="w-full py-10 bg-[#171514]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full h-[1.5px] bg-[#D4C4B0]/10" />
          </div>
        </div>
        <SpecialOccasions />
        <ExperienceCta/>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default page