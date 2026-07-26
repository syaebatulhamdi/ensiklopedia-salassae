import { useEffect } from 'react'; // PERBAIKAN: Menambahkan useEffect untuk Scroll to Top
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { FiSettings, FiPackage, FiCheck, FiArrowRight } from "react-icons/fi"; // Tambahan FiArrowRight
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

export default function PraktikPupukPage() {
  
  // Tuliskan blok kode ini tepat di bagian atas dalam komponen Anda
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Array kosong [] memastikan ini hanya berjalan 1 kali saat halaman dibuka

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1, y: 0,
      transition: { delay: index * 0.15, duration: 0.6, type: "spring" }
    })
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.4 }}
      className="relative min-h-screen bg-[#f4f6f4] font-sans flex flex-col"
    >
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ delay: 0.2 }}
        className="fixed top-6 left-6 z-50"
      >
        <Link to="/edukasi" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#163627] shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-gray-50 transition-all hover:scale-110 active:scale-95 border border-gray-200">
          <FaArrowLeft className="text-sm pr-[2px]" />
        </Link>
      </motion.div>

      <div className="flex-grow max-w-4xl mx-auto px-6 sm:px-8 pt-28 w-full pb-10">
        
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#e5f0e6] rounded-full text-sm font-bold mb-6">
            <span className="w-2 h-2 rounded-full bg-[#77D301]"></span>
            <span className="text-[#163627]">Tahap 1: Persiapan</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-extrabold text-[#111827] tracking-tight mb-6">
            Alat & Bahan
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Sebelum memulai keajaiban meracik pupuk alami, pastikan semua "senjata" dan "amunisi" di bawah ini sudah tersedia di sekitar Anda.
          </motion.p>
        </div>

        <motion.div initial="hidden" animate="visible" custom={1} variants={cardVariants} className="mb-12 bg-white rounded-[2rem] p-6 sm:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-200">
              <FiSettings className="w-6 h-6 text-gray-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Alat Kerja</h2>
              <p className="text-gray-500 text-sm mt-1">Peralatan dasar yang mudah ditemukan.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Drum atau Ember besar (dengan tutup rapat)",
              "Parang atau alat pencacah",
              "Terpal plastik alas pencampuran",
              "Sarung tangan karet (opsional)",
              "Pengaduk kayu panjang"
            ].map((alat, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <FiCheck className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <span className="text-gray-700 font-medium">{alat}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial="hidden" animate="visible" custom={2} variants={cardVariants} className="mb-16 bg-white rounded-[2rem] p-6 sm:p-10 shadow-[0_8px_30px_rgba(119,211,1,0.06)] border border-[#77D301]/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#77D301]/10 to-transparent rounded-bl-full z-0"></div>
          
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100 relative z-10">
            <div className="w-14 h-14 bg-[#f0fdf4] rounded-2xl flex items-center justify-center border border-[#77D301]/30">
              <FiPackage className="w-6 h-6 text-[#77D301]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#163627]">Bahan Baku</h2>
              <p className="text-gray-500 text-sm mt-1">Bahan organik yang menjadi inti pupuk.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
            {[
              "Bahan Hijau (Daun gamal, sisa sayur dll) - 1 Bagian",
              "Bahan Cokelat (Sekam, jerami, dedaunan kering) - 1 Bagian",
              "Kotoran Ternak (Sapi/Kambing/Ayam) - 1 Bagian",
              "Cairan Dekomposer (EM4 Pertanian atau MOL buatan sendiri)",
              "Gula Merah / Tetes Tebu (Molase)",
              "Air Bersih (Sumur/Sungai, bukan air kaporit)"
            ].map((bahan, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-[#f4f6f4]/50 border border-[#163627]/5 rounded-xl">
                <FiCheck className="w-5 h-5 text-[#77D301] shrink-0 mt-0.5" />
                <span className="text-[#163627] font-medium leading-relaxed">{bahan}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* --- PANGGILAN BERTINDAK (CTA): TOMBOL MENUJU HALAMAN PRAKTIK --- */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="w-full flex justify-center pt-8">
          {/* PERBAIKAN: rounded-full menjadi rounded-2xl dan h-14 untuk desain GEPENG. to="/langkah-pembuatan" */}
          <Link 
            to="/langkah-pembuatan" 
            className="flex w-full md:w-max items-center justify-center gap-4 bg-[#163627] text-white font-bold text-lg h-14 px-10 rounded-2xl hover:bg-black transition-all shadow-xl hover:scale-105 active:scale-95 duration-200"
          >
            <span>Mulai Praktik Pembuatan</span>
            <FiArrowRight className="text-xl" />
          </Link>
        </motion.div>

      </div>
      
      <Footer />
      
    </motion.div>
  );
}