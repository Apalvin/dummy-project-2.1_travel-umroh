"use client";

import { useEffect, useState, Suspense } from "react";
import { supabase } from "@/lib/supabaseClient";
import PackageCard from "@/components/PackageCard";
import { Search, MapPin } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

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

function PaketContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialKategori = searchParams.get("kategori") || "Semua Kategori";
  const initialBulan = searchParams.get("bulan") || "";
  const initialHarga = searchParams.get("harga") || "Semua Harga";
  const initialSearch = searchParams.get("q") || "";

  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [kategori, setKategori] = useState(initialKategori);
  const [bulan, setBulan] = useState(initialBulan);
  const [harga, setHarga] = useState(initialHarga);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const fetchPackages = async () => {
    setIsLoading(true);
    let query = supabase.from("travel_packages").select("*").order("created_at", { ascending: false });

    if (kategori !== "Semua Kategori") {
      let dbCat = kategori;
      if (kategori.toLowerCase().includes("umroh")) dbCat = "Umroh";
      else if (kategori.toLowerCase().includes("haji")) dbCat = "Haji";
      else if (kategori.toLowerCase().includes("wisata")) dbCat = "Wisata";
      
      query = query.eq("category", dbCat);
    }

    if (bulan) {
      query = query.ilike("departure_month", `%${bulan}%`);
    }

    if (harga !== "Semua Harga") {
      if (harga === "< Rp 30 Juta") query = query.lt("price_idr", 30000000);
      else if (harga === "Rp 30 Juta - Rp 50 Juta") {
        query = query.gte("price_idr", 30000000).lte("price_idr", 50000000);
      }
      else if (harga === "> Rp 50 Juta") query = query.gt("price_idr", 50000000);
    }

    if (searchQuery) {
      query = query.ilike("title", `%${searchQuery}%`);
    }

    const { data, error } = await query;
    if (!error && data) {
      setPackages(data);
    } else {
      setPackages([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPackages();
  }, [kategori, bulan, harga, searchQuery]);

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "Semua Kategori" && value !== "Semua Harga") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`/paket?${params.toString()}`);
  };

  useEffect(() => {
    setKategori(searchParams.get("kategori") || "Semua Kategori");
    setBulan(searchParams.get("bulan") || "");
    setHarga(searchParams.get("harga") || "Semua Harga");
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#FAFAF9]">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="bg-[#1E3A8A] rounded-3xl p-8 md:p-12 text-white mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#F97316]/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
          
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Eksplorasi Paket Perjalanan</h1>
            <p className="text-gray-300 max-w-2xl text-lg mb-8">
              Temukan paket Umroh, Haji, dan Wisata Halal terbaik yang sesuai dengan kebutuhan dan rencana perjalanan ibadah Anda.
            </p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] p-6 mb-12 flex flex-col lg:flex-row gap-4 items-end border border-gray-100">
          <div className="w-full lg:w-1/4">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Kategori Perjalanan</label>
            <div className="relative group">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-[#F97316] transition-colors" />
              <select 
                value={kategori}
                onChange={(e) => {
                  setKategori(e.target.value);
                  handleFilterChange("kategori", e.target.value);
                }}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-[#F97316] outline-none appearance-none font-semibold text-gray-800 cursor-pointer transition-all"
              >
                <option>Semua Kategori</option>
                <option>Umroh</option>
                <option>Haji</option>
                <option>Wisata Halal</option>
              </select>
            </div>
          </div>
          <div className="w-full lg:w-1/4">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Bulan Keberangkatan</label>
            <input 
              type="month" 
              value={bulan}
              onChange={(e) => {
                setBulan(e.target.value);
                handleFilterChange("bulan", e.target.value);
              }}
              className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-[#F97316] outline-none font-semibold text-gray-800 transition-all"
            />
          </div>
          <div className="w-full lg:w-1/4">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Rentang Harga</label>
            <select 
              value={harga}
              onChange={(e) => {
                setHarga(e.target.value);
                handleFilterChange("harga", e.target.value);
              }}
              className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-[#F97316] outline-none font-semibold text-gray-800 cursor-pointer transition-all appearance-none"
            >
              <option>Semua Harga</option>
              <option>&lt; Rp 30 Juta</option>
              <option>Rp 30 Juta - Rp 50 Juta</option>
              <option>&gt; Rp 50 Juta</option>
            </select>
          </div>
          <div className="w-full lg:w-1/4">
             <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Cari Nama Paket</label>
             <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-[#F97316] transition-colors" />
              <input 
                type="text" 
                placeholder="Misal: Umroh Plus Turki"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handleFilterChange("q", e.target.value);
                }}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-[#F97316] outline-none font-semibold text-gray-800 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {kategori === "Semua Kategori" ? "Semua Paket" : `Paket ${kategori}`}
          </h2>
          <div className="text-sm font-medium text-gray-500">
            Menampilkan {packages.length} paket
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-[#F97316] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : packages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Belum ada paket tersedia</h3>
            <p className="text-gray-500">Silakan ubah filter pencarian Anda untuk melihat paket lainnya.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PaketPage() {
  return (
    <Suspense fallback={
      <div className="pt-28 pb-20 min-h-screen bg-[#FAFAF9] flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-[#F97316] border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <PaketContent />
    </Suspense>
  );
}
