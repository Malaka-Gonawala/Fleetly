import { Tag, Clock } from "lucide-react";

export default function OffersPage() {
  const offers = [
    { title: "Weekend Getaway", desc: "Get 20% off on all premium SUVs when you book for the weekend.", valid: "Valid until Nov 30" },
    { title: "First Time Renter", desc: "Enjoy 15% off your first luxury sedan rental with code WELCOME15.", valid: "No expiration" },
    { title: "Long Term Lease", desc: "Special monthly rates available for sports cars and luxury sedans.", valid: "Contact for details" },
  ];

  return (
    <div className="bg-[#0B0D10] min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#F5F5F2] mb-4">Special Offers</h1>
          <p className="text-[#9A9FA6] max-w-2xl mx-auto text-lg">
            Take advantage of our exclusive deals and make your premium driving experience even more rewarding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer, i) => (
            <div key={i} className="bg-[#15181D] border border-[#262B33] rounded-2xl p-8 flex flex-col hover:border-[#D4A94A]/50 transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#D4A94A]/10 flex items-center justify-center text-[#D4A94A] mb-6">
                <Tag size={24} />
              </div>
              <h3 className="text-2xl font-bold text-[#F5F5F2] mb-3">{offer.title}</h3>
              <p className="text-[#9A9FA6] mb-6 flex-1">{offer.desc}</p>
              <div className="flex items-center gap-2 text-sm text-[#F5F5F2] border-t border-[#262B33] pt-4">
                <Clock size={16} className="text-[#9A9FA6]" />
                {offer.valid}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
