import Link from "next/link";
import { Car, Menu, User } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B0D10]/80 backdrop-blur-md border-b border-[#262B33]">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-[#D4A94A] font-bold text-xl">
          <Car className="w-6 h-6" />
          <span>Fleetly</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#9A9FA6]">
          <Link href="/vehicles" className="hover:text-[#F5F5F2] transition-colors">Fleet</Link>
          <Link href="/locations" className="hover:text-[#F5F5F2] transition-colors">Locations</Link>
          <Link href="/offers" className="hover:text-[#F5F5F2] transition-colors">Offers</Link>
          <Link href="/about" className="hover:text-[#F5F5F2] transition-colors">About Us</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:flex items-center gap-2 text-sm font-medium text-[#F5F5F2] hover:text-[#D4A94A] transition-colors">
            <User className="w-4 h-4" />
            Sign In
          </Link>
          <button className="md:hidden text-[#F5F5F2]">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
