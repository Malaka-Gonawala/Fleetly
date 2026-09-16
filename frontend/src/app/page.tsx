import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { SearchWidget } from "@/components/SearchWidget";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Car, ShieldCheck, Map, CalendarCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="absolute inset-0 z-0">
          <ImagePlaceholder label="Luxury Car Hero Background" aspectRatio="auto" className="w-full h-full object-cover rounded-none border-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/60 to-transparent"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-24 md:pt-48 md:pb-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#F5F5F2] mb-6 tracking-tight max-w-4xl">
            Experience Lombardy with <span className="text-[#D4A94A]">Premium</span> Driving
          </h1>
          <p className="text-lg md:text-xl text-[#9A9FA6] mb-10 max-w-2xl">
            Choose from our exclusive fleet of luxury sedans, sports cars, and premium SUVs. Based in Milan, proudly serving the entire Lombardy region. Your next extraordinary journey starts here.
          </p>
        </div>
      </section>

      {/* Search Widget */}
      <section className="relative w-full z-20">
        <div className="container mx-auto px-4">
          <SearchWidget />
        </div>
      </section>

      {/* Stat Counters */}
      <section className="py-16 md:py-24 bg-[#0B0D10]">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
          <AnimatedCounter value={150} label="Premium Vehicles" suffix="+" />
          <AnimatedCounter value={1} label="Rental House in Milan" suffix="" />
          <AnimatedCounter value={10} label="Years in Lombardy" suffix="+" />
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 md:py-24 bg-[#15181D]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F2] mb-4">How It Works</h2>
            <p className="text-[#9A9FA6] max-w-2xl mx-auto">Booking your dream car is easy. Follow these simple steps and collect your car directly from our local rental house in Milan.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-[#0B0D10] border border-[#262B33] flex items-center justify-center mb-6 text-[#D4A94A]">
                <Car size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#F5F5F2] mb-3">1. Select Vehicle</h3>
              <p className="text-[#9A9FA6]">Browse our premium fleet and pick the perfect car for your journey through Italy.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-[#0B0D10] border border-[#262B33] flex items-center justify-center mb-6 text-[#D4A94A]">
                <CalendarCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#F5F5F2] mb-3">2. Book Securely</h3>
              <p className="text-[#9A9FA6]">Confirm your booking details securely. Popular cars have a waitlist, so book early!</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-[#0B0D10] border border-[#262B33] flex items-center justify-center mb-6 text-[#D4A94A]">
                <Map size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#F5F5F2] mb-3">3. Pick Up & Drive</h3>
              <p className="text-[#9A9FA6]">Come to our Milan rental house, collect your keys, and get ready for an unforgettable ride.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-[#0B0D10]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F2] mb-4">Why Choose Fleetly</h2>
            <p className="text-[#9A9FA6] max-w-2xl mx-auto">We provide more than just a car. We deliver a seamless luxury experience from start to finish.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#15181D] p-8 rounded-2xl border border-[#262B33]">
              <ShieldCheck className="text-[#D4A94A] w-12 h-12 mb-6" />
              <h3 className="text-xl font-bold text-[#F5F5F2] mb-3">Guaranteed Safety</h3>
              <p className="text-[#9A9FA6]">Every vehicle undergoes a rigorous 150-point inspection before it reaches you.</p>
            </div>
            <div className="bg-[#15181D] p-8 rounded-2xl border border-[#262B33]">
              <CalendarCheck className="text-[#D4A94A] w-12 h-12 mb-6" />
              <h3 className="text-xl font-bold text-[#F5F5F2] mb-3">Flexible Booking</h3>
              <p className="text-[#9A9FA6]">Change your dates, cancel within 24 hours, or extend your trip with just a few clicks.</p>
            </div>
            <div className="bg-[#15181D] p-8 rounded-2xl border border-[#262B33]">
              <Car className="text-[#D4A94A] w-12 h-12 mb-6" />
              <h3 className="text-xl font-bold text-[#F5F5F2] mb-3">Premium Fleet</h3>
              <p className="text-[#9A9FA6]">Only the newest models from top-tier luxury brands like Mercedes, Porsche, and Range Rover.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-16 md:py-24 bg-[#0B0D10]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F2] mb-4">Featured Vehicles</h2>
              <p className="text-[#9A9FA6] max-w-xl">Discover our most popular models, handpicked for exceptional performance and comfort.</p>
            </div>
            <Link href="/vehicles" className="group flex items-center gap-2 text-[#D4A94A] font-medium hover:text-[#E8C066] transition-colors">
              View full fleet <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Featured Car Card 1 */}
            <div className="group bg-[#15181D] border border-[#262B33] rounded-2xl overflow-hidden hover:border-[#D4A94A]/50 transition-all duration-300">
              <div className="relative">
                <ImagePlaceholder label="Porsche 911" aspectRatio="4/3" className="border-0 rounded-none bg-[#0B0D10] group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-[#4ADE80]/10 text-[#4ADE80] px-3 py-1 rounded-full text-xs font-medium border border-[#4ADE80]/20">Available</div>
              </div>
              <div className="p-6">
                <div className="text-sm text-[#9A9FA6] mb-1">Sports Car</div>
                <h3 className="text-xl font-bold text-[#F5F5F2] mb-4">Porsche 911 Carrera</h3>
                <div className="flex items-center justify-between border-t border-[#262B33] pt-4">
                  <div className="text-[#F5F5F2]"><span className="text-xl font-bold">$350</span><span className="text-sm text-[#9A9FA6]">/day</span></div>
                  <button className="text-[#0B0D10] bg-[#D4A94A] hover:bg-[#E8C066] px-4 py-2 rounded-lg text-sm font-semibold transition-colors">Book Now</button>
                </div>
              </div>
            </div>

            {/* Featured Car Card 2 */}
            <div className="group bg-[#15181D] border border-[#262B33] rounded-2xl overflow-hidden hover:border-[#D4A94A]/50 transition-all duration-300">
              <div className="relative">
                <ImagePlaceholder label="Mercedes S-Class" aspectRatio="4/3" className="border-0 rounded-none bg-[#0B0D10] group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-[#4ADE80]/10 text-[#4ADE80] px-3 py-1 rounded-full text-xs font-medium border border-[#4ADE80]/20">Available</div>
              </div>
              <div className="p-6">
                <div className="text-sm text-[#9A9FA6] mb-1">Luxury Sedan</div>
                <h3 className="text-xl font-bold text-[#F5F5F2] mb-4">Mercedes-Benz S-Class</h3>
                <div className="flex items-center justify-between border-t border-[#262B33] pt-4">
                  <div className="text-[#F5F5F2]"><span className="text-xl font-bold">$280</span><span className="text-sm text-[#9A9FA6]">/day</span></div>
                  <button className="text-[#0B0D10] bg-[#D4A94A] hover:bg-[#E8C066] px-4 py-2 rounded-lg text-sm font-semibold transition-colors">Book Now</button>
                </div>
              </div>
            </div>

            {/* Featured Car Card 3 */}
            <div className="group bg-[#15181D] border border-[#262B33] rounded-2xl overflow-hidden hover:border-[#D4A94A]/50 transition-all duration-300">
              <div className="relative">
                <ImagePlaceholder label="Range Rover" aspectRatio="4/3" className="border-0 rounded-none bg-[#0B0D10] group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-[#F2B84B]/10 text-[#F2B84B] px-3 py-1 rounded-full text-xs font-medium border border-[#F2B84B]/20">Limited</div>
              </div>
              <div className="p-6">
                <div className="text-sm text-[#9A9FA6] mb-1">Premium SUV</div>
                <h3 className="text-xl font-bold text-[#F5F5F2] mb-4">Range Rover Vogue</h3>
                <div className="flex items-center justify-between border-t border-[#262B33] pt-4">
                  <div className="text-[#F5F5F2]"><span className="text-xl font-bold">$320</span><span className="text-sm text-[#9A9FA6]">/day</span></div>
                  <button className="text-[#0B0D10] bg-[#D4A94A] hover:bg-[#E8C066] px-4 py-2 rounded-lg text-sm font-semibold transition-colors">Book Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
