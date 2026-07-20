import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Award, Users, HeartHandshake, MapPin, Plane } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function TentangKami() {
  return (
    <div className="bg-[#FAFAF9] min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] min-h-[650px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero_makkah.png" 
            alt="Makkah Background" 
            className="w-full h-full object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-black/30 z-0"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A8A]/85 via-[#1E3A8A]/60 to-[#FAFAF9] z-0"></div>
        </div>

        <FadeIn className="container relative z-10 mx-auto px-4 text-center mt-16">
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <span className="w-6 h-[2px] bg-[#F97316]"></span>
            <span className="text-[#F97316] font-bold text-sm tracking-widest uppercase" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.2)" }}>
              Profil Perusahaan
            </span>
            <span className="w-6 h-[2px] bg-[#F97316]"></span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
            Melayani Tamu Allah <br className="hidden md:block"/> Sepenuh Hati
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-2xl mx-auto font-medium" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
            Al-Iqro Travel berkomitmen menjadi jembatan terbaik bagi perjalanan ibadah suci Anda, dengan layanan premium dan bimbingan ibadah yang sesuai sunnah.
          </p>
        </FadeIn>
      </section>

      {/* Sejarah & Dedikasi */}
      <section className="py-24 bg-white relative">
        <FadeIn className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-[#1E3A8A]/5 rounded-3xl transform -rotate-2"></div>
              <img 
                src="/images/default_package.png" 
                alt="Pelayanan Jamaah" 
                className="relative rounded-2xl shadow-xl object-cover w-full h-[500px]"
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-100 max-w-xs hidden md:block">
                <div className="text-4xl font-black text-[#F97316] mb-2">100%</div>
                <div className="font-bold text-gray-800 text-lg leading-tight">Komitmen Melayani Sepenuh Hati</div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <h2 className="text-sm font-bold text-[#F97316] tracking-widest uppercase mb-3">Kisah Kami</h2>
              <h3 className="text-3xl md:text-5xl font-extrabold text-[#1E3A8A] mb-8 leading-tight">
                Dedikasi untuk <br /> Ibadah yang Mabrur
              </h3>
              <div className="prose prose-lg text-gray-600">
                <p>
                  Berawal dari niat tulus untuk memfasilitasi umat Muslim di Indonesia menunaikan panggilan ke Baitullah, <strong>Al-Iqro Travel</strong> didirikan pada tahun 2023 oleh Bapak Mail bin Kosaroh. Kami berangkat dari keyakinan bahwa setiap perjalanan ibadah haruslah berkesan, aman, dan selaras dengan tuntunan Rasulullah SAW.
                </p>
                <p>
                  Semenjak berdiri, kami telah membimbing ribuan jamaah. Kami tidak sekadar memberangkatkan, namun mendampingi setiap langkah Anda, memastikan ibadah umroh maupun haji Anda dapat ditunaikan dengan khusyuk dan nyaman. 
                </p>
              </div>
              <div className="mt-10 flex gap-6">
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-[#1E3A8A]">50K+</span>
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide mt-1">Jamaah Diberangkatkan</span>
                </div>
                <div className="w-px bg-gray-200"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-[#1E3A8A]">99%</span>
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wide mt-1">Tingkat Kepuasan</span>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Visi Misi */}
      <section className="py-24 bg-[#1E3A8A] text-white">
        <FadeIn className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Visi & Misi Kami</h2>
            <div className="w-24 h-1.5 bg-[#F97316] mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white/10 p-10 rounded-3xl backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all">
              <h3 className="text-2xl font-bold mb-6 text-[#F97316]">Visi</h3>
              <p className="text-xl leading-relaxed font-medium">
                "Menjadi biro perjalanan umroh dan haji terdepan di Indonesia yang terpercaya, amanah, dan selalu berinovasi dalam memberikan pelayanan terbaik kepada Tamu Allah."
              </p>
            </div>
            <div className="bg-white/10 p-10 rounded-3xl backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all">
              <h3 className="text-2xl font-bold mb-6 text-[#F97316]">Misi</h3>
              <ul className="space-y-4 text-lg text-gray-100">
                <li className="flex gap-4"><div className="mt-1.5 w-2 h-2 rounded-full bg-[#F97316] shrink-0"></div> Menyediakan fasilitas premium untuk kenyamanan maksimal jamaah.</li>
                <li className="flex gap-4"><div className="mt-1.5 w-2 h-2 rounded-full bg-[#F97316] shrink-0"></div> Membekali jamaah dengan manasik dan bimbingan ibadah yang sesuai sunnah.</li>
                <li className="flex gap-4"><div className="mt-1.5 w-2 h-2 rounded-full bg-[#F97316] shrink-0"></div> Menjaga amanah dan transparansi dalam setiap transaksi pembayaran.</li>
              </ul>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Keunggulan */}
      <section className="py-24 bg-[#FAFAF9]">
        <FadeIn className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold text-[#F97316] tracking-widest uppercase mb-3">Keunggulan Kami</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-[#1E3A8A]">Mengapa Memilih Al-Iqro?</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <ShieldCheck className="w-10 h-10"/>, title: "Izin Resmi & Legal", desc: "Terdaftar resmi di Kemenag RI sebagai Penyelenggara Perjalanan Ibadah Umroh (PPIU) dan Haji Khusus (PIHK)." },
              { icon: <MapPin className="w-10 h-10"/>, title: "Hotel Ring 1", desc: "Akomodasi hotel bintang 4 dan 5 yang sangat dekat dengan pelataran Masjidil Haram maupun Masjid Nabawi." },
              { icon: <Users className="w-10 h-10"/>, title: "Muthawwif Tersertifikasi", desc: "Dibimbing oleh ustadz dan muthawwif berpengalaman yang berilmu serta lulusan universitas Timur Tengah." },
              { icon: <Plane className="w-10 h-10"/>, title: "Penerbangan Direct", desc: "Bekerjasama dengan maskapai terkemuka (Saudia, Garuda) untuk penerbangan langsung tanpa transit yang melelahkan." },
              { icon: <HeartHandshake className="w-10 h-10"/>, title: "Pelayanan Sepenuh Hati", desc: "Tim penanganan bandara dan lokal di Arab Saudi yang sigap membantu segala kebutuhan fisik dan medis jamaah." },
              { icon: <Award className="w-10 h-10"/>, title: "Harga Transparan", desc: "Tidak ada biaya tersembunyi. Fasilitas yang dijanjikan sesuai dengan kenyataan yang diterima jamaah saat tiba di sana." },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center mb-6 group-hover:bg-[#F97316] group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Legalitas */}
      <section className="py-20 bg-white border-t border-gray-100">
        <FadeIn className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-[#1E3A8A] mb-10">Legalitas & Sertifikasi</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-12">
            <div className="text-left">
              <h4 className="font-bold text-gray-900 mb-2">Izin Umroh (PPIU)</h4>
              <p className="text-gray-500 font-mono bg-gray-50 px-4 py-2 rounded-lg border">Kemenag RI No. DUMMY-12345/2026</p>
            </div>
            <div className="w-px h-16 bg-gray-200 hidden md:block"></div>
            <div className="text-left">
              <h4 className="font-bold text-gray-900 mb-2">Izin Haji Khusus (PIHK)</h4>
              <p className="text-gray-500 font-mono bg-gray-50 px-4 py-2 rounded-lg border">Kemenag RI No. DUMMY-12345/2026</p>
            </div>
          </div>
          <div className="mt-12 opacity-50 grayscale flex flex-wrap justify-center gap-8">
            <span className="text-xl font-black">AMPHURI</span>
            <span className="text-xl font-black">ASITA</span>
            <span className="text-xl font-black">IATA</span>
          </div>
        </FadeIn>
      </section>
      
      {/* CTA */}
      <section className="py-20 bg-[#FAFAF9]">
        <FadeIn className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#1E3A8A] mb-6">Siap Merencanakan Perjalanan Suci Anda?</h2>
          <p className="text-gray-600 mb-10 max-w-xl mx-auto">Tim konsultan kami siap membantu Anda memilih paket yang paling sesuai dengan kebutuhan dan anggaran Anda.</p>
          <Link href="/kontak" className="inline-block bg-[#F97316] hover:bg-orange-600 text-white px-10 py-4 rounded-xl font-bold shadow-xl hover:-translate-y-1 transition-all text-lg">
            Hubungi Konsultan Kami
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}
