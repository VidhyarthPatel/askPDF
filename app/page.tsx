import HeroSection from "@/components/heading";
import Navbar from "@/components/navbar";
import Belt from "@/components/belt";
import OtherStuff from "@/components/otherStuff";
import Pricing from "@/components/pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/footer";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="text-black">
      <Navbar />
      <HeroSection isLoggedIn={!!session} />
      <Belt />
      <OtherStuff />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}