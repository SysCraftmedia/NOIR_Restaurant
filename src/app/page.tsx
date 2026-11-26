import Footer from "@/components/ui/Footer";
import NoirVideoSection from "@/components/ui/LandingPage/LandingPageNoirVideoSection";
import HeroSection1 from "@/components/ui/LandingPage/LandingPageNoirVideoSection";
import CulinaryMasterpiece from "@/components/ui/LandingPage/LandingPageCulinaryMasterpiece";
import SignatureDishes from "@/components/ui/LandingPage/LandingPageFeaturesSignatureDishes";
import CraftedWithPassion from "@/components/ui/LandingPage/LandingPageCraftedWithPassion";
import Navbar from "@/components/ui/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <NoirVideoSection />
        <CulinaryMasterpiece />


        <div className="w-full py-10 bg-[#171514]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full h-[1.5px] bg-[#D4C4B0]/10" />
          </div>
        </div>

        <SignatureDishes />
          <div className="w-full py-10 bg-[#171514]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full h-[1.5px] bg-[#D4C4B0]/10" />
          </div>
        </div>
        <CraftedWithPassion/>
      </main>
      <Footer/>
    </>
  );
}