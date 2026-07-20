\# Application Context \& Architecture: Al-Iqro Travel



\## 1. Deskripsi Proyek

Membangun \*website company profile\* sekaligus katalog \*booking\* terintegrasi untuk agensi travel Umroh \& Haji Premium. Proyek ini menggunakan arsitektur \*Full-Stack\* (Frontend untuk audiens, Backend Supabase untuk manajemen admin).



\## 2. Struktur Halaman \& Navigasi (Sitemap)

\* `/` (Home/Landing Page) -> Berisi \*Hero section\*, \*Search/Filter Bar\*, \*Highlight\* Paket, Testimoni, dan \*Footer\* Kemenag.

\* `/umroh` -> Halaman khusus daftar paket Umroh.

\* `/haji` -> Halaman khusus daftar paket Haji Plus.

\* `/wisata-halal` -> Halaman khusus daftar paket Wisata Halal.

\* `/artikel` -> (Dummy) Halaman blog dan edukasi manasik.

\* `/kontak` -> Halaman form konsultasi dan info lokasi kantor.

\* `/admin/dashboard` -> (Private Route) Halaman CMS rahasia untuk CRUD (Create, Read, Update, Delete) paket secara manual.



\## 3. Skema Database (Supabase)

Tabel utama yang dibutuhkan: `travel\_packages`

\* `id` (UUID, Primary Key)

\* `title` (String) -> Contoh: "Umroh Reguler Bintang 5"

\* `category` (String) -> Enum: 'Umroh', 'Haji', 'Wisata'

\* `price\_idr` (Integer) -> Harga dalam Rupiah (IDR).

\* `duration\_days` (Integer) -> Durasi perjalanan (misal: 9, 12).

\* `airline` (String) -> Nama maskapai penerbangan.

\* `hotel\_makkah\_rating` (Integer) -> Skala 1-5.

\* `hotel\_madinah\_rating` (Integer) -> Skala 1-5.

\* `muthawwif\_name` (String) -> Nama pembimbing.

\* `departure\_month` (String) -> Bulan keberangkatan (misal: "Oktober 2026").

\* `image\_url` (String) -> URL \*thumbnail\* gambar paket.



\## 4. Alur Konversi Bisnis (Hybrid System)

\* \*\*Primary CTA (Floating WhatsApp):\*\* Tombol WhatsApp \*floating\* yang selalu ada di pojok kanan bawah setiap halaman. Saat diklik, \*user\* diarahkan ke WA dengan pesan otomatis: "Halo Al-Iqro Travel, saya ingin berkonsultasi mengenai..."

\* \*\*Secondary CTA (Form Konsultasi):\*\* Terletak di halaman `/kontak`, di mana jamaah bisa mengisi Nama, No. WhatsApp, Kategori Paket, dan Pesan, yang mana datanya akan dikirimkan ke admin.



\## 5. Fitur Dummy Tambahan (Untuk Prototype)

\* \*\*Edukasi \& Legalitas:\*\* \*Footer\* wajib menampilkan \*dummy\* Nomor Izin Kemenag RI dan logo asosiasi penyelenggara travel.

\* \*\*Informasi Jamaah:\*\* Tersedia \*section dummy\* yang menampilkan profil pembimbing (Muthawwif), daftar ceklis dokumen (Paspor, dll), dan daftar perlengkapan gratis yang didapat (Koper, Kain Ihram).



\## 6. Sistem Filter

Pencarian paket di beranda harus sangat simpel, hanya mengandalkan tiga parameter:

1\. Kategori (Umroh / Haji / Wisata Halal)

2\. Bulan Keberangkatan

3\. Rentang Harga (IDR)

