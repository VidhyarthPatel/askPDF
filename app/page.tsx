import HeroSection from "@/components/heading";
import Navbar from "@/components/navbar";
import Belt from "@/components/belt";
import OtherStuff from "@/components/otherStuff";
import Pricing from "@/components/pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="text-black">
      <Navbar />
      <HeroSection />
      <Belt />
      <OtherStuff />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}