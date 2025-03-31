import ContactUs from "@/components/ContactUs";
import HeroSection from "@/components/HeroSection";
import SpecialityMenu from "@/components/SpecialityMenu";
import TopDoctors from "@/components/TopDoctors";

export default async function Home() {
  
  return (
    <div className="">
      <HeroSection />
      <SpecialityMenu />
      <TopDoctors />
      <ContactUs />
    </div>
  );
}
