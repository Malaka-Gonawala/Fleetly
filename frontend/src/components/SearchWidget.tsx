"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Calendar, Clock, ChevronDown } from "lucide-react";

export function SearchWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto relative z-10 -mt-16 md:-mt-24 px-4">
      <div className="bg-[#15181D] border border-[#262B33] rounded-2xl p-4 md:p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row items-stretch gap-4">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              className="flex items-center gap-3 bg-[#0B0D10] border border-[#262B33] p-3 md:p-4 rounded-xl cursor-pointer hover:border-[#D4A94A] transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              <MapPin className="text-[#D4A94A]" size={24} />
              <div className="flex flex-col flex-1">
                <span className="text-xs text-[#9A9FA6]">Pick-up Location</span>
                <span className="text-sm font-medium text-[#F5F5F2]">Dubai International Airport</span>
              </div>
              <ChevronDown className="text-[#9A9FA6]" size={16} />
            </div>
            
            <div 
              className="flex items-center gap-3 bg-[#0B0D10] border border-[#262B33] p-3 md:p-4 rounded-xl cursor-pointer hover:border-[#D4A94A] transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Calendar className="text-[#D4A94A]" size={24} />
              <div className="flex flex-col flex-1">
                <span className="text-xs text-[#9A9FA6]">Pick-up Date</span>
                <span className="text-sm font-medium text-[#F5F5F2]">Today, 10:00 AM</span>
              </div>
              <ChevronDown className="text-[#9A9FA6]" size={16} />
            </div>
          </div>
          <button className="w-full md:w-auto bg-[#D4A94A] hover:bg-[#E8C066] text-[#0B0D10] font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-colors">
            <Search size={20} />
            <span>Search</span>
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t border-[#262B33] grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#9A9FA6] mb-2">Drop-off Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9FA6]" size={18} />
                    <input type="text" placeholder="Same as pick-up" className="w-full bg-[#0B0D10] border border-[#262B33] rounded-xl p-3 pl-10 text-[#F5F5F2] focus:outline-none focus:border-[#D4A94A] transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#9A9FA6] mb-2">Drop-off Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9FA6]" size={18} />
                    <input type="date" className="w-full bg-[#0B0D10] border border-[#262B33] rounded-xl p-3 pl-10 text-[#F5F5F2] focus:outline-none focus:border-[#D4A94A] transition-colors [color-scheme:dark]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#9A9FA6] mb-2">Vehicle Type (Optional)</label>
                  <select className="w-full bg-[#0B0D10] border border-[#262B33] rounded-xl p-3 text-[#F5F5F2] focus:outline-none focus:border-[#D4A94A] transition-colors appearance-none">
                    <option>All Types</option>
                    <option>Luxury Sedan</option>
                    <option>Sports Car</option>
                    <option>SUV</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
