export default function TermsPage() {
  return (
    <div className="bg-[#0B0D10] min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#F5F5F2] mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert prose-p:text-[#9A9FA6] prose-headings:text-[#F5F5F2] max-w-none">
          <p className="lead text-lg mb-8 text-[#9A9FA6]">
            Last updated: September 15, 2026
          </p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#F5F5F2]">1. Agreement to Terms</h2>
              <p className="text-[#9A9FA6] leading-relaxed">
                By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#F5F5F2]">2. Rental Requirements</h2>
              <p className="text-[#9A9FA6] leading-relaxed">
                To rent a vehicle from Fleetly, you must:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4 text-[#9A9FA6]">
                <li>Be at least 25 years of age</li>
                <li>Possess a valid driver's license</li>
                <li>Provide a major credit card in your name</li>
                <li>Meet our insurance requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#F5F5F2]">3. Vehicle Usage & Collection</h2>
              <p className="text-[#9A9FA6] leading-relaxed">
                Vehicles must be operated safely and in compliance with all Italian traffic laws. Vehicles must be collected in-person from our Milan rental house by the primary renter. We do not offer delivery. The renter is responsible for any tolls, tickets, or violations incurred during the rental period.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#F5F5F2]">4. Cancellations and Refunds</h2>
              <p className="text-[#9A9FA6] leading-relaxed">
                Reservations may be cancelled for a full refund up to 48 hours before the scheduled pickup time. Cancellations made within 48 hours may be subject to a cancellation fee equivalent to one day's rental.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
