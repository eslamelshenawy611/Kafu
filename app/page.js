import HeroSection from "@/components/Layout/HeroSection";
import Header from "@/components/Layout/Header";
import Service from "@/components/Layout/Service";
import AboutAus from "@/components/Layout/AboutAus";
import TestimonialsSection from "@/components/Layout/TestimonialsSection";
import Brands from "@/components/Layout/Brands";
import Footer from "@/components/Layout/Footer";
import Porfolio from "@/components/Layout/Portfolio";
export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <Service />
      <AboutAus />
      <Porfolio />
      <TestimonialsSection />
      {/* <Brands /> */}
      <Footer />
      {/* باقي الأقسام */}
    </main>
  );
}
