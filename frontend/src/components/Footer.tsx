import Link from "next/link";
import { Car } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#262B33] bg-[#0B0D10] text-[#9A9FA6] py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2 text-[#D4A94A] font-bold text-xl">
            <Car className="w-6 h-6" />
            <span>Fleetly</span>
          </Link>
          <p className="text-sm">
            Premium car rental services for your next journey. Experience luxury and comfort.
          </p>
        </div>
        
        <div>
          <h4 className="text-[#F5F5F2] font-semibold mb-4">Quick Links</h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link href="/vehicles" className="hover:text-[#D4A94A] transition-colors">Our Fleet</Link></li>
            <li><Link href="/locations" className="hover:text-[#D4A94A] transition-colors">Locations</Link></li>
            <li><Link href="/offers" className="hover:text-[#D4A94A] transition-colors">Special Offers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#F5F5F2] font-semibold mb-4">Support</h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link href="/faq" className="hover:text-[#D4A94A] transition-colors">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-[#D4A94A] transition-colors">Contact Us</Link></li>
            <li><Link href="/terms" className="hover:text-[#D4A94A] transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#F5F5F2] font-semibold mb-4">Newsletter</h4>
          <p className="text-sm mb-4">Subscribe for the latest offers and updates.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-[#15181D] border border-[#262B33] text-[#F5F5F2] px-3 py-2 rounded-md text-sm w-full focus:outline-none focus:border-[#D4A94A]"
            />
            <button className="bg-[#D4A94A] hover:bg-[#E8C066] text-[#0B0D10] px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-[#262B33] text-sm text-center">
        &copy; {new Date().getFullYear()} Fleetly. All rights reserved.
      </div>
    </footer>
  );
}
