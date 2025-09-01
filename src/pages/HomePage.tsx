import CallToAction from "@/components/modules/homepage/CallToAction"; 
import HeroSection from "@/components/modules/homepage/HeroSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />

      <section className="py-20 text-center bg-blue-50 dark:bg-black">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-500 dark:text-orange-400">
          Welcome to Our Parcel Delivery Service
        </h2>
        <p className="mt-6 px-4 max-w-2xl mx-auto text-muted-foreground text-lg">
          We make sending and receiving parcels faster, safer, and more 
          affordable. Whether you’re a small business, an online shop, or an 
          individual, our delivery system is designed to give you a seamless 
          shipping experience with real-time tracking and reliable support.
        </p>
      </section>

      <CallToAction 
        heading="Call to Action" 
        description="Deliver faster with our parcel delivery system. Speed up your business and ship products in record time." 
      />
    </div>
  );
}
