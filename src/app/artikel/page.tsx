import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const revalidate = 0; // Ensure data is always fresh

export default async function Artikel() {
  const { data: articles, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="bg-[#FAFAF9] min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-16">
          <span className="text-[#F97316] font-bold tracking-wider uppercase text-sm block mb-2">Pusat Edukasi</span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E3A8A] mb-4">Artikel & Panduan Ibadah</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Temukan berbagai panduan, tips, dan informasi penting seputar ibadah umroh, haji, dan wisata halal.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(!articles || articles.length === 0) ? (
            <div className="col-span-full text-center py-20 text-gray-500 border-2 border-dashed border-gray-200 rounded-2xl">
              Belum ada artikel yang dipublikasikan.
            </div>
          ) : (
            articles.map((item) => (
              <Link href={`/artikel/${item.id}`} key={item.id} className="block group h-full">
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group-hover:-translate-y-2">
                  <div className="h-56 relative w-full overflow-hidden">
                    <img 
                      src={item.image_url} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[#1E3A8A] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                      Edukasi
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-sm text-gray-500 mb-3 font-medium">
                      {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#F97316] transition-colors line-clamp-2">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                      {item.description}
                    </p>
                    <div className="flex items-center text-[#F97316] font-bold text-sm mt-auto group-hover:gap-2 transition-all">
                      Baca Selengkapnya <span className="ml-1 group-hover:ml-2 transition-all">&rarr;</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </FadeIn>
      </div>
    </div>
  );
}
