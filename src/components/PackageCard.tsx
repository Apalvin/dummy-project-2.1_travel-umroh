import Link from "next/link";
import { Star, MapPin, CalendarDays, Clock } from "lucide-react";

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

export default function PackageCard({ pkg }: { pkg: TravelPackage }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
  };

  const renderStars = (rating: number | null) => {
    if (!rating) return null;
    return (
      <div className="flex text-[#F97316]">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-current" />
        ))}
      </div>
    );
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full border border-gray-100">
      {/* Image Section - 40% */}
      <div className="relative h-56 w-full overflow-hidden bg-gray-100">
        <img 
          src={pkg.image_url || "/images/default_package.png"} 
          alt={pkg.title}
          onError={(e) => { e.currentTarget.src = "/images/default_package.png" }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-[#1E3A8A] px-3 py-1.5 rounded-full text-xs font-bold shadow-sm uppercase tracking-wider">
            {pkg.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white">
          <div className="font-semibold text-lg">{formatPrice(pkg.price_idr)}</div>
          <div className="flex items-center gap-1 text-sm bg-black/40 px-2 py-1 rounded-lg backdrop-blur-md">
            <Clock className="w-4 h-4" /> {pkg.duration_days} Hari
          </div>
        </div>
      </div>

      {/* Content Section - 60% */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-[#1E3A8A] mb-3 line-clamp-2">{pkg.title}</h3>
        
        <div className="space-y-3 mb-6 flex-grow">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <CalendarDays className="w-4 h-4 text-[#F97316]" />
            <span>Berangkat: <strong>{pkg.departure_month || "Menyesuaikan"}</strong></span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-[#F97316]" />
            <span>Pembimbing: {pkg.muthawwif_name || "TBA"}</span>
          </div>
          
          {(pkg.hotel_makkah_rating || pkg.hotel_madinah_rating) && (
            <div className="pt-3 border-t border-gray-100 flex gap-4">
              {pkg.hotel_makkah_rating && (
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Makkah</span>
                  {renderStars(pkg.hotel_makkah_rating)}
                </div>
              )}
              {pkg.hotel_madinah_rating && (
                <div className="flex flex-col gap-1 border-l border-gray-100 pl-4">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Madinah</span>
                  {renderStars(pkg.hotel_madinah_rating)}
                </div>
              )}
            </div>
          )}
        </div>

        <Link 
          href={`https://wa.me/6285150688320?text=Halo%20Al-Iqro%20Travel,%20saya%20tertarik%20dengan%20paket%20${pkg.title}`}
          target="_blank"
          className="w-full text-center bg-[#FAFAF9] hover:bg-[#F97316] text-[#1E3A8A] hover:text-white border border-gray-200 hover:border-[#F97316] py-3 rounded-xl font-semibold transition-colors duration-300"
        >
          Pesan Sekarang
        </Link>
      </div>
    </div>
  );
}
