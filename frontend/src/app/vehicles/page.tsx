"use client";

import { useState, useEffect } from "react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Filter, ChevronDown, Check } from "lucide-react";
import Link from "next/link";

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/vehicles/")
      .then(res => res.json())
      .then(data => setVehicles(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#0B0D10] min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 lg:w-72 shrink-0">
            <div className="bg-[#15181D] border border-[#262B33] rounded-2xl p-6 sticky top-24">
              <div className="flex items-center gap-2 text-[#F5F5F2] font-bold text-lg mb-6 pb-4 border-b border-[#262B33]">
                <Filter size={20} />
                Filters
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-[#F5F5F2] font-medium mb-3 flex items-center justify-between">
                  Category <ChevronDown size={16} className="text-[#9A9FA6]" />
                </h3>
                <div className="space-y-2">
                  {["sedan", "suv", "coupe"].map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 rounded border border-[#262B33] bg-[#0B0D10] group-hover:border-[#D4A94A] flex items-center justify-center transition-colors"></div>
                      <span className="text-[#9A9FA6] group-hover:text-[#F5F5F2] text-sm transition-colors capitalize">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Vehicle Grid */}
          <main className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-[#F5F5F2] mb-2">Our Fleet in Lombardy</h1>
                <p className="text-[#9A9FA6]">{loading ? "Loading..." : `Showing ${vehicles.length} premium vehicles`}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {vehicles.map((car) => (
                <div key={car.id} className="group bg-[#15181D] border border-[#262B33] rounded-2xl overflow-hidden hover:border-[#D4A94A]/50 hover:-translate-y-1 transition-all duration-300 shadow-lg flex flex-col">
                  <div className="relative overflow-hidden shrink-0">
                    <ImagePlaceholder label={car.model_name} aspectRatio="4/3" className="border-0 rounded-none bg-[#0B0D10] group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="text-xs font-semibold text-[#D4A94A] mb-1 uppercase tracking-wider">{car.brand}</div>
                    <h3 className="text-lg font-bold text-[#F5F5F2] mb-3 truncate">{car.model_name}</h3>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-[#9A9FA6] mt-auto">
                      <div className="flex items-center gap-1 bg-[#0B0D10] p-2 rounded border border-[#262B33]">
                        <span className="opacity-70">Type:</span> <span className="capitalize">{car.category}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-[#0B0D10] p-2 rounded border border-[#262B33]">
                        <span className="opacity-70">Trans:</span> <span className="capitalize">{car.transmission}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-[#262B33] pt-4 mt-2">
                      <div className="text-[#F5F5F2]"><span className="text-xl font-bold">${car.price_per_day}</span><span className="text-sm text-[#9A9FA6]">/day</span></div>
                      <Link 
                        href={`/vehicles/${car.id}`}
                        className="bg-[#D4A94A] hover:bg-[#E8C066] text-[#0B0D10] px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                      >
                        Join Waitlist
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {!loading && vehicles.length === 0 && (
              <div className="text-center py-20 bg-[#15181D] border border-[#262B33] rounded-2xl">
                <h3 className="text-xl text-[#F5F5F2] mb-2">No vehicles currently available</h3>
                <p className="text-[#9A9FA6]">Please check back later or contact us for special requests.</p>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}
