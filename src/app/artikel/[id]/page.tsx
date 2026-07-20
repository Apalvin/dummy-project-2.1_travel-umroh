import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 0; // Ensure data is always fresh

export default async function ReadArticle({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { data: article, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", resolvedParams.id)
    .single();

  if (error || !article) {
    notFound();
  }

  return (
    <div className="bg-[#FAFAF9] min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/artikel" className="inline-flex items-center text-[#1E3A8A] font-medium hover:text-[#F97316] mb-8 transition-colors">
          &larr; Kembali ke Kumpulan Artikel
        </Link>
        
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Hero Header with Background Image */}
          <div className="relative w-full h-[60vh] min-h-[450px] flex flex-col justify-end p-8 md:p-16">
            <div className="absolute inset-0 z-0">
              <img 
                src={article.image_url} 
                alt={article.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent"></div>
            </div>
            
            <div className="relative z-10 max-w-4xl">
              <div className="inline-block bg-[#F97316] text-white px-4 py-1.5 rounded-md text-sm font-bold tracking-widest uppercase mb-6 shadow-lg">
                Panduan Ibadah
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight drop-shadow-lg">
                {article.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-200 font-medium text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30">
                    <span className="text-white font-bold text-xs tracking-wider">IQ</span>
                  </div>
                  <span>Tim Al-Iqro</span>
                </div>
                <span>&bull;</span>
                <span>{new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8 md:p-16 lg:px-24">
            <div 
              className="prose prose-lg prose-blue max-w-none text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.content || '<p>Konten belum tersedia.</p>' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
