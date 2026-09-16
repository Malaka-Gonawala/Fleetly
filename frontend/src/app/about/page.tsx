import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { ShieldCheck, Target, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-[#0B0D10] min-h-screen">
      {/* Hero */}
      <section className="py-20 border-b border-[#262B33]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#F5F5F2] mb-6">About Fleetly</h1>
          <p className="text-xl text-[#9A9FA6]">
            Redefining luxury car rentals with an uncompromising commitment to quality, service, and the pure joy of driving.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <h2 className="text-3xl font-bold text-[#F5F5F2] mb-4">Our Story</h2>
              <p className="text-[#9A9FA6] mb-4 leading-relaxed">
                Founded in 2024, Fleetly was born out of a simple idea: premium cars deserve premium service. We noticed a gap in the market where renting a luxury vehicle often felt like a standard, uninspired transaction.
              </p>
              <p className="text-[#9A9FA6] leading-relaxed">
                We set out to change that by curating a fleet of the world's most sought-after vehicles and wrapping them in an experience that caters to enthusiasts, executives, and anyone who appreciates automotive excellence.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-[#262B33]">
              <ImagePlaceholder label="Our Fleet Showcase" aspectRatio="4/3" className="w-full bg-[#15181D]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#15181D] border border-[#262B33] rounded-2xl p-8 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#0B0D10] border border-[#262B33] flex items-center justify-center mb-6 text-[#D4A94A]">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#F5F5F2] mb-3">Pristine Quality</h3>
              <p className="text-[#9A9FA6]">Every vehicle in our fleet is meticulously maintained to showroom standards.</p>
            </div>
            <div className="bg-[#15181D] border border-[#262B33] rounded-2xl p-8 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#0B0D10] border border-[#262B33] flex items-center justify-center mb-6 text-[#D4A94A]">
                <Target size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#F5F5F2] mb-3">Customer First</h3>
              <p className="text-[#9A9FA6]">Your experience is our priority. We offer 24/7 concierge support.</p>
            </div>
            <div className="bg-[#15181D] border border-[#262B33] rounded-2xl p-8 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#0B0D10] border border-[#262B33] flex items-center justify-center mb-6 text-[#D4A94A]">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#F5F5F2] mb-3">Exclusive Access</h3>
              <p className="text-[#9A9FA6]">We provide access to rare and highly sought-after vehicle models.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
