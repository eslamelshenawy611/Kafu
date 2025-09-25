import HeroSection from "@/components/Layout/HeroSection";
import Header from "@/components/Layout/Header";
import Service from "@/components/Layout/Service";
import AboutAus from "@/components/Layout/AboutAus";
import TestimonialsSection from "@/components/Layout/TestimonialsSection";
import Footer from "@/components/Layout/Footer";
import Porfolio from "@/components/Layout/Portfolio";
import Values from "@/components/Layout/Values";
import SplashScreen from "@/components/Layout/SplashScreen";
export default function Home() {
  return (
    <main>
      <SplashScreen />
      <Header />
        <HeroSection />
        <Service />
      <Values />
      <AboutAus />
      <Porfolio />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
