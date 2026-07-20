"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // On non-home pages, always keep it solid so it doesn't blend with white background
  const isSolid = !isHome || isScrolled;

  const navLinks = [
    { name: "Umroh", href: "/paket?kategori=Umroh" },
    { name: "Haji", href: "/paket?kategori=Haji" },
    { name: "Wisata Halal", href: "/paket?kategori=Wisata Halal" },
    { name: "Artikel", href: "/artikel" },
    { name: "Tentang Kami", href: "/tentang-kami" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSolid || isMobileMenuOpen ? "bg-[#1E3A8A] shadow-md py-4" : "bg-transparent py-6"
      } text-white`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-xl md:text-2xl font-bold flex items-center gap-2 z-50">
          <span className="text-[#F97316]">Al-Iqro</span> Travel
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 font-medium items-center">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-[#F97316] transition-colors">
              {link.name}
            </Link>
          ))}
          <Link 
            href="/kontak" 
            className="bg-[#F97316] hover:bg-orange-600 text-white px-5 py-2 rounded-xl transition-colors font-semibold shadow-sm ml-4"
          >
            Konsultasi
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center gap-4 z-50">
          <Link 
            href="/kontak" 
            className="bg-[#F97316] hover:bg-orange-600 text-white px-4 py-1.5 text-sm rounded-lg transition-colors font-semibold shadow-sm"
          >
            Konsultasi
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-[#1E3A8A] shadow-xl overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-80 border-t border-blue-800" : "max-h-0"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-white hover:text-[#F97316] font-medium py-2 border-b border-blue-800/50 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
