import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { ArrowLeft, CheckCircle2, ChevronRight, Gauge, Settings, Users, Zap } from "lucide-react";
import Link from "next/link";

export default async function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Await the params object
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  // In a real app, we'd fetch data based on `id`
  
  return (
    <div className="bg-[#0B0D10] min-h-screen pb-20">
      {/* Breadcrumb & Navigation */}
      <div className="container mx-auto px-4 py-6 flex items-center gap-4 text-sm text-[#9A9FA6]">
        <Link href="/vehicles" className="flex items-center gap-1 hover:text-[#D4A94A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4A94A] rounded">
          <ArrowLeft size={16} /> Back to Fleet
        </Link>
        <span>|</span>
        <span className="flex items-center gap-1 text-[#F5F5F2]">
          Vehicles <ChevronRight size={14} /> Porsche <ChevronRight size={14} /> 911 Carrera
        </span>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content & Gallery */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-[#262B33]">
              <ImagePlaceholder label="Main Vehicle Image" aspectRatio="16/9" className="w-full bg-[#15181D]" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl overflow-hidden border border-[#262B33] cursor-pointer hover:border-[#D4A94A] transition-colors">
                <ImagePlaceholder label="Interior" aspectRatio="4/3" className="w-full" />
              </div>
              <div className="rounded-xl overflow-hidden border border-[#262B33] cursor-pointer hover:border-[#D4A94A] transition-colors">
                <ImagePlaceholder label="Side Profile" aspectRatio="4/3" className="w-full" />
              </div>
              <div className="rounded-xl overflow-hidden border border-[#262B33] cursor-pointer hover:border-[#D4A94A] transition-colors">
                <ImagePlaceholder label="Rear View" aspectRatio="4/3" className="w-full" />
              </div>
            </div>

            {/* Specs Overview */}
            <div className="bg-[#15181D] border border-[#262B33] rounded-2xl p-6 md:p-8 mt-8">
              <h2 className="text-2xl font-bold text-[#F5F5F2] mb-6">Technical Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col gap-2">
                  <Gauge className="text-[#D4A94A]" size={24} />
                  <span className="text-[#9A9FA6] text-sm">Top Speed</span>
                  <span className="text-[#F5F5F2] font-semibold">182 mph</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Zap className="text-[#D4A94A]" size={24} />
                  <span className="text-[#9A9FA6] text-sm">0-60 mph</span>
                  <span className="text-[#F5F5F2] font-semibold">4.0 sec</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Settings className="text-[#D4A94A]" size={24} />
                  <span className="text-[#9A9FA6] text-sm">Transmission</span>
                  <span className="text-[#F5F5F2] font-semibold">8-Speed Auto</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Users className="text-[#D4A94A]" size={24} />
                  <span className="text-[#9A9FA6] text-sm">Seats</span>
                  <span className="text-[#F5F5F2] font-semibold">2 Seats</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-[#15181D] border border-[#262B33] rounded-2xl p-6 md:p-8 mt-6">
              <h2 className="text-2xl font-bold text-[#F5F5F2] mb-6">Premium Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["Apple CarPlay & Android Auto", "Bose Surround Sound System", "Heated & Ventilated Seats", "Adaptive Cruise Control", "Lane Keeping Assist", "Panoramic Roof"].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#9A9FA6]">
                    <CheckCircle2 size={18} className="text-[#4ADE80]" /> {feat}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar Info & Booking CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-[#15181D] border border-[#262B33] rounded-2xl p-6 md:p-8">
              <div className="text-[#D4A94A] text-sm font-semibold tracking-wider uppercase mb-2">Porsche</div>
              <h1 className="text-3xl font-bold text-[#F5F5F2] mb-2">911 Carrera</h1>
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-[#0B0D10] border border-[#262B33] text-[#9A9FA6] text-xs px-2 py-1 rounded">Sports Car</span>
                <span className="bg-[#4ADE80]/10 border border-[#4ADE80]/20 text-[#4ADE80] text-xs px-2 py-1 rounded">Available Now</span>
              </div>
              
              <div className="border-t border-b border-[#262B33] py-6 mb-6">
                <div className="text-[#9A9FA6] text-sm mb-1">Daily Rate</div>
                <div className="text-4xl font-extrabold text-[#F5F5F2]">
                  $350 <span className="text-lg font-normal text-[#9A9FA6]">/day</span>
                </div>
                <p className="text-xs text-[#9A9FA6] mt-2">*Excludes taxes and insurance fees.</p>
              </div>

              <div className="flex flex-col gap-4">
                <Link 
                  href={`/vehicles/${id}/book`}
                  className="w-full bg-[#D4A94A] hover:bg-[#E8C066] text-[#0B0D10] text-center font-bold py-4 rounded-xl transition-colors focus:outline-none focus:ring-4 focus:ring-[#D4A94A]/50"
                >
                  Rent Now
                </Link>
                <button className="w-full bg-[#0B0D10] hover:bg-[#262B33] border border-[#262B33] text-[#F5F5F2] text-center font-bold py-4 rounded-xl transition-colors focus:outline-none focus:ring-4 focus:ring-[#D4A94A]/50">
                  Contact Owner
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
