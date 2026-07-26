// import bgSawahan from '../assets/sawahan.jpg'; 
import { FiArrowRight } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.4 }}
      className="relative h-screen w-full bg-[#163627] flex flex-col overflow-hidden font-sans"
    >
      
      <img src="https://picsum.photos/1920/1080?nature" alt="Latar Belakang Desa" className="absolute inset-0 w-full h-full object-cover z-0" />
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* --- KELOMPOK KONTEN: TIPOGRAFI & TOMBOL --- */}
      {/* Menambahkan justify-center agar konten berada di tengah layar secara vertikal */}
      <div className="relative z-20 px-6 sm:px-12 md:px-20 h-full flex flex-col justify-center">
        
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.2] tracking-tight drop-shadow-md">
          Panen <span className="text-[#77D301]">Kemurnian Alam.</span> <br />
          Bangun <span className="text-[#77D301]">Kemandirian </span> <br />
          dari Desa Salassae.
        </motion.h1>
        
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} className="mt-6 text-gray-300 text-base md:text-lg font-normal leading-relaxed max-w-xl">
          Panduan digital pertanian alami dan peternakan terintegrasi. Pelajari cara meracik pupuk organik dan pakan ternak secara mandiri.
        </motion.p>

        {/* TOMBOL DIPINDAHKAN KE SINI (Di bawah teks persis seperti referensi) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }} className="mt-10">
          <Link 
            to="/edukasi" 
            // Perubahan utama: inline-flex, w-max, dan gap-6 agar proporsional
            className="group inline-flex w-max items-center justify-between gap-6 bg-white text-[#000000] font-bold text-base md:text-lg py-2 pl-8 pr-2 rounded-full hover:bg-gray-100 transition-all shadow-lg active:scale-95 duration-200"
          >
            <span>Lihat Selengkapnya</span>
            
            <div className="w-12 h-12 bg-[#000000] group-hover:bg-black rounded-full flex items-center justify-center text-white transition-colors shadow-md shrink-0">
              <FiArrowRight className="text-xl group-hover:scale-110 transition-transform duration-300" />
            </div>
          </Link>
        </motion.div>

      </div>
      
    </motion.div>
  )
}