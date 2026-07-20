"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { logout } from "@/app/actions/auth";
import { addPackage, deletePackage, updatePackage } from "@/app/actions/packages";
import { addArticle, deleteArticle, updateArticle } from "@/app/actions/articles";

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

interface Article {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"paket" | "artikel">("paket");

  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);

  const [packageFormData, setPackageFormData] = useState({
    title: "",
    category: "Umroh",
    price_idr: "",
    duration_days: "",
    airline: "",
    hotel_makkah_rating: "",
    hotel_madinah_rating: "",
    muthawwif_name: "",
    departure_month: "",
    image_url: "",
  });

  const [articleFormData, setArticleFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    content: "",
  });

  const fetchData = async () => {
    setIsLoading(true);
    if (activeTab === "paket") {
      const { data, error } = await supabase
        .from("travel_packages")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error) setPackages(data || []);
    } else {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error) setArticles(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handlePackageInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPackageFormData({ ...packageFormData, [e.target.name]: e.target.value });
  };

  const handleArticleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setArticleFormData({ ...articleFormData, [e.target.name]: e.target.value });
  };

  const handlePackageDelete = async (id: string, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus paket "${title}"?`)) {
      const result = await deletePackage(id);
      if (result.success) {
        alert("Paket berhasil dihapus!");
        fetchData();
      } else {
        alert("Gagal menghapus paket: " + result.error);
      }
    }
  };

  const handleArticleDelete = async (id: string, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus artikel "${title}"?`)) {
      const result = await deleteArticle(id);
      if (result.success) {
        alert("Artikel berhasil dihapus!");
        fetchData();
      } else {
        alert("Gagal menghapus artikel: " + result.error);
      }
    }
  };

  const handleEditPackageClick = (pkg: TravelPackage) => {
    setEditingPackageId(pkg.id);
    setPackageFormData({
      title: pkg.title,
      category: pkg.category,
      price_idr: pkg.price_idr.toString(),
      duration_days: pkg.duration_days.toString(),
      airline: pkg.airline || "",
      hotel_makkah_rating: pkg.hotel_makkah_rating ? pkg.hotel_makkah_rating.toString() : "",
      hotel_madinah_rating: pkg.hotel_madinah_rating ? pkg.hotel_madinah_rating.toString() : "",
      muthawwif_name: pkg.muthawwif_name || "",
      departure_month: pkg.departure_month || "",
      image_url: pkg.image_url || "",
    });
    setIsPackageModalOpen(true);
  };

  const handleEditArticleClick = (art: Article) => {
    setEditingArticleId(art.id);
    setArticleFormData({
      title: art.title,
      description: art.description,
      image_url: art.image_url,
      content: (art as any).content || "", // Include content if fetched
    });
    setIsArticleModalOpen(true);
  };

  const handlePackageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newPackage = {
      title: packageFormData.title,
      category: packageFormData.category,
      price_idr: parseInt(packageFormData.price_idr),
      duration_days: parseInt(packageFormData.duration_days),
      airline: packageFormData.airline || null,
      hotel_makkah_rating: packageFormData.hotel_makkah_rating ? parseInt(packageFormData.hotel_makkah_rating) : null,
      hotel_madinah_rating: packageFormData.hotel_madinah_rating ? parseInt(packageFormData.hotel_madinah_rating) : null,
      muthawwif_name: packageFormData.muthawwif_name || null,
      departure_month: packageFormData.departure_month || null,
      image_url: packageFormData.image_url || null,
    };

    let result;
    if (editingPackageId) {
      result = await updatePackage(editingPackageId, newPackage);
    } else {
      result = await addPackage(newPackage);
    }
    
    setIsSubmitting(false);

    if (!result.success) {
      alert(`Gagal ${editingPackageId ? 'menyimpan' : 'menambahkan'} paket: ` + result.error);
    } else {
      alert(`Paket berhasil ${editingPackageId ? 'disimpan' : 'ditambahkan'}!`);
      setIsPackageModalOpen(false);
      setEditingPackageId(null);
      setPackageFormData({
        title: "", category: "Umroh", price_idr: "", duration_days: "", airline: "",
        hotel_makkah_rating: "", hotel_madinah_rating: "", muthawwif_name: "",
        departure_month: "", image_url: "",
      });
      fetchData();
    }
  };

  const handleArticleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let result;
    if (editingArticleId) {
      result = await updateArticle(editingArticleId, articleFormData);
    } else {
      result = await addArticle(articleFormData);
    }
    
    setIsSubmitting(false);

    if (!result.success) {
      alert(`Gagal ${editingArticleId ? 'menyimpan' : 'menambahkan'} artikel: ` + result.error);
    } else {
      alert(`Artikel berhasil ${editingArticleId ? 'disimpan' : 'ditambahkan'}!`);
      setIsArticleModalOpen(false);
      setEditingArticleId(null);
      setArticleFormData({ title: "", description: "", image_url: "", content: "" });
      fetchData();
    }
  };

  return (
    <div className="container mx-auto px-4 pt-28 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1E3A8A]">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Kelola data website Al-Iqro Travel.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => logout()}
            className="bg-red-50 hover:bg-red-100 text-red-600 px-5 py-2.5 rounded-xl font-medium transition-colors whitespace-nowrap border border-red-200"
          >
            Logout
          </button>
          {activeTab === "paket" ? (
            <button onClick={() => {
              setEditingPackageId(null);
              setPackageFormData({
                title: "", category: "Umroh", price_idr: "", duration_days: "", airline: "",
                hotel_makkah_rating: "", hotel_madinah_rating: "", muthawwif_name: "",
                departure_month: "", image_url: "",
              });
              setIsPackageModalOpen(true);
            }} className="bg-[#F97316] hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-md transition-colors whitespace-nowrap">
              + Tambah Paket
            </button>
          ) : (
            <button onClick={() => {
              setEditingArticleId(null);
              setArticleFormData({ title: "", description: "", image_url: "", content: "" });
              setIsArticleModalOpen(true);
            }} className="bg-[#1E3A8A] hover:bg-blue-900 text-white px-5 py-2.5 rounded-xl font-medium shadow-md transition-colors whitespace-nowrap">
              + Tambah Artikel
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("paket")}
          className={`py-3 px-6 font-medium text-sm transition-colors border-b-2 ${activeTab === "paket" ? "border-[#F97316] text-[#F97316]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          Paket Perjalanan
        </button>
        <button
          onClick={() => setActiveTab("artikel")}
          className={`py-3 px-6 font-medium text-sm transition-colors border-b-2 ${activeTab === "artikel" ? "border-[#F97316] text-[#F97316]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          Artikel & Panduan
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          {activeTab === "paket" ? (
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-50 border-b text-sm font-medium text-gray-500">
                  <th className="p-4">Paket</th>
                  <th className="p-4">Kategori</th>
                  <th className="p-4">Harga (IDR)</th>
                  <th className="p-4">Durasi & Maskapai</th>
                  <th className="p-4">Berangkat</th>
                  <th className="p-4">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr><td colSpan={6} className="p-8 text-center text-gray-500">Memuat data...</td></tr>
                ) : packages.length === 0 ? (
                  <tr><td colSpan={6} className="p-8 text-center text-gray-500">Belum ada data paket.</td></tr>
                ) : (
                  packages.map((pkg) => (
                    <tr key={pkg.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="font-semibold text-gray-800">{pkg.title}</div>
                        <div className="text-xs text-gray-500 mt-1">Pembimbing: {pkg.muthawwif_name || "-"}</div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
                          pkg.category === 'Umroh' ? 'bg-blue-100 text-blue-700' : 
                          pkg.category === 'Haji' ? 'bg-amber-100 text-amber-700' : 
                          'bg-green-100 text-green-700'
                        }`}>
                          {pkg.category}
                        </span>
                      </td>
                      <td className="p-4 font-medium text-gray-700">Rp {pkg.price_idr.toLocaleString('id-ID')}</td>
                      <td className="p-4 text-sm text-gray-600">
                        <div>{pkg.duration_days} Hari</div>
                        <div className="text-xs text-gray-400 mt-0.5">{pkg.airline || "-"}</div>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{pkg.departure_month || "-"}</td>
                      <td className="p-4">
                        <button onClick={() => handleEditPackageClick(pkg)} className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">Edit</button>
                        <button onClick={() => handlePackageDelete(pkg.id, pkg.title)} className="text-red-500 hover:text-red-700 text-sm font-medium">Hapus</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-50 border-b text-sm font-medium text-gray-500">
                  <th className="p-4 w-1/4">Judul Artikel</th>
                  <th className="p-4 w-1/2">Deskripsi Singkat</th>
                  <th className="p-4">Tanggal Dibuat</th>
                  <th className="p-4">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr><td colSpan={4} className="p-8 text-center text-gray-500">Memuat data...</td></tr>
                ) : articles.length === 0 ? (
                  <tr><td colSpan={4} className="p-8 text-center text-gray-500">Belum ada data artikel.</td></tr>
                ) : (
                  articles.map((art) => (
                    <tr key={art.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="font-semibold text-gray-800">{art.title}</div>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{art.description}</td>
                      <td className="p-4 text-sm text-gray-600">{new Date(art.created_at).toLocaleDateString("id-ID")}</td>
                      <td className="p-4">
                        <button onClick={() => handleEditArticleClick(art)} className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">Edit</button>
                        <button onClick={() => handleArticleDelete(art.id, art.title)} className="text-red-500 hover:text-red-700 text-sm font-medium">Hapus</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Package Modal */}
      {isPackageModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60] overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl my-8">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-[#1E3A8A]">{editingPackageId ? "Edit Paket" : "Tambah Paket Baru"}</h2>
              <button onClick={() => setIsPackageModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>
            <form onSubmit={handlePackageSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Paket *</label>
                  <input required type="text" name="title" value={packageFormData.title} onChange={handlePackageInputChange} className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#F97316]/50" placeholder="Contoh: Umroh Reguler Bintang 5" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategori *</label>
                  <select required name="category" value={packageFormData.category} onChange={handlePackageInputChange} className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#F97316]/50">
                    <option value="Umroh">Umroh</option>
                    <option value="Haji">Haji</option>
                    <option value="Wisata">Wisata</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Harga (IDR) *</label>
                  <input required type="number" name="price_idr" value={packageFormData.price_idr} onChange={handlePackageInputChange} className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#F97316]/50" placeholder="Contoh: 35000000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Durasi (Hari) *</label>
                  <input required type="number" name="duration_days" value={packageFormData.duration_days} onChange={handlePackageInputChange} className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#F97316]/50" placeholder="Contoh: 9" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Maskapai</label>
                  <input type="text" name="airline" value={packageFormData.airline} onChange={handlePackageInputChange} className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#F97316]/50" placeholder="Contoh: Saudia Airlines" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating Hotel Makkah (1-5)</label>
                  <input type="number" min="1" max="5" name="hotel_makkah_rating" value={packageFormData.hotel_makkah_rating} onChange={handlePackageInputChange} className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#F97316]/50" placeholder="Contoh: 5" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating Hotel Madinah (1-5)</label>
                  <input type="number" min="1" max="5" name="hotel_madinah_rating" value={packageFormData.hotel_madinah_rating} onChange={handlePackageInputChange} className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#F97316]/50" placeholder="Contoh: 5" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bulan Keberangkatan</label>
                  <input type="text" name="departure_month" value={packageFormData.departure_month} onChange={handlePackageInputChange} className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#F97316]/50" placeholder="Contoh: Oktober 2026" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Muthawwif</label>
                  <input type="text" name="muthawwif_name" value={packageFormData.muthawwif_name} onChange={handlePackageInputChange} className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#F97316]/50" placeholder="Contoh: Ustadz Fulan" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar (Thumbnail)</label>
                  <input type="text" name="image_url" value={packageFormData.image_url} onChange={handlePackageInputChange} className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#F97316]/50" placeholder="Contoh: https://images.unsplash.com/photo-..." />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setIsPackageModalOpen(false)} className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-xl font-medium transition-colors">Batal</button>
                <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 bg-[#F97316] hover:bg-orange-600 text-white rounded-xl font-medium shadow-md transition-colors disabled:opacity-50 flex items-center gap-2">
                  {isSubmitting && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                  {isSubmitting ? "Menyimpan..." : "Simpan Paket"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Article Modal */}
      {isArticleModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[60] overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl my-8">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-[#1E3A8A]">{editingArticleId ? "Edit Artikel" : "Tambah Artikel Baru"}</h2>
              <button onClick={() => setIsArticleModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>
            <form onSubmit={handleArticleSubmit} className="p-6">
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Judul Artikel *</label>
                  <input required type="text" name="title" value={articleFormData.title} onChange={handleArticleInputChange} className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#F97316]/50" placeholder="Contoh: Tata Cara Pelaksanaan Umroh" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Singkat *</label>
                  <textarea required name="description" value={articleFormData.description} onChange={handleArticleInputChange} className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#F97316]/50 h-24" placeholder="Ringkasan isi artikel..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar (Thumbnail) *</label>
                  <input required type="text" name="image_url" value={articleFormData.image_url} onChange={handleArticleInputChange} className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#F97316]/50" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Isi Artikel Lengkap (Content) *</label>
                  <textarea required name="content" value={articleFormData.content} onChange={handleArticleInputChange} className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#F97316]/50 h-48" placeholder="Bisa menggunakan tag HTML sederhana (seperti <p>, <strong>, dsb)..." />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => setIsArticleModalOpen(false)} className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-xl font-medium transition-colors">Batal</button>
                <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 bg-[#1E3A8A] hover:bg-blue-900 text-white rounded-xl font-medium shadow-md transition-colors disabled:opacity-50 flex items-center gap-2">
                  {isSubmitting && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                  {isSubmitting ? "Menyimpan..." : "Simpan Artikel"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
