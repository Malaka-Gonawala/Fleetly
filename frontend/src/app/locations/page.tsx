import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { MapPin } from "lucide-react";

export default function LocationsPage() {
  const locations = [
    { city: "Milan (Rental House)", address: "Via Montenapoleone 10, 20121 Milano MI, Italy", available: true },
  ];

  return (
    <div className="bg-[#0B0D10] min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#F5F5F2] mb-4">Our Rental House</h1>
          <p className="text-[#9A9FA6] max-w-2xl mx-auto text-lg">
            All vehicles must be collected from and returned to our exclusive rental house in the heart of Milan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((loc, i) => (
            <div key={i} className="group bg-[#15181D] border border-[#262B33] rounded-2xl overflow-hidden hover:border-[#D4A94A]/50 transition-all duration-300">
              <div className="relative">
                <ImagePlaceholder label={loc.city} aspectRatio="16/9" className="border-0 rounded-none bg-[#0B0D10] group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#F5F5F2] mb-2">{loc.city}</h3>
                <div className="flex items-start gap-2 text-[#9A9FA6] text-sm mb-4">
                  <MapPin size={16} className="text-[#D4A94A] shrink-0 mt-0.5" />
                  <span>{loc.address}</span>
                </div>
                <button className="w-full text-[#0B0D10] bg-[#D4A94A] hover:bg-[#E8C066] px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                  View Vehicles
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
