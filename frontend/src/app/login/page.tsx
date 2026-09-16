"use client";

import { useState } from "react";
import Link from "next/link";
import { Car, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [captchaSolved, setCaptchaSolved] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!captchaSolved) {
      setError("Please solve the CAPTCHA first.");
      return;
    }

    setLoading(true);

    try {
      // Create x-www-form-urlencoded body for OAuth2PasswordRequestForm
      const body = new URLSearchParams();
      body.append("username", formData.email);
      body.append("password", formData.password);

      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Login failed");
      }

      // Success! In a real app, cookie is set HTTPOnly, or token is returned.
      // Redirect to profile
      router.push("/profile");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#0B0D10] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-[#15181D] p-8 md:p-10 rounded-2xl border border-[#262B33] shadow-2xl">
        <div className="flex flex-col items-center">
          <Link href="/" className="flex items-center gap-2 text-[#D4A94A] font-bold text-2xl mb-6 focus:outline-none focus:ring-2 focus:ring-[#D4A94A] rounded p-1">
            <Car className="w-8 h-8" />
            <span>Fleetly</span>
          </Link>
          <h2 className="text-center text-3xl font-extrabold text-[#F5F5F2]">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-[#9A9FA6]">
            Sign in to manage your bookings and waitlists.
          </p>
        </div>
        
        {error && (
          <div className="bg-[#F16A6A]/10 border border-[#F16A6A]/20 text-[#F16A6A] p-3 rounded-xl text-sm text-center">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input 
                name="email" type="email" required 
                className="appearance-none rounded-xl block w-full px-4 py-3 border border-[#262B33] bg-[#0B0D10] text-[#F5F5F2] placeholder-[#9A9FA6] focus:outline-none focus:ring-2 focus:ring-[#D4A94A] transition-colors" 
                placeholder="Email address" 
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <input 
                name="password" type="password" required 
                className="appearance-none rounded-xl block w-full px-4 py-3 border border-[#262B33] bg-[#0B0D10] text-[#F5F5F2] placeholder-[#9A9FA6] focus:outline-none focus:ring-2 focus:ring-[#D4A94A] transition-colors" 
                placeholder="Password" 
                value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input 
                id="remember-me" type="checkbox" 
                className="h-4 w-4 text-[#D4A94A] focus:ring-[#D4A94A] border-[#262B33] rounded bg-[#0B0D10] cursor-pointer" 
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-[#9A9FA6] cursor-pointer">
                Remember me
              </label>
            </div>
          </div>

          {/* CAPTCHA Simulation */}
          <div className="w-full bg-[#0B0D10] border border-[#262B33] rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                id="captcha" 
                checked={captchaSolved} 
                onChange={(e) => setCaptchaSolved(e.target.checked)}
                className="w-5 h-5 cursor-pointer accent-[#D4A94A]" 
              />
              <label htmlFor="captcha" className="text-sm text-[#F5F5F2] cursor-pointer font-medium">
                I am human
              </label>
            </div>
            {captchaSolved && <CheckCircle2 size={20} className="text-[#4ADE80]" />}
          </div>

          <div>
            <button 
              type="submit" disabled={loading}
              className="w-full flex justify-center py-3 px-4 text-sm font-bold rounded-xl text-[#0B0D10] bg-[#D4A94A] hover:bg-[#E8C066] transition-colors disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>
        
        <p className="text-center text-sm text-[#9A9FA6] mt-4">
          Don't have an account?{' '}
          <Link href="/signup" className="font-medium text-[#D4A94A] hover:text-[#E8C066] focus:outline-none focus:underline">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}
