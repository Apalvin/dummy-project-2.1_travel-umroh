"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export default function KontakPage() {
  const [nama, setNama] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [layanan, setLayanan] = useState("Konsultasi Umroh");
  const [pesan, setPesan] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nama.trim() || !whatsapp.trim() || !pesan.trim()) {
      alert("Mohon lengkapi kolom Nama Lengkap, Nomor WhatsApp, dan Pesan Anda.");
      return;
    }

    const messageText = 
      `Halo Al-Iqro Travel,\n\n` +
      `Saya ingin mengajukan pertanyaan / konsultasi:\n\n` +
      `👤 *Nama Lengkap:* ${nama.trim()}\n` +
      `📱 *Nomor WhatsApp:* ${whatsapp.trim()}\n` +
      `✉️ *Email:* ${email.trim() || "-"}\n` +
      `📌 *Layanan yang Diminati:* ${layanan}\n` +
      `💬 *Pesan:* ${pesan.trim()}`;

    const targetNumber = "6285150688320";
    const waUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(messageText)}`;
    
    window.open(waUrl, "_blank");
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#FAFAF9]">
      <div className="container mx-auto px-4">
        
        <FadeIn className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E3A8A] mb-4">Hubungi Kami</h1>
          <p className="text-gray-600 text-lg">
            Ada pertanyaan tentang paket Umroh, Haji, atau Wisata Halal? Tim kami siap membantu Anda dengan layanan responsif.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="bg-[#1E3A8A] rounded-3xl p-10 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#F97316]/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-8">Informasi Kontak</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="bg-white/10 p-3 rounded-xl">
                    <MapPin className="w-6 h-6 text-[#F97316]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Kantor Pusat</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Graha Al-Iqro Travel lt. 2<br />
                      Jl. M.H. Thamrin No.10, Jakarta Pusat<br />
                      DKI Jakarta, 10230
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="bg-white/10 p-3 rounded-xl">
                    <Phone className="w-6 h-6 text-[#F97316]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Telepon & WhatsApp</h3>
                    <p className="text-gray-300 leading-relaxed">
                      +62 851-5068-8320 (Customer Service)<br />
                      021 - 555 1234 (Hotline)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="bg-white/10 p-3 rounded-xl">
                    <Mail className="w-6 h-6 text-[#F97316]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-gray-300 leading-relaxed">
                      info@aliqrotravel.com<br />
                      support@aliqrotravel.com
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-sm text-gray-400">Jam Operasional:</p>
                <p className="font-medium text-white">Senin - Sabtu (08:00 - 17:00 WIB)</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-8">Kirim Pesan Langsung</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Lengkap *</label>
                  <input 
                    type="text" 
                    required
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 outline-none transition-all" 
                    placeholder="Masukkan nama Anda" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor WhatsApp *</label>
                  <input 
                    type="tel" 
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 outline-none transition-all" 
                    placeholder="0851-5068-8320" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 outline-none transition-all" 
                  placeholder="email@contoh.com" 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Layanan yang Diminati</label>
                <select 
                  value={layanan}
                  onChange={(e) => setLayanan(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 outline-none transition-all bg-white"
                >
                  <option>Konsultasi Umroh</option>
                  <option>Konsultasi Haji Plus</option>
                  <option>Wisata Halal</option>
                  <option>Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pesan Anda *</label>
                <textarea 
                  rows={4} 
                  required
                  value={pesan}
                  onChange={(e) => setPesan(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 outline-none transition-all resize-none" 
                  placeholder="Tuliskan pertanyaan atau kebutuhan Anda di sini..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#F97316] hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                Kirim Pesan ke WhatsApp <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
