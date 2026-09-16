"use client";

import { useState, useEffect } from "react";
import { User, History, CreditCard, LogOut } from "lucide-react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"info" | "history">("info");
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/bookings/my-bookings")
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) setBookings(data);
      })
      .catch(console.error);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/api/auth/logout", { method: "POST" });
      router.push("/");
    } catch (err) {}
  };

  return (
    <div className="bg-[#0B0D10] min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-bold text-[#F5F5F2] mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-2">
            <button 
              onClick={() => setActiveTab("info")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4A94A] ${activeTab === "info" ? "bg-[#D4A94A] text-[#0B0D10]" : "text-[#9A9FA6] hover:bg-[#15181D] hover:text-[#F5F5F2]"}`}
            >
              <User size={18} /> Personal Info
            </button>
            <button 
              onClick={() => setActiveTab("history")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4A94A] ${activeTab === "history" ? "bg-[#D4A94A] text-[#0B0D10]" : "text-[#9A9FA6] hover:bg-[#15181D] hover:text-[#F5F5F2]"}`}
            >
              <History size={18} /> Rental History & Waitlist
            </button>
            <div className="pt-4 mt-4 border-t border-[#262B33]">
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#F16A6A] hover:bg-[#F16A6A]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#F16A6A]">
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {activeTab === "info" && (
              <div className="bg-[#15181D] border border-[#262B33] rounded-2xl p-6 md:p-8">
                <h2 className="text-xl font-bold text-[#F5F5F2] mb-6">Personal Information</h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#9A9FA6] mb-2">First Name</label>
                      <input type="text" defaultValue="John" className="w-full bg-[#0B0D10] border border-[#262B33] rounded-xl p-3 text-[#F5F5F2] focus:outline-none focus:border-[#D4A94A] focus:ring-1 focus:ring-[#D4A94A] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#9A9FA6] mb-2">Last Name</label>
                      <input type="text" defaultValue="Doe" className="w-full bg-[#0B0D10] border border-[#262B33] rounded-xl p-3 text-[#F5F5F2] focus:outline-none focus:border-[#D4A94A] focus:ring-1 focus:ring-[#D4A94A] transition-colors" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[#9A9FA6] mb-2">Email Address</label>
                      <input type="email" defaultValue="john.doe@example.com" className="w-full bg-[#0B0D10] border border-[#262B33] rounded-xl p-3 text-[#F5F5F2] focus:outline-none focus:border-[#D4A94A] focus:ring-1 focus:ring-[#D4A94A] transition-colors" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-[#9A9FA6] mb-2">Phone Number</label>
                      <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full bg-[#0B0D10] border border-[#262B33] rounded-xl p-3 text-[#F5F5F2] focus:outline-none focus:border-[#D4A94A] focus:ring-1 focus:ring-[#D4A94A] transition-colors" />
                    </div>
                  </div>
                  <div className="flex justify-end pt-4 border-t border-[#262B33]">
                    <button type="submit" className="bg-[#D4A94A] hover:bg-[#E8C066] text-[#0B0D10] font-bold py-3 px-6 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#15181D] focus:ring-[#D4A94A]">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "history" && (
              <div className="space-y-6">
                {/* Total Spend Card */}
                <div className="bg-[#15181D] border border-[#262B33] rounded-2xl p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-[#9A9FA6] text-sm font-medium mb-1">Total Lifetime Spend</h3>
                    <div className="text-3xl font-bold text-[#F5F5F2]">
                      ${bookings.reduce((sum, b) => sum + (b.total_price || 0), 0).toFixed(2)}
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-[#0B0D10] border border-[#262B33] rounded-full flex items-center justify-center text-[#D4A94A]">
                    <CreditCard size={24} />
                  </div>
                </div>

                {/* History List */}
                <div className="bg-[#15181D] border border-[#262B33] rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-[#262B33]">
                    <h2 className="text-xl font-bold text-[#F5F5F2]">Past Rentals & Waitlists</h2>
                  </div>
                  <div className="divide-y divide-[#262B33]">
                    {bookings.length === 0 ? (
                      <div className="p-8 text-center text-[#9A9FA6]">No history found. Book a vehicle to see it here!</div>
                    ) : (
                      bookings.map((rental, i) => (
                        <div key={i} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-20 h-16 shrink-0 rounded-lg overflow-hidden border border-[#262B33]">
                              <ImagePlaceholder label="Car" aspectRatio="auto" className="w-full h-full text-[10px]" />
                            </div>
                            <div>
                              <h4 className="text-[#F5F5F2] font-semibold">Booking #{rental.id.substring(0, 8)}</h4>
                              <p className="text-[#9A9FA6] text-sm">{new Date(rental.pickup_at).toLocaleDateString()}</p>
                              {rental.status === 'pending_payment' && (
                                <p className="text-[#D4A94A] text-xs font-bold mt-1">Waitlist Position: Queue</p>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col sm:items-end">
                            <span className="text-[#F5F5F2] font-bold">${rental.total_price}</span>
                            <span className={`text-xs font-medium px-2 py-1 rounded mt-1 ${rental.status === 'confirmed' ? 'bg-[#4ADE80]/10 text-[#4ADE80]' : rental.status === 'cancelled' ? 'bg-[#F16A6A]/10 text-[#F16A6A]' : 'bg-[#D4A94A]/10 text-[#D4A94A]'}`}>
                              {rental.status.replace("_", " ")}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
