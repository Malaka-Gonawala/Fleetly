"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    { q: "What is the minimum age to rent a vehicle?", a: "The minimum age requirement is 25 years old for all premium and luxury vehicles. A valid driver's license must be presented." },
    { q: "Do I need special insurance?", a: "We provide comprehensive insurance options. However, you may use your own auto insurance if it covers luxury rentals and meets our minimum liability requirements." },
    { q: "Is there a mileage limit?", a: "Most rentals include 100 miles per day. Additional mileage is charged at a rate specific to the vehicle model. Unlimited mileage packages are available for select vehicles." },
    { q: "What is your cancellation policy?", a: "Cancellations made 48 hours before the reservation start time are fully refundable. Cancellations within 48 hours may incur a one-day rental fee." },
    { q: "Do you offer delivery and pickup?", a: "No, we are a local business based in Lombardy. All renters must personally come to our rental house in Milan to collect and return the vehicle." },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="bg-[#0B0D10] min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#F5F5F2] mb-4">Frequently Asked Questions</h1>
          <p className="text-[#9A9FA6] text-lg">
            Find answers to common questions about our rental process, requirements, and policies.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-[#15181D] border border-[#262B33] rounded-2xl overflow-hidden">
              <button 
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none focus:bg-[#262B33]/30 hover:bg-[#262B33]/30 transition-colors"
              >
                <span className="font-semibold text-[#F5F5F2]">{faq.q}</span>
                {openIdx === i ? <ChevronUp size={20} className="text-[#D4A94A]" /> : <ChevronDown size={20} className="text-[#9A9FA6]" />}
              </button>
              {openIdx === i && (
                <div className="px-6 pb-5 pt-2 text-[#9A9FA6] leading-relaxed border-t border-[#262B33]/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
