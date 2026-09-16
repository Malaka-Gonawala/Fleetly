import { ReactNode } from "react";
import Link from "next/link";
import { Car, List, Settings } from "lucide-react";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    notFound();
  }

  const res = await fetch("http://localhost:8000/api/auth/me", {
    headers: {
      Cookie: `access_token=${token}`,
    },
  });

  if (!res.ok) {
    notFound();
  }

  const user = await res.json();
  if (user.role !== "admin") {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0B0D10] flex">
      <aside className="w-64 bg-[#15181D] border-r border-[#262B33] flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-[#262B33]">
          <Link href="/" className="flex items-center gap-2 text-[#D4A94A] font-bold text-xl">
            <Car className="w-6 h-6" />
            <span>Admin Panel</span>
          </Link>
        </div>
        <nav className="p-4 space-y-2 flex-1">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#F5F5F2] bg-[#262B33]/50 transition-colors">
            <Car size={18} /> Manage Vehicles
          </Link>
          <Link href="/admin/waitlist" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#9A9FA6] hover:bg-[#262B33]/30 hover:text-[#F5F5F2] transition-colors">
            <List size={18} /> Waitlist & Bookings
          </Link>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
