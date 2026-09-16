"use client";

import { useState } from "react";
import Link from "next/link";
import { Car } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1); // 1: Info, 2: OTP
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  
  const [otp, setOtp] = useState({ email: "", phone: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    // Simulate API call to send OTPs
    try {
      // We will actually create the user in the backend in Step 2 after "verifying" 
      // or we can create it now and verify later. The backend /signup creates the user and sends OTP.
      const res = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          full_name: `${formData.firstName} ${formData.lastName}`,
          password: formData.password,
          phone: formData.phone,
          role: "renter"
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Signup failed");
      }

      setStep(2);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Simulate OTP verification (backend /verify-otp is incomplete, so we mock it here)
      if (otp.email !== "123456" || otp.phone !== "123456") {
        throw new Error("Invalid OTP. Use 123456 for demo.");
      }
      
      // Success! Redirect to login
      router.push("/login?verified=true");
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
            Create an Account
          </h2>
          <p className="mt-2 text-center text-sm text-[#9A9FA6]">
            {step === 1 ? "Join Fleetly to start your premium journey." : "Verify your contact details."}
          </p>
        </div>
        
        {error && (
          <div className="bg-[#F16A6A]/10 border border-[#F16A6A]/20 text-[#F16A6A] p-3 rounded-xl text-sm text-center">
            {error}
          </div>
        )}

        {step === 1 ? (
          <form className="mt-8 space-y-6" onSubmit={handleInfoSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input 
                    name="firstName" type="text" required 
                    className="appearance-none rounded-xl block w-full px-4 py-3 border border-[#262B33] bg-[#0B0D10] text-[#F5F5F2] placeholder-[#9A9FA6] focus:outline-none focus:ring-2 focus:ring-[#D4A94A] transition-colors" 
                    placeholder="First Name" 
                    value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
                <div>
                  <input 
                    name="lastName" type="text" required 
                    className="appearance-none rounded-xl block w-full px-4 py-3 border border-[#262B33] bg-[#0B0D10] text-[#F5F5F2] placeholder-[#9A9FA6] focus:outline-none focus:ring-2 focus:ring-[#D4A94A] transition-colors" 
                    placeholder="Last Name" 
                    value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
              </div>
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
                  name="phone" type="tel" required 
                  className="appearance-none rounded-xl block w-full px-4 py-3 border border-[#262B33] bg-[#0B0D10] text-[#F5F5F2] placeholder-[#9A9FA6] focus:outline-none focus:ring-2 focus:ring-[#D4A94A] transition-colors" 
                  placeholder="Phone number (e.g., +39...)" 
                  value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
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

            <button 
              type="submit" disabled={loading}
              className="w-full flex justify-center py-3 px-4 text-sm font-bold rounded-xl text-[#0B0D10] bg-[#D4A94A] hover:bg-[#E8C066] transition-colors disabled:opacity-50"
            >
              {loading ? "Processing..." : "Continue"}
            </button>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleOtpSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#9A9FA6] mb-2">Email Verification Code</label>
                <input 
                  type="text" required maxLength={6}
                  className="appearance-none rounded-xl block w-full px-4 py-3 border border-[#262B33] bg-[#0B0D10] text-[#F5F5F2] focus:outline-none focus:ring-2 focus:ring-[#D4A94A] transition-colors text-center tracking-widest text-lg" 
                  placeholder="------" 
                  value={otp.email} onChange={e => setOtp({...otp, email: e.target.value})}
                />
                <p className="text-xs text-[#9A9FA6] mt-1 text-center">Sent to {formData.email}</p>
              </div>
              <div>
                <label className="block text-sm text-[#9A9FA6] mb-2">Phone Verification Code</label>
                <input 
                  type="text" required maxLength={6}
                  className="appearance-none rounded-xl block w-full px-4 py-3 border border-[#262B33] bg-[#0B0D10] text-[#F5F5F2] focus:outline-none focus:ring-2 focus:ring-[#D4A94A] transition-colors text-center tracking-widest text-lg" 
                  placeholder="------" 
                  value={otp.phone} onChange={e => setOtp({...otp, phone: e.target.value})}
                />
                <p className="text-xs text-[#9A9FA6] mt-1 text-center">Sent to {formData.phone}</p>
              </div>
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full flex justify-center py-3 px-4 text-sm font-bold rounded-xl text-[#0B0D10] bg-[#D4A94A] hover:bg-[#E8C066] transition-colors disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify & Sign Up"}
            </button>
            <p className="text-xs text-center text-[#D4A94A] mt-2">Hint: Use 123456 for both</p>
          </form>
        )}
        
        <p className="text-center text-sm text-[#9A9FA6] mt-4">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-[#D4A94A] hover:text-[#E8C066] focus:outline-none focus:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
