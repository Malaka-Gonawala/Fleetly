"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, UploadCloud, CreditCard, CheckCircle2, ShieldCheck, FileText } from "lucide-react";
import { useParams } from "next/navigation";

export default function BookingPage() {
  const params = useParams();
  const id = params?.id as string || "1";

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSimulatingUpload, setIsSimulatingUpload] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardError, setCardError] = useState("");

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsSimulatingUpload(true);
      setTimeout(() => {
        setIsSimulatingUpload(false);
        setUploadSuccess(true);
      }, 1500);
    }
  };

  const handleNextStep = () => {
    if (step === 1 && uploadSuccess) {
      setStep(2);
    }
  };

  const luhnCheck = (num: string) => {
    let arr = (num + '')
      .split('')
      .reverse()
      .map(x => parseInt(x));
    let lastDigit = arr.splice(0, 1)[0];
    let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0);
    sum += lastDigit;
    return sum % 10 === 0;
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCard = cardNumber.replace(/\D/g, "");
    if (cleanCard.length < 13 || !luhnCheck(cleanCard)) {
      setCardError("Invalid card number. Please check and try again.");
      return;
    }
    setCardError("");

    try {
      // 1. Create booking
      const bookRes = await fetch("http://localhost:8000/api/bookings/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicle_model_id: id,
          pickup_at: new Date().toISOString(),
          dropoff_at: new Date(Date.now() + 86400000).toISOString(),
          pickup_location: "Milan Rental House"
        })
      });
      const bookData = await bookRes.json();
      if (!bookRes.ok) throw new Error(bookData.detail || "Booking failed");

      // 2. Simulate Payment
      const payRes = await fetch(`http://localhost:8000/api/bookings/${bookData.id}/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          card_number: cleanCard,
          expiry, cvc, name: "John Doe"
        })
      });
      if (!payRes.ok) throw new Error("Payment failed");
      
      setStep(3);
    } catch (err: any) {
      setCardError(err.message);
    }
  };

  return (
    <div className="bg-[#0B0D10] min-h-[90vh] py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {step < 3 && (
          <div className="mb-8">
            <Link href={`/vehicles/${id}`} className="inline-flex items-center gap-2 text-[#9A9FA6] hover:text-[#D4A94A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4A94A] rounded p-1">
              <ArrowLeft size={16} /> Back to Vehicle
            </Link>
          </div>
        )}

        {/* Progress Tracker */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-[#262B33] z-0"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#D4A94A] z-0 transition-all duration-500" style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}></div>
          
          {[
            { num: 1, label: "Verification", icon: FileText },
            { num: 2, label: "Payment", icon: CreditCard },
            { num: 3, label: "Waitlist", icon: CheckCircle2 }
          ].map((s) => (
            <div key={s.num} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-colors duration-300 ${
                step >= s.num ? 'bg-[#D4A94A] border-[#D4A94A] text-[#0B0D10]' : 'bg-[#15181D] border-[#262B33] text-[#9A9FA6]'
              }`}>
                <s.icon size={18} />
              </div>
              <span className={`text-xs font-medium absolute -bottom-6 whitespace-nowrap ${step >= s.num ? 'text-[#D4A94A]' : 'text-[#9A9FA6]'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Step 1: License Upload */}
        {step === 1 && (
          <div className="bg-[#15181D] border border-[#262B33] rounded-2xl p-6 md:p-10 shadow-2xl">
            <h2 className="text-2xl font-bold text-[#F5F5F2] mb-2">Driver's License Verification</h2>
            <p className="text-[#9A9FA6] mb-8">Please upload a valid driver's license to continue with your booking.</p>
            
            <div className="border-2 border-dashed border-[#262B33] rounded-xl p-8 flex flex-col items-center justify-center text-center bg-[#0B0D10] relative hover:border-[#D4A94A] transition-colors group">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleSimulateUpload}
                disabled={isSimulatingUpload || uploadSuccess}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                aria-label="Upload Driver's License"
              />
              
              {isSimulatingUpload ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-4 border-[#262B33] border-t-[#D4A94A] rounded-full animate-spin"></div>
                  <span className="text-[#D4A94A] font-medium">Simulating verification...</span>
                </div>
              ) : uploadSuccess ? (
                <div className="flex flex-col items-center gap-3">
                  <ShieldCheck size={48} className="text-[#4ADE80]" />
                  <span className="text-[#4ADE80] font-medium">License Verified Successfully</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 text-[#9A9FA6] group-hover:text-[#F5F5F2] transition-colors">
                  <UploadCloud size={48} />
                  <div>
                    <span className="font-medium text-[#D4A94A]">Click to upload</span> or drag and drop
                    <p className="text-xs mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-end">
              <button 
                onClick={handleNextStep}
                disabled={!uploadSuccess}
                className="bg-[#D4A94A] hover:bg-[#E8C066] disabled:bg-[#262B33] disabled:text-[#9A9FA6] text-[#0B0D10] font-bold py-3 px-8 rounded-xl transition-colors focus:outline-none focus:ring-4 focus:ring-[#D4A94A]/50"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <div className="bg-[#15181D] border border-[#262B33] rounded-2xl p-6 md:p-10 shadow-2xl">
            <h2 className="text-2xl font-bold text-[#F5F5F2] mb-2">Payment Details</h2>
            <p className="text-[#9A9FA6] mb-8">Enter your card details to join the waitlist.</p>
            
            <form onSubmit={handlePayment} className="space-y-6">
              <div>
                <label htmlFor="card-number" className="block text-sm font-medium text-[#9A9FA6] mb-2">Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9FA6]" size={18} />
                  <input 
                    id="card-number"
                    type="text" 
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="0000 0000 0000 0000" 
                    className="w-full bg-[#0B0D10] border border-[#262B33] rounded-xl p-3 pl-10 text-[#F5F5F2] focus:outline-none focus:border-[#D4A94A] focus:ring-1 focus:ring-[#D4A94A] transition-colors"
                    required
                  />
                </div>
                {cardError && <p className="text-[#F16A6A] text-xs mt-2">{cardError}</p>}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium text-[#9A9FA6] mb-2">Expiry Date</label>
                  <input 
                    id="expiry"
                    type="text" 
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY" 
                    className="w-full bg-[#0B0D10] border border-[#262B33] rounded-xl p-3 text-[#F5F5F2] focus:outline-none focus:border-[#D4A94A] focus:ring-1 focus:ring-[#D4A94A] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cvc" className="block text-sm font-medium text-[#9A9FA6] mb-2">CVC</label>
                  <input 
                    id="cvc"
                    type="text" 
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    placeholder="123" 
                    maxLength={4}
                    className="w-full bg-[#0B0D10] border border-[#262B33] rounded-xl p-3 text-[#F5F5F2] focus:outline-none focus:border-[#D4A94A] focus:ring-1 focus:ring-[#D4A94A] transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="card-name" className="block text-sm font-medium text-[#9A9FA6] mb-2">Name on Card</label>
                <input 
                  id="card-name"
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full bg-[#0B0D10] border border-[#262B33] rounded-xl p-3 text-[#F5F5F2] focus:outline-none focus:border-[#D4A94A] focus:ring-1 focus:ring-[#D4A94A] transition-colors"
                  required
                />
              </div>

              <div className="mt-8 flex justify-end">
                <button 
                  type="submit"
                  className="w-full bg-[#D4A94A] hover:bg-[#E8C066] text-[#0B0D10] font-bold py-4 rounded-xl transition-colors focus:outline-none focus:ring-4 focus:ring-[#D4A94A]/50"
                >
                  Pay & Join Waitlist
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Success Confirmation */}
        {step === 3 && (
          <div className="bg-[#15181D] border border-[#262B33] rounded-2xl p-8 md:p-12 text-center shadow-2xl flex flex-col items-center">
            <div className="w-20 h-20 bg-[#4ADE80]/10 border border-[#4ADE80]/20 rounded-full flex items-center justify-center text-[#4ADE80] mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-3xl font-bold text-[#F5F5F2] mb-4">You're on the waitlist!</h2>
            <p className="text-[#9A9FA6] mb-8 max-w-md mx-auto">
              Your request has been placed. Since this vehicle is highly requested, bookings are processed first-come, first-served.
            </p>
            
            <div className="bg-[#F2B84B]/10 border border-[#F2B84B]/30 rounded-xl p-4 mb-8 inline-block">
              <p className="text-[#F2B84B] font-medium text-sm">
                NOTE: This is a demo application. No actual payment was processed or vehicle booked.
              </p>
            </div>

            <Link 
              href="/profile"
              className="bg-[#0B0D10] hover:bg-[#262B33] border border-[#262B33] text-[#F5F5F2] font-bold py-3 px-8 rounded-xl transition-colors focus:outline-none focus:ring-4 focus:ring-[#D4A94A]/50"
            >
              View My Bookings
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
