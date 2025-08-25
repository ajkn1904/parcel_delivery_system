import CallToAction from "@/components/modules/homepage/CallToAction";
import HeroSection from "@/components/modules/homepage/HeroSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection/>
      <CallToAction heading = "Call to Action" description = "Deliver faster with our service of parcel delivery system. Speed up your business and ship products in record time." />
    </div>
  );
}