"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    brand: "",
    model_name: "",
    category: "sedan",
    transmission: "automatic",
    fuel_type: "petrol",
    seats: 4,
    price_per_day: 100,
    deposit_amount: 500,
  });

  const fetchVehicles = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/vehicles/");
      const data = await res.json();
      setVehicles(data);
    } catch (error) {
      console.error("Failed to fetch vehicles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:8000/api/vehicles/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setShowModal(false);
      fetchVehicles();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`http://localhost:8000/api/vehicles/${id}`, { method: "DELETE" });
      fetchVehicles();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-8 text-[#9A9FA6]">Loading...</div>;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#F5F5F2]">Manage Vehicles</h1>
          <p className="text-[#9A9FA6]">Add, edit, or remove vehicles from your Lombardy fleet.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#D4A94A] hover:bg-[#E8C066] text-[#0B0D10] font-bold px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={18} /> Add Vehicle
        </button>
      </div>

      <div className="bg-[#15181D] border border-[#262B33] rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#262B33] text-sm text-[#9A9FA6]">
              <th className="p-4 font-medium">Vehicle</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Price/Day</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#262B33]">
            {vehicles.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-[#9A9FA6]">No vehicles found. Add one to get started!</td>
              </tr>
            ) : (
              vehicles.map(v => (
                <tr key={v.id} className="hover:bg-[#262B33]/30 transition-colors">
                  <td className="p-4 flex items-center gap-4">
                    <div className="w-16 h-12 rounded overflow-hidden">
                      <ImagePlaceholder label="Car" className="w-full h-full text-[8px]" />
                    </div>
                    <div>
                      <div className="text-[#F5F5F2] font-semibold">{v.brand} {v.model_name}</div>
                      <div className="text-xs text-[#9A9FA6]">{v.transmission} • {v.seats} Seats</div>
                    </div>
                  </td>
                  <td className="p-4 text-[#F5F5F2] capitalize">{v.category}</td>
                  <td className="p-4 text-[#F5F5F2]">${v.price_per_day}</td>
                  <td className="p-4 text-right space-x-2">
                    <button className="text-[#9A9FA6] hover:text-[#D4A94A] p-2 rounded"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(v.id)} className="text-[#9A9FA6] hover:text-[#F16A6A] p-2 rounded"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-[#0B0D10]/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#15181D] border border-[#262B33] rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#F5F5F2]">Add New Vehicle</h2>
              <button onClick={() => setShowModal(false)} className="text-[#9A9FA6] hover:text-[#F5F5F2]">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#9A9FA6] mb-1">Brand</label>
                  <input required value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} className="w-full bg-[#0B0D10] border border-[#262B33] rounded-lg p-2 text-[#F5F5F2]" />
                </div>
                <div>
                  <label className="block text-sm text-[#9A9FA6] mb-1">Model Name</label>
                  <input required value={formData.model_name} onChange={e => setFormData({...formData, model_name: e.target.value})} className="w-full bg-[#0B0D10] border border-[#262B33] rounded-lg p-2 text-[#F5F5F2]" />
                </div>
                <div>
                  <label className="block text-sm text-[#9A9FA6] mb-1">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-[#0B0D10] border border-[#262B33] rounded-lg p-2 text-[#F5F5F2]">
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="coupe">Coupe</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-[#9A9FA6] mb-1">Price per Day ($)</label>
                  <input type="number" required value={formData.price_per_day} onChange={e => setFormData({...formData, price_per_day: Number(e.target.value)})} className="w-full bg-[#0B0D10] border border-[#262B33] rounded-lg p-2 text-[#F5F5F2]" />
                </div>
              </div>
              <button type="submit" className="w-full bg-[#D4A94A] text-[#0B0D10] font-bold py-3 rounded-xl mt-6">Create Vehicle</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
