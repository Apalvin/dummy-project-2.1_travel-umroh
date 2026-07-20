"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // On non-home pages, always keep it solid so it doesn't blend with white background
  const isSolid = !isHome || isScrolled;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSolid ? "bg-[#1E3A8A] shadow-md py-4" : "bg-transparent py-6"
      } text-white`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center gap-2">
          <span className="text-[#F97316]">Al-Iqro</span> Travel
        </Link>
        <div className="hidden md:flex space-x-6 font-medium">
          <Link href="/paket?kategori=Umroh" className="hover:text-[#F97316] transition-colors">Umroh</Link>
          <Link href="/paket?kategori=Haji" className="hover:text-[#F97316] transition-colors">Haji</Link>
          <Link href="/paket?kategori=Wisata Halal" className="hover:text-[#F97316] transition-colors">Wisata Halal</Link>
          <Link href="/artikel" className="hover:text-[#F97316] transition-colors">Artikel</Link>
          <Link href="/tentang-kami" className="hover:text-[#F97316] transition-colors">Tentang Kami</Link>
        </div>
        <Link 
          href="/kontak" 
          className="bg-[#F97316] hover:bg-orange-600 text-white px-5 py-2 rounded-xl transition-colors font-semibold shadow-sm"
        >
          Konsultasi
        </Link>
      </div>
    </nav>
  );
}
