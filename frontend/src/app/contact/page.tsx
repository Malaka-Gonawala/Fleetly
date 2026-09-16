import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-[#0B0D10] min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#F5F5F2] mb-4">Contact Us</h1>
          <p className="text-[#9A9FA6] max-w-2xl mx-auto text-lg">
            Our concierge team is available 24/7 to assist you with reservations, inquiries, or support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-[#15181D] border border-[#262B33] rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-[#F5F5F2] mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#9A9FA6] mb-2">First Name</label>
                  <input type="text" className="w-full bg-[#0B0D10] border border-[#262B33] rounded-xl p-3 text-[#F5F5F2] focus:outline-none focus:border-[#D4A94A] transition-colors" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#9A9FA6] mb-2">Last Name</label>
                  <input type="text" className="w-full bg-[#0B0D10] border border-[#262B33] rounded-xl p-3 text-[#F5F5F2] focus:outline-none focus:border-[#D4A94A] transition-colors" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#9A9FA6] mb-2">Email Address</label>
                <input type="email" className="w-full bg-[#0B0D10] border border-[#262B33] rounded-xl p-3 text-[#F5F5F2] focus:outline-none focus:border-[#D4A94A] transition-colors" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#9A9FA6] mb-2">Message</label>
                <textarea rows={4} className="w-full bg-[#0B0D10] border border-[#262B33] rounded-xl p-3 text-[#F5F5F2] focus:outline-none focus:border-[#D4A94A] transition-colors" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="w-full bg-[#D4A94A] hover:bg-[#E8C066] text-[#0B0D10] font-bold py-4 rounded-xl transition-colors">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[#F5F5F2] mb-6">Get in Touch</h2>
              <p className="text-[#9A9FA6] mb-8">
                Whether you're ready to book your next dream car or just have a few questions, we're here to help. Reach out through any of the channels below.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#15181D] border border-[#262B33] flex items-center justify-center text-[#D4A94A] shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-[#F5F5F2] font-semibold mb-1">Phone</h4>
                  <p className="text-[#9A9FA6]">Toll-free: +1 (800) 123-4567</p>
                  <p className="text-[#9A9FA6]">Local: +1 (310) 555-0198</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#15181D] border border-[#262B33] flex items-center justify-center text-[#D4A94A] shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-[#F5F5F2] font-semibold mb-1">Email</h4>
                  <p className="text-[#9A9FA6]">concierge@fleetly.com</p>
                  <p className="text-[#9A9FA6]">support@fleetly.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#15181D] border border-[#262B33] flex items-center justify-center text-[#D4A94A] shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-[#F5F5F2] font-semibold mb-1">Rental House</h4>
                  <p className="text-[#9A9FA6]">Via Montenapoleone 10<br />20121 Milano MI, Italy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
