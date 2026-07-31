import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { 
  FiWind, FiSun, FiDroplet, FiRefreshCcw, FiTrendingUp, FiShield, 
  FiChevronLeft, FiChevronRight, FiAlertOctagon, FiX, FiCheck, FiCheckCircle,
  FiArrowUpRight, FiPackage
} from "react-icons/fi";
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';

export default function EdukasiPage() {
  const carouselRef = useRef(null);
  const navContainerRef = useRef(null);
  
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  const [activeSection, setActiveSection] = useState('filosofi');

  // ================= LOGIKA AUTO-SCROLL CAROUSEL =================
  const autoScrollDirection = useRef('right');
  const autoScrollInterval = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const startAutoScroll = () => {
      autoScrollInterval.current = setInterval(() => {
        if (!carousel) return;
        
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        
        if (carousel.scrollLeft >= maxScroll - 5) {
          autoScrollDirection.current = 'left';
        } else if (carousel.scrollLeft <= 5) {
          autoScrollDirection.current = 'right';
        }

        const scrollAmount = carousel.clientWidth * 0.8;
        
        carousel.scrollBy({
          left: autoScrollDirection.current === 'right' ? scrollAmount : -scrollAmount,
          behavior: 'smooth' 
        });

      }, 3000); 
    };

    startAutoScroll();

    const pauseScroll = () => clearInterval(autoScrollInterval.current);
    const resumeScroll = () => startAutoScroll();

    carousel.addEventListener('mouseenter', pauseScroll);
    carousel.addEventListener('mouseleave', resumeScroll);
    carousel.addEventListener('touchstart', pauseScroll, { passive: true });
    carousel.addEventListener('touchend', resumeScroll);

    return () => {
      clearInterval(autoScrollInterval.current);
      carousel.removeEventListener('mouseenter', pauseScroll);
      carousel.removeEventListener('mouseleave', resumeScroll);
      carousel.removeEventListener('touchstart', pauseScroll);
      carousel.removeEventListener('touchend', resumeScroll);
    };
  }, []);
  // ========================================================

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    const checkScrollPosition = () => {
      if (carousel) {
        const { scrollLeft, scrollWidth, clientWidth } = carousel;
        setCanScrollLeft(scrollLeft > 2);
        setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);
      }
    };
    if (carousel) {
      checkScrollPosition(); 
      carousel.addEventListener('scroll', checkScrollPosition); 
      window.addEventListener('resize', checkScrollPosition); 
      return () => {
        carousel.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: "-20% 0px -70% 0px" }); 

    const sections = document.querySelectorAll("section[id]");
    sections.forEach(sec => observer.observe(sec));

    return () => sections.forEach(sec => observer.unobserve(sec));
  }, []);

  // AUTO-SCROLL CHIPS
  useEffect(() => {
    const container = navContainerRef.current;
    const activeChip = document.getElementById(`nav-chip-${activeSection}`);
    
    if (container && activeChip) {
      const scrollLeft = activeChip.offsetLeft - container.offsetWidth / 2 + activeChip.offsetWidth / 2;
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }, [activeSection]);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index) => ({
      opacity: 1, y: 0,
      transition: { delay: index * 0.15, duration: 0.6, type: "spring" }
    })
  };

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth' 
      });
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 90; 
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'filosofi', label: 'Filosofi' },
    { id: 'manfaat', label: 'Manfaat' },
    { id: 'komparasi', label: 'Perbandingan' },
    { id: 'bahan', label: 'Bahan Baku' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.4 }}
      className="relative min-h-screen font-sans" 
    >
      
      {/* ================= BILAH NAVIGASI ================= */}
      <div className="sticky top-0 z-40 bg-[#E9F5E1]/95 backdrop-blur-md pt-5 pb-4 md:py-4 px-6 sm:px-8 border-b border-[#79CF02]/10 shadow-[0_4px_10px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto w-full flex items-center relative">
          
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, type: "spring" }} className="shrink-0 mr-4 md:mr-0 md:absolute md:left-0 z-20">
            <Link to="/" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#111827] shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:bg-[#79CF02] hover:text-[#111827] transition-all hover:scale-110 active:scale-95 border border-white focus:outline-none" style={{ WebkitTapHighlightColor: 'transparent' }}>
              <FaArrowLeft className="text-sm pr-[2px]" />
            </Link>
          </motion.div>
          
          <div 
            ref={navContainerRef}
            className="flex gap-2.5 overflow-x-auto w-full md:justify-center snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-2 scroll-smooth relative"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-chip-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className={`snap-start shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 focus:outline-none ${
                  activeSection === item.id
                    ? 'bg-[#79CF02] text-[#111827] shadow-md'
                    : 'bg-white text-gray-600 border border-[#79CF02]/20 shadow-sm hover:border-[#79CF02]/50 hover:text-[#111827]'
                }`}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {item.label}
              </button>
            ))}
          </div>
          
        </div>
      </div>
      {/* ================================================== */}

      {/* ================= BAGIAN 1: PENGANTAR ================= */}
      <div className="bg-[#E9F5E1] pt-12 md:pt-16 pb-20 overflow-hidden">
        
        <div className="px-6 sm:px-8 max-w-7xl mx-auto">
          <section id="filosofi" className="scroll-mt-24 max-w-4xl mx-auto flex flex-col items-center text-center">
            
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#79CF02]/15 rounded-full text-xs md:text-sm font-bold text-[#559400] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#79CF02]"></span>
                Tentang Filosofi Kami
              </div>
            </motion.div>

            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-[#111827] tracking-tight leading-[1.15] mb-6">
              Membangun Kemandirian Desa <br className="hidden md:block" /> Melalui <span className="text-[#79CF02]">Pertanian Selaras Alam</span>
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              Di Desa Salassae, kami percaya bahwa pertanian sejati bukan sekadar tentang memanen hasil bumi, melainkan memelihara kehidupan di dalamnya. Dengan memadukan kebijaksanaan leluhur dan pendekatan ekologis modern, kami berupaya mengembalikan kesuburan tanah tanpa bergantung pada bahan kimia buatan. Gerakan ini dirancang untuk menciptakan ketahanan pangan yang mandiri, melestarikan alam, dan memberikan dampak kesejahteraan yang nyata bagi komunitas petani kita.
            </motion.p>
            
          </section>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="w-full relative group mt-16">
          <AnimatePresence>
            {canScrollLeft && (
              <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={() => scrollCarousel('left')} className="absolute left-4 md:left-8 top-[45%] -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#111827] shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:bg-[#79CF02] hover:scale-110 active:scale-95 transition-all border border-gray-200 focus:outline-none">
                <FiChevronLeft className="text-2xl pr-[2px]" />
              </motion.button>
            )}
          </AnimatePresence>
          
          <div ref={carouselRef} className="flex gap-4 md:gap-6 overflow-x-auto pb-6 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-6 md:px-12 snap-x snap-mandatory">
            <div className="snap-center shrink-0 w-[85%] sm:w-[60%] md:w-[35%] lg:w-[28%] aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.08)] bg-gray-200">
              <img src="https://picsum.photos/800/600?random=1" alt="Galeri Salassae 1" className="w-full h-full object-cover" />
            </div>
            <div className="snap-center shrink-0 w-[85%] sm:w-[60%] md:w-[35%] lg:w-[28%] aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.08)] bg-gray-200">
              <img src="https://picsum.photos/800/600?random=2" alt="Galeri Salassae 2" className="w-full h-full object-cover" />
            </div>
            <div className="snap-center shrink-0 w-[85%] sm:w-[60%] md:w-[35%] lg:w-[28%] aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.08)] bg-gray-200">
              <img src="https://picsum.photos/800/600?random=3" alt="Galeri Salassae 3" className="w-full h-full object-cover" />
            </div>
            <div className="snap-center shrink-0 w-[85%] sm:w-[60%] md:w-[35%] lg:w-[28%] aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.08)] bg-gray-200">
              <img src="https://picsum.photos/800/600?random=4" alt="Galeri Salassae 4" className="w-full h-full object-cover" />
            </div>
            <div className="snap-center shrink-0 w-[85%] sm:w-[60%] md:w-[35%] lg:w-[28%] aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.08)] bg-gray-200">
              <img src="https://picsum.photos/800/600?random=5" alt="Galeri Salassae 5" className="w-full h-full object-cover" />
            </div>
          </div>

          <AnimatePresence>
            {canScrollRight && (
              <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={() => scrollCarousel('right')} className="absolute right-4 md:right-8 top-[45%] -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#111827] shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:bg-[#79CF02] hover:scale-110 active:scale-95 transition-all border border-gray-200 focus:outline-none">
                <FiChevronRight className="text-2xl pl-[2px]" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

      </div>


      {/* ================= BAGIAN 2: MANFAAT ================= */}
      <div className="w-full bg-[#FFFFFF] py-16 lg:py-24">
        <div className="px-6 sm:px-8 max-w-7xl mx-auto">
          <section id="manfaat" className="scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={0} variants={cardVariants} className="md:w-[45%]">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f0fdf4] rounded-full text-sm font-semibold mb-5 border border-[#79CF02]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#79CF02]"></span>
                  <span className="text-[#111827]">Kenapa Kami?</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight leading-[1.15]">
                  Mengapa Memilih <br className="hidden md:block" /> Pertanian Alami?
                </h3>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={1} variants={cardVariants} className="md:w-[55%] md:pl-8 lg:pl-16">
                <p className="text-gray-500 text-base md:text-lg leading-relaxed font-normal">
                  Menyatukan kearifan lokal dan keberlanjutan ekosistem ke dalam satu pendekatan cerdas yang dirancang khusus untuk menciptakan kemandirian petani.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
              <motion.div custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cardVariants} className="flex flex-col items-start">
                <div className="w-12 h-12 bg-[#E9F5E1] rounded-full flex items-center justify-center mb-5 border border-[#79CF02]/20">
                  <FiRefreshCcw className="w-5 h-5 text-[#559400]" />
                </div>
                <h4 className="text-xl font-bold text-[#111827] mb-3">Pemulihan Ekologi</h4>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                  Mengembalikan cacing, jamur baik, dan mikroba yang selama ini mati akibat pestisida untuk tanah yang sehat.
                </p>
              </motion.div>
              <motion.div custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cardVariants} className="flex flex-col items-start">
                <div className="w-12 h-12 bg-[#E9F5E1] rounded-full flex items-center justify-center mb-5 border border-[#79CF02]/20">
                  <FiTrendingUp className="w-5 h-5 text-[#559400]" />
                </div>
                <h4 className="text-xl font-bold text-[#111827] mb-3">Kemandirian Ekonomi</h4>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                  Gunakan sumber daya sekitar untuk menekan biaya produksi dan memaksimalkan nilai jual hasil panen.
                </p>
              </motion.div>
              <motion.div custom={4} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cardVariants} className="flex flex-col items-start">
                <div className="w-12 h-12 bg-[#E9F5E1] rounded-full flex items-center justify-center mb-5 border border-[#79CF02]/20">
                  <FiShield className="w-5 h-5 text-[#559400]" />
                </div>
                <h4 className="text-xl font-bold text-[#111827] mb-3">Kesehatan Terjaga</h4>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                  Menghasilkan produk pangan yang murni, bebas dari residu kimia beracun, dengan nilai gizi yang jauh lebih tinggi.
                </p>
              </motion.div>
            </div>
          </section>
        </div>
      </div>


      {/* ================= BAGIAN 3: KOMPARASI ================= */}
      <div className="w-full bg-[#F7F8FA] py-16 lg:py-24">
        <div className="px-6 sm:px-8 max-w-7xl mx-auto">
          <section id="komparasi" className="scroll-mt-24">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={0} variants={cardVariants}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full text-sm font-semibold mb-6">
                <span className="text-gray-700">Perbandingan</span>
              </div>
              <h3 className="text-2xl font-extrabold text-[#111827] tracking-tight mb-8">Kimia vs Alami</h3>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cardVariants} custom={1} className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-200 flex flex-col relative overflow-hidden">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center shrink-0">
                    <FiAlertOctagon className="w-6 h-6 text-red-500" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800">Pertanian Konvensional</h4>
                </div>
                <ul className="space-y-4">
                  <li className="flex gap-3 text-gray-600 leading-relaxed">
                    <FiX className="shrink-0 w-5 h-5 text-red-500 mt-0.5" /> 
                    <span>Biaya produksi tinggi karena ketergantungan terus-menerus pada pupuk pabrik.</span>
                  </li>
                  <li className="flex gap-3 text-gray-600 leading-relaxed">
                    <FiX className="shrink-0 w-5 h-5 text-red-500 mt-0.5" /> 
                    <span>Mematikan cacing dan mikroba, membuat tanah perlahan menjadi keras & tandus.</span>
                  </li>
                  <li className="flex gap-3 text-gray-600 leading-relaxed">
                    <FiX className="shrink-0 w-5 h-5 text-red-500 mt-0.5" /> 
                    <span>Meninggalkan residu kimia yang berbahaya bagi kesehatan jangka panjang.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgba(121,207,2,0.15)] border-2 border-[#79CF02]/30 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#79CF02]/10 to-transparent rounded-bl-full z-0"></div>
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-12 h-12 bg-[#E9F5E1] rounded-full flex items-center justify-center shrink-0">
                    <FiCheckCircle className="w-6 h-6 text-[#559400]" />
                  </div>
                  <h4 className="text-xl font-bold text-[#111827]">Pertanian Alami</h4>
                </div>
                <ul className="space-y-4 relative z-10">
                  <li className="flex gap-3 text-gray-700 leading-relaxed font-medium">
                    <FiCheck className="shrink-0 w-5 h-5 text-[#559400] mt-0.5" /> 
                    <span>Nyaris tanpa modal, memanfaatkan sampah dan dedaunan gratis dari alam.</span>
                  </li>
                  <li className="flex gap-3 text-gray-700 leading-relaxed font-medium">
                    <FiCheck className="shrink-0 w-5 h-5 text-[#559400] mt-0.5" /> 
                    <span>Tanah kembali gembur, menyimpan air lebih baik, dan kaya akan ekosistem.</span>
                  </li>
                  <li className="flex gap-3 text-gray-700 leading-relaxed font-medium">
                    <FiCheck className="shrink-0 w-5 h-5 text-[#559400] mt-0.5" /> 
                    <span>Panen organik lebih kebal penyakit dan harganya jauh lebih mahal di pasaran.</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </section>
        </div>
      </div>


      {/* ================= BAGIAN 4: BAHAN (PERUBAHAN IKON SEPERTI MANFAAT) ================= */}
      <div className="w-full bg-[#FFFFFF] py-16 lg:py-28">
        <div className="px-6 sm:px-8 max-w-7xl mx-auto">
          <section id="bahan" className="scroll-mt-24">
            
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
              
              {/* SISI KIRI: Headline & Deskripsi */}
              <motion.div 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true, margin: "-50px" }} 
                variants={cardVariants} 
                custom={0}
                className="w-full lg:w-[35%] lg:sticky lg:top-36"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E9F5E1] border border-[#79CF02]/20 rounded-full text-sm font-semibold mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#79CF02]"></span>
                  <span className="text-[#559400]">Katalog Bahan</span>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight mb-5 leading-[1.1]">
                  Harta Karun <br className="hidden lg:block"/> di Sekitar Kita
                </h3>
                <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                  Berikut adalah tiga kelompok bahan utama yang sangat mudah ditemukan di lingkungan Desa Salassae untuk meracik pupuk alami berkualitas tinggi.
                </p>
              </motion.div>

              {/* SISI KANAN: Daftar Kartu Bahan Bertumpuk */}
              <div className="w-full lg:w-[65%] flex flex-col gap-4 md:gap-5">
                
                {/* KARTU 1 (Ikon diperbarui persis seperti bagian Manfaat) */}
                <motion.div custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cardVariants} className="bg-[#F7F8FA] p-6 md:p-8 rounded-[2rem] border border-transparent flex flex-col sm:flex-row gap-5 md:gap-6 items-start">
                  <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 bg-[#E9F5E1] rounded-full flex items-center justify-center border border-[#79CF02]/20">
                    <FiWind className="w-6 h-6 md:w-7 md:h-7 text-[#559400]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#111827] mb-2">Unsur Hijau (Nitrogen)</h4>
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-3">Mempercepat pertumbuhan daun dan tunas baru pada fase vegetatif tanaman.</p>
                    <p className="text-sm font-semibold text-[#79CF02]">Contoh: Daun gamal, lamtoro, sisa sayuran segar.</p>
                  </div>
                </motion.div>

                {/* KARTU 2 */}
                <motion.div custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cardVariants} className="bg-[#F7F8FA] p-6 md:p-8 rounded-[2rem] border border-transparent flex flex-col sm:flex-row gap-5 md:gap-6 items-start">
                  <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 bg-[#E9F5E1] rounded-full flex items-center justify-center border border-[#79CF02]/20">
                    <FiSun className="w-6 h-6 md:w-7 md:h-7 text-[#559400]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#111827] mb-2">Unsur Cokelat (Karbon)</h4>
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-3">Memberi energi berkelanjutan bagi mikroba tanah, memperkuat batang, dan menjaga porositas tanah.</p>
                    <p className="text-sm font-semibold text-[#79CF02]">Contoh: Sekam padi, jerami, serbuk gergaji kering.</p>
                  </div>
                </motion.div>

                {/* KARTU 3 */}
                <motion.div custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cardVariants} className="bg-[#F7F8FA] p-6 md:p-8 rounded-[2rem] border border-transparent flex flex-col sm:flex-row gap-5 md:gap-6 items-start">
                  <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 bg-[#E9F5E1] rounded-full flex items-center justify-center border border-[#79CF02]/20">
                    <FiDroplet className="w-6 h-6 md:w-7 md:h-7 text-[#559400]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#111827] mb-2">Starter (Dekomposer)</h4>
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-3">Bahan pemicu yang berisi bakteri baik dan makanan nutrisi awal untuk mempercepat proses fermentasi.</p>
                    <p className="text-sm font-semibold text-[#79CF02]">Contoh: Air cucian beras, molase (gula cair), larutan EM4.</p>
                  </div>
                </motion.div>

              </div>

            </div>
          </section>
        </div>
      </div>


      {/* ================= BAGIAN 5: CALL TO ACTION ================= */}
      <div className="w-full bg-[#F7F8FA] pt-16 pb-24 lg:pt-20 lg:pb-32">
        <div className="px-6 sm:px-8 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10 w-full">
            
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E9F5E1] rounded-full text-xs font-semibold mb-3 border border-[#79CF02]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#79CF02]"></span>
                <span className="text-[#559400]">Persiapan Praktik</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight">
                Langkah Nyata Menuju Kemandirian
              </h2>
            </div>

            <div className="relative w-full aspect-[4/5] md:aspect-[21/9] rounded-[2rem] overflow-hidden shadow-2xl">
              <img src="https://picsum.photos/1920/1080?nature&random=12" alt="Persiapan Praktik" className="absolute inset-0 w-full h-full object-cover" />
              
              <div className="absolute inset-0 bg-black/10"></div>

              <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 md:bottom-10 md:left-10 md:right-auto md:w-[420px] lg:w-[480px] bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 md:p-8 flex flex-col items-start shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#79CF02] rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <FiPackage className="w-6 h-6 text-[#111827]" />
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight drop-shadow-md">Siap untuk Praktik?</h3>
                <p className="text-white/90 text-sm md:text-base leading-relaxed mb-6 md:mb-8 drop-shadow-md">
                  Teori sudah Anda kuasai. Sekarang mari kita persiapkan alat dan bahan untuk meracik pupuk alami Anda sendiri.
                </p>

                <Link to="/praktik-pupuk" className="group inline-flex w-max items-center justify-between gap-4 md:gap-6 bg-white text-[#111827] font-bold text-sm md:text-base py-2 pl-6 md:pl-8 pr-2 rounded-full hover:bg-[#79CF02] hover:scale-105 transition-all shadow-lg active:scale-95 duration-300 focus:outline-none">
                  <span>Mulai Persiapan</span>
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#111827] group-hover:bg-black rounded-full flex items-center justify-center text-white transition-colors shadow-md shrink-0">
                    <FiArrowUpRight className="text-lg md:text-xl group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </Link>
                
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
      
    </motion.div>
  );
}