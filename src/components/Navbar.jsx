import { Link } from 'react-router-dom';
import { FiMenu, FiGrid } from 'react-icons/fi';

export default function Navbar() {
  return (
    // Memposisikan navbar mutlak di atas agar mengambang di atas gambar latar
    <nav className="absolute top-0 left-0 w-full z-50">
      
      {/* Warna bg-[#163627] dan lengkungan rounded-b-[2rem] yang senada dengan footer */}
      <div className="bg-[#163627] rounded-b-[2rem] px-6 sm:px-8 md:px-12 py-4 flex items-center justify-between shadow-xl">
        
        {/* BAGIAN KIRI: Tombol Hijau Muda (Sesuai referensi gambar Anda) */}
        <div className="flex items-center">
          <Link 
            to="/edukasi" 
            className="bg-[#77D301] text-[#163627] font-bold px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-[#88e60d] transition-colors shadow-md"
          >
            <FiGrid className="text-lg" />
            <span className="text-sm md:text-base">Mulai Belajar</span>
          </Link>
        </div>

        {/* BAGIAN KANAN: Menu Teks (Tersembunyi di HP, Tampil di PC) */}
        <div className="hidden md:flex items-center gap-8 text-white font-medium text-sm">
          <Link to="/" className="hover:text-[#77D301] transition-colors">Beranda</Link>
          <Link to="/edukasi" className="hover:text-[#77D301] transition-colors">Edukasi</Link>
          <Link to="/praktik-pupuk" className="hover:text-[#77D301] transition-colors">Praktik</Link>
          <Link to="#" className="hover:text-[#77D301] transition-colors">Kontak</Link>
        </div>

        {/* Ikon Menu Hamburger untuk Tampilan Mobile (HP) */}
        <div className="md:hidden text-white text-2xl cursor-pointer hover:text-[#77D301] transition-colors">
          <FiMenu />
        </div>

      </div>
    </nav>
  );
}