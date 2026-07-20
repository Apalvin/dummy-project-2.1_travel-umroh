export default function Footer() {
  return (
    <footer className="bg-[#1E3A8A] text-white pt-12 pb-8 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="text-2xl font-bold mb-4"><span className="text-[#F97316]">Al-Iqro</span> Travel</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Perjalanan Suci Nyaman, Aman, dan Bintang 5. Kami memberikan fasilitas premium untuk memastikan ibadah Anda lancar dan mabrur.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-4 text-[#F97316]">Link Cepat</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/paket?kategori=Umroh" className="hover:text-white transition">Paket Umroh</a></li>
            <li><a href="/paket?kategori=Haji" className="hover:text-white transition">Haji Plus</a></li>
            <li><a href="/paket?kategori=Wisata Halal" className="hover:text-white transition">Wisata Halal</a></li>
            <li><a href="/artikel" className="hover:text-white transition">Artikel & Edukasi</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-lg mb-4 text-[#F97316]">Legalitas & Izin</h4>
          <p className="text-sm text-gray-300 mb-2">Izin Kemenag RI: DUMMY-12345/2026</p>
          <p className="text-sm text-gray-300">Terdaftar di Asosiasi Penyelenggara Haji & Umroh</p>
        </div>
      </div>
      <div className="border-t border-blue-900 pt-8 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Al-Iqro Travel. All rights reserved.
      </div>
    </footer>
  );
}
