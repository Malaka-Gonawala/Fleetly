"use client";

import { useState, useEffect } from "react";
import { Check, X } from "lucide-react";

export default function AdminWaitlistPage() {
  const [waitlist, setWaitlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWaitlist = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/internal-xyz123/waitlist");
      const data = await res.json();
      setWaitlist(data);
    } catch (error) {
      console.error("Failed to fetch waitlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWaitlist();
  }, []);

  const handleAction = async (id: string, newStatus: string) => {
    try {
      await fetch(`http://localhost:8000/api/internal-xyz123/override-booking-status?booking_id=${id}&new_status=${newStatus}`, { method: "POST" });
      fetchWaitlist();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-8 text-[#9A9FA6]">Loading...</div>;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#F5F5F2]">Waitlist & Bookings</h1>
        <p className="text-[#9A9FA6]">Manage customer bookings based on first-come, first-served.</p>
      </div>

      <div className="bg-[#15181D] border border-[#262B33] rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#262B33] text-sm text-[#9A9FA6]">
              <th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Requested Pickup</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#262B33]">
            {waitlist.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-[#9A9FA6]">No bookings or waitlist entries.</td>
              </tr>
            ) : (
              waitlist.map((item, idx) => (
                <tr key={item.id} className="hover:bg-[#262B33]/30 transition-colors">
                  <td className="p-4">
                    <div className="text-[#F5F5F2] font-semibold">{item.renter_name}</div>
                    <div className="text-xs text-[#9A9FA6]">{item.renter_email}</div>
                    {item.status === 'pending_payment' && (
                      <span className="inline-block mt-1 bg-[#D4A94A]/10 text-[#D4A94A] px-2 py-0.5 rounded text-[10px] font-bold">
                        Queue Position: #{idx + 1}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-[#F5F5F2] text-sm">{new Date(item.pickup_at).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className="capitalize text-xs font-medium px-2 py-1 rounded bg-[#262B33] text-[#9A9FA6]">
                      {item.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {item.status === 'pending_payment' && (
                      <>
                        <button onClick={() => handleAction(item.id, 'confirmed')} className="text-[#4ADE80] hover:bg-[#4ADE80]/10 p-2 rounded transition-colors" title="Approve & Confirm">
                          <Check size={16} />
                        </button>
                        <button onClick={() => handleAction(item.id, 'cancelled')} className="text-[#F16A6A] hover:bg-[#F16A6A]/10 p-2 rounded transition-colors" title="Cancel/Reject">
                          <X size={16} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
