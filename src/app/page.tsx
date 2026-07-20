"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import PackageCard from "@/components/PackageCard";
import { Search, MapPin, Star, Award, ShieldCheck, PlayCircle, PlaneTakeoff, HeartHandshake, Camera, Video, MessageSquare, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";

interface TravelPackage {
  id: string;
  title: string;
  category: string;
  price_idr: number;
  duration_days: number;
  airline: string;
  hotel_makkah_rating: number | null;
  hotel_madinah_rating: number | null;
  muthawwif_name: string;
  departure_month: string;
  image_url: string;
}

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [featuredPackages, setFeaturedPackages] = useState<TravelPackage[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search State
  const [kategori, setKategori] = useState("Semua Kategori");
  const [bulan, setBulan] = useState("");
  const [harga, setHarga] = useState("Semua Harga");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (kategori !== "Semua Kategori") params.set("kategori", kategori);
    if (bulan) params.set("bulan", bulan);
    if (harga !== "Semua Harga") params.set("harga", harga);
    router.push(`/paket?${params.toString()}`);
  };

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data: pkgs } = await supabase
        .from("travel_packages")
        .select("*")
        .limit(3)
        .order("created_at", { ascending: false });

      if (pkgs) setFeaturedPackages(pkgs);

      const { data: arts } = await supabase
        .from("articles")
        .select("*")
        .limit(3)
        .order("created_at", { ascending: false });
        
      if (arts) setFeaturedArticles(arts);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const faqs = [
    { q: "Apakah Al-Iqro Travel terdaftar resmi di Kemenag?", a: "Ya, Al-Iqro Travel adalah penyelenggara perjalanan ibadah umroh (PPIU) resmi yang terdaftar di Kementerian Agama RI dan tergabung dalam asosiasi travel terpercaya." },
    { q: "Apa saja fasilitas yang didapatkan jamaah?", a: "Jamaah akan mendapatkan fasilitas hotel bintang 4/5 (dekat dengan masjid), tiket pesawat PP (direct/transit sesuai paket), visa umroh, transportasi bus full AC, muthawwif pembimbing, perlengkapan umroh eksklusif, serta air zam-zam." },
    { q: "Apakah bisa mendaftar paket Private Umroh atau Keluarga?", a: "Sangat bisa! Kami menyediakan layanan 'Private Umroh' untuk rombongan keluarga atau perusahaan dengan itinerary dan fasilitas yang bisa disesuaikan sepenuhnya dengan kebutuhan Anda." },
    { q: "Bagaimana cara pembayaran paket umroh?", a: "Pembayaran dapat dilakukan melalui transfer bank ke rekening resmi perusahaan. Kami juga menyediakan opsi pembayaran bertahap (cicilan tanpa riba) bagi jamaah yang merencanakan keberangkatan jauh hari." },
  ];

  return (
    <div className="bg-[#FAFAF9]">
      {/* 1. Hero Section (Diperbaiki dgn Gambar Lokal) */}
      <section className="relative h-[90vh] min-h-[650px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero_makkah.png" 
            alt="Makkah Background" 
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/30 z-0"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A8A]/85 via-[#1E3A8A]/60 to-[#FAFAF9] z-0"></div>
        </div>

        <FadeIn className="container relative z-10 mx-auto px-4 text-center mt-16">
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <span className="w-6 h-[2px] bg-[#F97316]"></span>
            <span className="text-[#F97316] font-bold text-sm tracking-widest uppercase" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.2)" }}>
              Travel Umroh & Haji Premium 2026
            </span>
            <span className="w-6 h-[2px] bg-[#F97316]"></span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
            Perjalanan Suci <br className="hidden md:block"/> Nyaman & Bintang 5
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-2xl mx-auto font-medium" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
            Wujudkan niat suci Anda bersama Al-Iqro Travel. Kami menghadirkan fasilitas eksklusif dan pembimbing tersertifikasi untuk ibadah yang khusyuk dan mabrur.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/paket"
              className="bg-[#F97316] hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Lihat Paket Kami <PlaneTakeoff className="w-5 h-5" />
            </Link>
            <Link 
              href="/kontak"
              className="bg-white hover:bg-gray-100 text-[#1E3A8A] px-8 py-4 rounded-xl text-lg font-bold shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Konsultasi Gratis <PlayCircle className="w-5 h-5" />
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Floating Search/Filter Bar */}
      <section className="relative z-20 -mt-16 md:-mt-24 container mx-auto px-4 mb-24">
        <div className="bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] p-4 md:p-6 flex flex-col lg:flex-row gap-4 items-end border border-white/50 backdrop-blur-xl">
          <div className="w-full lg:w-1/3">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Kategori Perjalanan</label>
            <div className="relative group">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-[#F97316] transition-colors" />
              <select 
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-[#F97316] outline-none appearance-none font-semibold text-gray-800 cursor-pointer transition-all"
              >
                <option>Semua Kategori</option>
                <option>Umroh Reguler</option>
                <option>Umroh Plus</option>
                <option>Haji Furoda</option>
                <option>Wisata Halal</option>
              </select>
            </div>
          </div>
          <div className="w-full lg:w-1/3">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Bulan Keberangkatan</label>
            <input 
              type="month" 
              value={bulan}
              onChange={(e) => setBulan(e.target.value)}
              className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-[#F97316] outline-none font-semibold text-gray-800 transition-all"
            />
          </div>
          <div className="w-full lg:w-1/3">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Rentang Harga</label>
            <select 
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
              className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-[#F97316] outline-none font-semibold text-gray-800 cursor-pointer transition-all appearance-none"
            >
              <option>Semua Harga</option>
              <option>&lt; Rp 30 Juta</option>
              <option>Rp 30 Juta - Rp 50 Juta</option>
              <option>&gt; Rp 50 Juta</option>
            </select>
          </div>
          <button onClick={handleSearch} className="w-full lg:w-auto bg-[#1E3A8A] hover:bg-blue-900 text-white px-10 py-4 rounded-2xl font-bold shadow-lg hover:shadow-blue-900/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
            <Search className="w-5 h-5" /> Cari
          </button>
        </div>
      </section>

      {/* 2. Layanan Utama Kami */}
      <section className="py-12 bg-white">
        <FadeIn className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#F97316] font-bold tracking-wider uppercase text-sm">Pelayanan Terbaik</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mt-2">Layanan Utama Kami</h2>
            <div className="w-24 h-1 bg-[#F97316] mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { title: "Umroh Premium", desc: "Reguler & Plus", icon: <Star className="w-8 h-8"/>, color: "bg-blue-50 text-blue-600 border-blue-100" },
              { title: "Haji Plus & Furoda", desc: "Tanpa Antre Panjang", icon: <Award className="w-8 h-8"/>, color: "bg-orange-50 text-orange-600 border-orange-100" },
              { title: "Wisata Halal", desc: "Destinasi Islami Global", icon: <PlaneTakeoff className="w-8 h-8"/>, color: "bg-green-50 text-green-600 border-green-100" },
              { title: "Pengurusan Visa", desc: "Cepat & Terpercaya", icon: <ShieldCheck className="w-8 h-8"/>, color: "bg-purple-50 text-purple-600 border-purple-100" },
            ].map((item, idx) => (
              <div key={idx} className={`p-6 rounded-3xl border-2 ${item.color} hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center cursor-pointer group`}>
                <div className="p-4 bg-white rounded-2xl shadow-sm mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h3>
                <p className="text-sm font-medium opacity-80">{item.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* 3. Banner Promo Khusus */}
      <section className="py-16 bg-white">
        <FadeIn className="container mx-auto px-4">
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl group">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors z-10"></div>
            <img 
              src="/images/banner_ramadhan.png" 
              alt="Promo Ramadhan" 
              className="w-full h-80 md:h-[400px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6">
              <span className="bg-[#F97316] text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase mb-4 animate-pulse">
                Spesial Promo
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">Paket Umroh Ramadhan 2026</h2>
              <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl mb-8 drop-shadow">Raih pahala setara Haji bersama Rasulullah dengan beribadah di bulan suci Ramadhan.</p>
              <Link href="/paket?kategori=Umroh" className="bg-white text-[#1E3A8A] hover:bg-gray-100 px-8 py-3.5 rounded-xl font-bold shadow-lg transition-transform hover:scale-105">
                Pesan Kursi Sekarang
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 4. Program Khusus / Private Umroh */}
      <section className="py-20 bg-[#FAFAF9] overflow-hidden">
        <FadeIn className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-[#F97316]/10 rounded-3xl transform -rotate-3"></div>
              <div className="absolute -inset-4 bg-[#1E3A8A]/10 rounded-3xl transform rotate-3"></div>
              <img 
                src="/images/default_package.png" 
                alt="Private Umroh" 
                className="relative rounded-2xl shadow-2xl object-cover w-full h-[500px]"
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Custom Itinerary</p>
                    <p className="text-sm text-gray-500">Atur jadwal Anda sendiri</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <span className="text-[#F97316] font-bold tracking-wider uppercase text-sm mb-2 block">Layanan Eksklusif</span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#1E3A8A] mb-6 leading-tight">Program Khusus <br/> Private Umroh</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Nikmati kenyamanan beribadah bersama keluarga tercinta atau kolega perusahaan Anda tanpa digabung dengan rombongan lain. Layanan premium dari penjemputan hingga kepulangan.
              </p>
              
              <ul className="space-y-4 mb-10">
                {["Hotel Bintang 5 persis di pelataran masjid", "Muthawwif Khusus (Private Guide)", "Transportasi VIP eksklusif (GMC/Innova/Hiace)", "Bebas tentukan tanggal keberangkatan"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                    <div className="w-6 h-6 rounded-full bg-[#1E3A8A]/10 text-[#1E3A8A] flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              
              <Link href="/kontak" className="inline-flex items-center gap-2 bg-[#1E3A8A] hover:bg-blue-900 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:-translate-y-1 transition-all">
                Konsultasikan Rencana Anda
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 5. Paket Rekomendasi (Ditingkatkan) */}
      <section className="py-24 bg-white">
        <FadeIn className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-[#F97316] font-bold tracking-wider uppercase text-sm block mb-2">Pilihan Terfavorit</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mb-4">Paket Rekomendasi Kami</h2>
              <p className="text-gray-600 text-lg">Pilihan paket perjalanan ibadah dan wisata halal terbaik yang paling diminati jamaah dengan tingkat kepuasan tertinggi.</p>
            </div>
            <Link href="/paket" className="hidden md:inline-flex items-center gap-2 text-[#1E3A8A] font-bold hover:text-[#F97316] transition-colors">
              Lihat Semua Paket <PlaneTakeoff className="w-5 h-5" />
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : featuredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {featuredPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500 bg-[#FAFAF9] rounded-3xl border border-dashed border-gray-300">
              Belum ada paket unggulan tersedia saat ini.
            </div>
          )}
          
          <div className="mt-12 text-center md:hidden">
            <Link href="/paket" className="inline-block bg-[#1E3A8A] text-white px-8 py-4 rounded-xl font-bold shadow-lg">
              Lihat Semua Paket
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* 6. Informasi Syarat & Panduan Ibadah */}
      <section className="py-20 bg-[#1E3A8A] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F97316]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <FadeIn className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Informasi & Panduan Ibadah</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">Bekali diri Anda dengan ilmu manasik dan informasi persyaratan agar ibadah berjalan lancar.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoading ? (
              <div className="col-span-3 text-center py-10 text-gray-300">Memuat artikel...</div>
            ) : featuredArticles.length === 0 ? (
              <div className="col-span-3 text-center py-10 text-gray-300 border border-white/20 border-dashed rounded-2xl">
                Belum ada panduan ibadah.
              </div>
            ) : (
              featuredArticles.map((item) => (
                <Link href={`/artikel/${item.id}`} key={item.id} className="block h-full">
                  <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl hover:bg-white/20 transition-all cursor-pointer group flex flex-col h-full">
                    <div className="h-48 w-full bg-gray-800 rounded-xl mb-6 overflow-hidden relative shrink-0">
                      <img src={item.image_url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" alt={item.title} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-[#F97316] transition-colors">{item.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-grow">{item.description}</p>
                    <span className="text-sm font-semibold text-[#F97316] flex items-center gap-1 mt-auto">Baca Selengkapnya &rarr;</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </FadeIn>
      </section>

      {/* 7. Testimoni / Apa Kata Jamaah */}
      <section className="py-24 bg-white">
        <FadeIn className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#F97316] font-bold tracking-wider uppercase text-sm">Alhamdulillah</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8A] mt-2">Apa Kata Jamaah Kami</h2>
            <div className="w-24 h-1 bg-[#F97316] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Keluarga Bpk. Ahmad", paket: "Umroh Plus Turki", text: "Luar biasa pelayanan Al-Iqro. Hotel di Makkah benar-benar persis depan masjid. Muthawwif sangat sabar membimbing kami sekeluarga yang membawa lansia." },
              { name: "Ibu Siti Aminah", paket: "Umroh Reguler Premium", text: "Makanannya enak cocok dengan lidah nusantara. Proses keberangkatan sangat terorganisir. Alhamdulillah ibadah jadi sangat khusyuk." },
              { name: "Bpk. Budi Santoso", paket: "Haji Furoda", text: "Sempat ragu untuk haji tanpa antre, tapi Al-Iqro membuktikan komitmennya. Visa aman, maktab nyaman, dan bimbingan hajinya sangat mendalam." },
            ].map((review, idx) => (
              <div key={idx} className="bg-[#FAFAF9] p-8 rounded-3xl shadow-sm border border-gray-100 relative mt-8">
                <div className="absolute -top-6 left-8 w-12 h-12 bg-[#1E3A8A] text-white rounded-full flex items-center justify-center font-serif text-2xl font-bold shadow-lg">"</div>
                <div className="flex text-[#F97316] mb-4 pt-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">"{review.text}"</p>
                <div>
                  <h4 className="font-bold text-gray-900">{review.name}</h4>
                  <p className="text-sm text-gray-500">{review.paket}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* 8. FAQ & Social Media Hub */}
      <section className="py-20 bg-[#FAFAF9] border-t border-gray-100">
        <FadeIn className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* FAQ */}
            <div>
              <h2 className="text-3xl font-bold text-[#1E3A8A] mb-8">Pertanyaan Umum (FAQ)</h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300">
                    <button 
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full px-6 py-4 text-left font-bold text-gray-800 flex justify-between items-center hover:bg-gray-50"
                    >
                      {faq.q}
                      <span className={`text-[#F97316] text-xl transition-transform duration-300 ${openFaq === idx ? 'rotate-45' : ''}`}>+</span>
                    </button>
                    <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-48 pb-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 flex flex-col justify-center text-center">
              <h2 className="text-2xl font-bold text-[#1E3A8A] mb-4">Yuk, Terhubung Bersama Kami!</h2>
              <p className="text-gray-600 mb-8">Ikuti update terbaru promo, kajian, dan dokumentasi keberangkatan jamaah di media sosial kami.</p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold shadow-md hover:-translate-y-1 transition-transform">
                  <Camera className="w-5 h-5" /> Instagram
                </a>
                <a href="#" className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-bold shadow-md hover:-translate-y-1 transition-transform">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                  TikTok
                </a>
                <a href="#" className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-full font-bold shadow-md hover:-translate-y-1 transition-transform">
                  <Video className="w-5 h-5" /> YouTube
                </a>
                <a href="#" className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full font-bold shadow-md hover:-translate-y-1 transition-transform">
                  <MessageSquare className="w-5 h-5" /> Grup WA
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 9. Partner Kami (Logos) */}
      <section className="py-12 bg-white border-t border-gray-100">
        <FadeIn className="container mx-auto px-4 text-center">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">Bekerja Sama Dengan Maskapai & Fasilitas Terbaik</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Using bold text as placeholder for logos */}
            <span className="text-2xl font-black text-gray-800">SAUDIA</span>
            <span className="text-2xl font-black text-blue-800">GARUDA INDONESIA</span>
            <span className="text-2xl font-black text-red-800">EMIRATES</span>
            <span className="text-2xl font-black text-purple-900">QATAR AIRWAYS</span>
            <span className="text-2xl font-black text-yellow-600">PULLMAN ZAMZAM</span>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
