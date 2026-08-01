import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { 
  FiCheck, FiWind, FiEye, FiThermometer, FiDroplet, FiClock, FiSun, FiRefreshCcw, FiTool, FiPackage, FiChevronLeft, FiChevronRight, FiBox, FiLayers, FiChevronDown
} from "react-icons/fi";
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';

export default function PraktikPupukPage() {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  // STATE UNTUK MENYIMPAN LANGKAH MANA YANG SEDANG TERBUKA (ACCORDION)
  const [expandedSteps, setExpandedSteps] = useState({});

  const autoScrollDirection = useRef('right');
  const autoScrollInterval = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // FUNGSI UNTUK MEMBUKA/MENUTUP DETAIL LANGKAH
  const toggleStep = (id) => {
    setExpandedSteps(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // ================= LOGIKA CAROUSEL MOBILE =================
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const startAutoScroll = () => {
      autoScrollInterval.current = setInterval(() => {
        if (!carousel) return;
        
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        
        if (maxScroll <= 0) return; 
        
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

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth' 
      });
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // ================= DATA LANGKAH PEMBUATAN =================
  const steps = [
    {
      id: 1,
      title: "Mengundang Mikroba Baik",
      details: "Letakkan nasi segar ke dalam wadah kotak kayu dan simpan di area rumpun bambu selama 4 hari hingga berjamur. Rumpun bambu dipilih karena merupakan ekosistem penghasil mikroorganisme terbaik dengan hormon pertumbuhan yang sangat kuat.",
      icon: FiBox,
      image: "https://picsum.photos/800/600?nature,bamboo",
      extra: {
        alat: ["Wadah kotak kayu", "Kain tipis untuk penutup"],
        bahan: ["1 kg Nasi putih segar (baru dimasak)"],
        penjelasan: "Penting: Jangan gunakan nasi basi. Nasi basi sudah didominasi bakteri patogen (pembusuk). Kita membutuhkan nasi segar agar mikroba spesifik dari akar bambulah yang tumbuh (ditandai dengan munculnya jamur putih/kuning setelah 4 hari)."
      }
    },
    {
      id: 2,
      title: "Fermentasi Dekomposer (MOL)",
      details: "Timbang nasi yang telah berjamur, lalu campurkan dengan gula merah halus dengan takaran 1:1 (tanpa tambahan air). Tutup rapat dan fermentasi kembali selama 7 hari untuk menghasilkan cairan MOL (Mikroba Lokal).",
      icon: FiClock,
      image: "https://picsum.photos/800/600?nature,fermentation",
      extra: {
        alat: ["Timbangan digital/manual", "Toples atau wadah plastik bertutup rapat"],
        bahan: ["1 kg Nasi berjamur (dari Langkah 1)", "1 kg Gula merah yang disisir halus"],
        penjelasan: "Campurkan kedua bahan dan remas menggunakan tangan (menggunakan sarung tangan plastik) hingga merata. Tidak perlu menambahkan air, karena seiring waktu campuran ini akan mencair dengan sendirinya menjadi cairan MOL kental yang wangi."
      }
    },
    {
      id: 3,
      title: "Persiapan Bahan Kompos",
      details: "Siapkan kotoran sapi sebagai bahan baku utama pupuk. Campurkan dengan sekam padi atau serbuk kayu. Tambahan sekam ini sangat penting untuk menciptakan rongga udara agar tanah pertanian nantinya menjadi gembur.",
      icon: FiLayers,
      image: "https://picsum.photos/800/600?farm,soil",
      extra: {
        alat: ["Gerobak dorong", "Sekop"],
        bahan: ["Kotoran sapi segar / semi-kering", "Sekam padi atau serbuk kayu gergaji"],
        penjelasan: "Penambahan sekam padi sangat disukai karena struktur karbonnya tidak mudah hancur, sehingga rongga udara di dalam tanah tetap terjaga (gembur) untuk jangka panjang. Aduk kasar kotoran sapi dan sekam agar merata."
      }
    },
    {
      id: 4,
      title: "Penyemprotan & Pengadukan",
      details: "Larutkan 1 sendok makan cairan MOL ke dalam 5 liter air. Semprotkan secara merata ke tumpukan bahan kompos menggunakan tangki semprot (sprayer) sambil terus dibolak-balik. Larutan ini seketika akan menghilangkan bau menyengat dari kotoran.",
      icon: FiRefreshCcw,
      image: "https://picsum.photos/800/600?farm,tools",
      extra: {
        alat: ["Tangki semprot (Sprayer)", "Sekop untuk membolak-balik"],
        bahan: ["1 Sendok makan cairan MOL (dari Langkah 2)", "5 Liter Air Bersih"],
        penjelasan: "Kunci keberhasilannya ada pada pengadukan. Semprotkan sedikit demi sedikit sambil kompos dibolak-balik. Begitu MOL yang mengandung mikroorganisme dari bambu ini menyentuh kotoran, bau amonia (bau pesing/busuk) akan netral dan hilang dalam waktu 1-3 menit."
      }
    },
    {
      id: 5,
      title: "Penutupan (Masa Inkubasi)",
      details: "Tutup rapat tumpukan kompos tersebut menggunakan terpal dan biarkan selama 14 hingga 21 hari. Langkah ini sangat krusial untuk menjaga kestabilan suhu, memicu aktivitas bakteri pengurai secara maksimal, dan mempercepat proses pematangan kompos.",
      icon: FiThermometer,
      image: "https://picsum.photos/800/600?farm,tarp",
      extra: {
        alat: ["Terpal tebal", "Batu atau balok kayu (sebagai pemberat pinggiran terpal)"],
        bahan: ["Tumpukan kompos yang telah disemprot MOL"],
        penjelasan: "Tumpukan akan mengalami peningkatan suhu (terasa sangat panas jika disentuh). Panas ini membuktikan bakteri sedang bekerja aktif mengurai bahan sekaligus membunuh biji gulma dan bakteri penyakit jahat di dalam kotoran sapi."
      }
    },
    {
      id: 6,
      title: "Pengayakan & Pengemasan",
      details: "Setelah kompos matang dan terurai sempurna, lakukan pengayakan (filter) untuk memisahkan benda asing seperti sisa plastik atau batu. Pupuk kompos alami kini bersih, siap dikemas, atau langsung diaplikasikan untuk menyuburkan lahan!",
      icon: FiPackage,
      image: "https://picsum.photos/800/600?farm,sack",
      extra: {
        alat: ["Ayakan kawat/plastik", "Karung kemasan"],
        bahan: ["Kompos matang (suhu sudah dingin, bau tanah humus)"],
        penjelasan: "Proses pengayakan menjamin kualitas fisik pupuk yang akan dijual atau dipakai. Pastikan kompos tidak dikemas saat suhunya masih panas, biarkan diangin-anginkan sejenak setelah terpal dibuka."
      }
    }
  ];

  return (
    <div className="min-h-screen font-sans bg-white flex flex-col">
      
      {/* ================= NAVBAR ================= */}
      <div className="fixed top-0 left-0 w-full z-50 bg-[#E9F5E1]/95 backdrop-blur-md border-b border-[#79CF02]/10 py-4 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center relative">
          <Link to="/edukasi" className="w-10 h-10 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-full flex items-center justify-center text-[#111827] hover:bg-[#79CF02] transition-all hover:scale-110 active:scale-95 border border-white focus:outline-none" style={{ WebkitTapHighlightColor: 'transparent' }}>
            <FaArrowLeft className="text-sm pr-[2px]" />
          </Link>
          <span className="ml-4 font-bold text-[#111827]">Persiapan & Penggunaan</span>
        </div>
      </div>

      {/* ================= HERO SECTION (HIJAU) ================= */}
      <div className="bg-[#E9F5E1] pt-36 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
        <div className="px-6 sm:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#79CF02]/15 rounded-full text-xs md:text-sm font-bold text-[#559400] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#79CF02]"></span>
                Panduan Praktik
              </div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl xl:text-[4.2rem] font-extrabold text-[#111827] tracking-tight leading-[1.1] mb-6">
              Meracik Kompos <br className="hidden lg:block"/> & MOL <span className="text-[#79CF02]">Mandiri</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-gray-600 text-base md:text-lg lg:text-xl max-w-xl leading-relaxed">
              Panduan lengkap persiapan alat dan bahan, serta tata cara peracikan dekomposer lokal hingga menghasilkan pupuk kompos organik berkualitas.
            </motion.p>
          </div>

          <div className="w-full lg:w-1/2 mt-4 lg:mt-0 relative">
            
            {/* TAMPILAN MOBILE: CAROUSEL */}
            <div className="block lg:hidden w-full relative">
              <AnimatePresence>
                {canScrollLeft && (
                  <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={() => scrollCarousel('left')} className="absolute left-2 top-[50%] -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#111827] shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:bg-[#79CF02] active:scale-95 transition-all border border-gray-200 focus:outline-none">
                    <FiChevronLeft className="text-xl pr-[2px]" />
                  </motion.button>
                )}
              </AnimatePresence>
              
              <div ref={carouselRef} className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
                {[
                  "https://picsum.photos/800/600?farm,green",
                  "https://picsum.photos/800/600?leaves,texture",
                  "https://picsum.photos/800/600?farmer,hands",
                  "https://picsum.photos/800/600?nature,field"
                ].map((img, i) => (
                  <div key={i} className="snap-center shrink-0 w-[85%] sm:w-[65%] aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.08)] bg-white border border-gray-100">
                    <img src={img} alt={`Pertanian ${i+1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              <AnimatePresence>
                {canScrollRight && (
                  <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} onClick={() => scrollCarousel('right')} className="absolute right-2 top-[50%] -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#111827] shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:bg-[#79CF02] active:scale-95 transition-all border border-gray-200 focus:outline-none">
                    <FiChevronRight className="text-xl pl-[2px]" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* TAMPILAN DESKTOP: BENTO GRID TANGGA */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="hidden lg:grid grid-cols-2 gap-4 sm:gap-6 items-center">
              
              <div className="flex flex-col gap-4 sm:gap-6 mt-16 lg:mt-24">
                <img src="https://picsum.photos/800/600?farm,green" alt="Pertanian 1" className="w-full aspect-[4/3] object-cover rounded-2xl sm:rounded-[2rem] shadow-[0_8px_24px_rgba(0,0,0,0.08)]"/>
                <img src="https://picsum.photos/800/600?leaves,texture" alt="Pertanian 2" className="w-full aspect-[4/3] object-cover rounded-2xl sm:rounded-[2rem] shadow-[0_8px_24px_rgba(0,0,0,0.08)]"/>
              </div>

              <div className="flex flex-col gap-4 sm:gap-6 -mt-16 lg:-mt-24">
                <img src="https://picsum.photos/800/600?farmer,hands" alt="Pertanian 3" className="w-full aspect-[4/3] object-cover rounded-2xl sm:rounded-[2rem] shadow-[0_8px_24px_rgba(0,0,0,0.08)]"/>
                <img src="https://picsum.photos/800/600?nature,field" alt="Pertanian 4" className="w-full aspect-[4/3] object-cover rounded-2xl sm:rounded-[2rem] shadow-[0_8px_24px_rgba(0,0,0,0.08)]"/>
              </div>

            </motion.div>
          </div>

        </div>
      </div>


      {/* ================= ALAT & BAHAN UMUM (PUTIH) ================= */}
      <div className="bg-[#FFFFFF] w-full py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="mb-12 md:mb-16 flex flex-col items-start text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight mb-4">Kebutuhan Formulasi Utama</h2>
            <p className="text-gray-500 text-lg">Siapkan kelengkapan dasar berikut sebelum Anda memulai proses peracikan di lapangan.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-10">
            
            {/* Panel 1 */}
            <div className="w-full md:w-1/2 bg-[#F7F8FA] p-8 md:p-10 rounded-[2rem] border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-[#79CF02]/20 shadow-sm shrink-0">
                  <FiTool className="w-6 h-6 text-[#559400]" />
                </div>
                <h3 className="text-2xl font-bold text-[#111827]">Persiapan Alat</h3>
              </div>
              <ul className="flex flex-col gap-5">
                {[
                  'Kotak atau wadah kayu untuk menyimpan nasi', 
                  'Gerobak dorong untuk memuat bahan', 
                  'Sekop untuk mengaduk dan membolak-balik kompos', 
                  'Tangki semprot (Sprayer) untuk menyemprotkan MOL', 
                  'Terpal tebal untuk penutup masa inkubasi'
                ].map((alat, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 bg-white rounded-full p-1 shadow-sm border border-gray-100 shrink-0">
                      <FiCheck className="text-[#79CF02] w-4 h-4" />
                    </div>
                    <span className="text-gray-700 font-medium text-lg leading-snug">{alat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Panel 2 */}
            <div className="w-full md:w-1/2 bg-[#F7F8FA] p-8 md:p-10 rounded-[2rem] border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-[#79CF02]/20 shadow-sm shrink-0">
                  <FiPackage className="w-6 h-6 text-[#559400]" />
                </div>
                <h3 className="text-2xl font-bold text-[#111827]">Persiapan Bahan</h3>
              </div>
              <ul className="flex flex-col gap-6">
                {[
                  { title: "Bahan Dekomposer", desc: "Nasi segar (baru dimasak) dan Gula merah yang sudah dihaluskan (Rasio 1:1)." },
                  { title: "Bahan Utama Kompos", desc: "Kotoran sapi secukupnya sebagai suplai nutrisi dasar." },
                  { title: "Pencipta Rongga", desc: "Sekam padi atau serbuk kayu untuk menjaga kegemburan tanah." },
                  { title: "Air Pelarut", desc: "Air bersih untuk melarutkan campuran MOL sebelum disemprotkan." }
                ].map((bahan, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 bg-white rounded-full p-1 shadow-sm border border-gray-100 shrink-0">
                      <FiCheck className="text-[#79CF02] w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[#111827] font-bold block mb-1 text-lg">{bahan.title}</span>
                      <span className="text-gray-500 leading-relaxed">{bahan.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>
          
        </div>
      </div>


      {/* ================= LANGKAH-LANGKAH INTERAKTIF (ABU-ABU) ================= */}
      <div className="w-full py-20 lg:py-28 bg-[#F7F8FA]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="mb-16 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full text-sm font-semibold mb-4 shadow-sm">
              <span className="text-gray-700">Panduan Praktik Interaktif</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight mb-4">Mahakarya dari Rumpun Bambu hingga Panen</h2>
            <p className="text-gray-500 text-lg max-w-3xl">Rahasia utama pertanian Salassae terletak pada pembuatan dekomposer mandiri (MOL). Klik tombol <strong className="text-[#79CF02]">"Lihat Detail"</strong> pada setiap langkah di bawah ini untuk melihat kebutuhan alat, takaran bahan, dan tips khusus.</p>
          </div>

          <div className="relative">
            <div className="absolute left-6 md:left-8 top-2 bottom-2 w-0.5 bg-gray-200 transform -translate-x-1/2 z-0"></div>

            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isExpanded = expandedSteps[step.id];

              return (
                <motion.div 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true, margin: "-50px" }} 
                  variants={fadeIn} 
                  key={step.id} 
                  className={`relative z-10 flex gap-6 md:gap-10 ${index !== steps.length - 1 ? 'mb-20' : ''}`}
                >
                  {/* Angka Lingkaran */}
                  <div className={`w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-full flex items-center justify-center font-bold text-lg md:text-xl shadow-sm border transition-colors duration-300 ${isExpanded ? 'bg-[#79CF02] text-white border-[#79CF02]' : 'bg-white text-gray-700 border-gray-200'}`}>
                    {step.id}
                  </div>

                  {/* KONTINER UTAMA (FLEX-WRAP & ORDERING) */}
                  {/* Penjelasan Trik:
                      - Pada HP (flex-col): Teks di atas (order-1), Detail di tengah (order-2), Gambar di bawah (order-3).
                      - Pada Laptop (flex-row flex-wrap): Teks di kiri (order-1), Gambar di kanan (order-2), Detail meluas di bawahnya (order-3 w-full).
                  */}
                  <div className="flex-1 flex flex-col lg:flex-row lg:flex-wrap w-full pt-1 md:pt-2">
                    
                    {/* 1. BAGIAN TEKS UTAMA */}
                    <div className="order-1 lg:order-1 flex-1 min-w-0 mb-8 lg:mb-0 lg:pr-12">
                      <div className="w-10 h-10 rounded-full bg-[#E9F5E1] flex items-center justify-center text-[#79CF02] mb-5 border border-[#79CF02]/20">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-[#111827] mb-3">{step.title}</h3>
                      <p className="text-gray-500 text-base md:text-lg leading-relaxed">{step.details}</p>
                      
                      {/* Tombol Toggle Detail */}
                      <button 
                        onClick={() => toggleStep(step.id)}
                        className="mt-6 flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 hover:border-[#79CF02] rounded-full text-sm font-bold text-[#111827] hover:text-[#559400] transition-all shadow-sm focus:outline-none group"
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                      >
                        <span>{isExpanded ? "Tutup Detail" : "Lihat Detail Alat & Bahan"}</span>
                        <FiChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180 text-[#79CF02]" : "text-gray-400 group-hover:text-[#79CF02]"}`} />
                      </button>
                    </div>

                    {/* 2. BAGIAN DETAIL (ACCORDION) */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="order-2 lg:order-3 w-full overflow-hidden"
                        >
                          <div className="mb-8 lg:mb-0 lg:mt-8 bg-white border border-gray-100 rounded-[2rem] p-6 md:p-8 shadow-sm">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                              {/* Kolom Alat */}
                              <div>
                                <h5 className="font-bold text-[#111827] mb-4 flex items-center gap-2">
                                  <FiTool className="text-[#79CF02]" /> Alat Khusus
                                </h5>
                                <ul className="flex flex-col gap-3">
                                  {step.extra.alat.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm md:text-base text-gray-600">
                                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0"></div>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              {/* Kolom Bahan */}
                              <div>
                                <h5 className="font-bold text-[#111827] mb-4 flex items-center gap-2">
                                  <FiPackage className="text-[#79CF02]" /> Bahan & Takaran
                                </h5>
                                <ul className="flex flex-col gap-3">
                                  {step.extra.bahan.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm md:text-base text-gray-600">
                                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0"></div>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            
                            {/* Catatan Ekstra */}
                            <div className="bg-[#f0fdf4] p-5 rounded-2xl border border-[#79CF02]/20 text-sm md:text-base text-[#417002] leading-relaxed">
                              <strong>💡 Catatan Penting:</strong> {step.extra.penjelasan}
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* 3. BAGIAN GAMBAR */}
                    <div className="order-3 lg:order-2 w-full lg:w-[40%] shrink-0">
                      <div className="w-full rounded-[2rem] overflow-hidden shadow-sm border border-gray-200 bg-white p-2">
                        <img 
                          src={step.image} 
                          alt={step.title} 
                          className="w-full h-auto aspect-video md:aspect-[4/3] lg:aspect-auto lg:h-64 object-cover rounded-[1.5rem] hover:scale-105 transition-transform duration-700" 
                        />
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>


      {/* ================= INDIKATOR KEBERHASILAN (PUTIH) ================= */}
      <div className="w-full py-20 lg:py-28 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeIn} className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
            
            <div className="w-full lg:w-1/3 lg:sticky lg:top-32">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight mb-4">Indikator Panen</h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Bagaimana cara mengetahui bahwa proses fermentasi MOL dan Kompos Anda berhasil? Perhatikan tiga tanda utama berikut.
              </p>
            </div>

            <div className="w-full lg:w-2/3 flex flex-col gap-10 lg:gap-14 pt-2">
              
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-14 h-14 shrink-0 bg-[#E9F5E1] rounded-full flex items-center justify-center border border-[#79CF02]/20">
                  <FiWind className="w-7 h-7 text-[#559400]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#111827] mb-3">Aroma Fermentasi</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Cairan MOL yang berhasil akan mengeluarkan aroma wangi khas yang menyerupai aroma tapai atau alkohol. Sementara itu, pada kompos padat, bau kotoran yang menyengat akan sepenuhnya hilang, berganti menjadi aroma segar layaknya tanah humus hutan.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-14 h-14 shrink-0 bg-[#E9F5E1] rounded-full flex items-center justify-center border border-[#79CF02]/20">
                  <FiEye className="w-7 h-7 text-[#559400]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#111827] mb-3">Perubahan Warna & Tekstur</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Fermentasi MOL akan mengubah cairan menjadi warna cokelat hingga hitam pekat. Untuk pupuk kompos padat, teksturnya akan berubah menjadi lebih hancur, gembur, dan warnanya menggelap merata.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-14 h-14 shrink-0 bg-[#E9F5E1] rounded-full flex items-center justify-center border border-[#79CF02]/20">
                  <FiThermometer className="w-7 h-7 text-[#559400]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#111827] mb-3">Suhu Menurun</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Di awal penutupan terpal, suhu tumpukan kompos akan terasa hangat karena aktivitas bakteri yang tinggi. Kompos dikatakan benar-benar matang dan siap pakai apabila suhunya sudah kembali normal atau terasa dingin saat disentuh.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>


      {/* ================= PANDUAN APLIKASI (ABU-ABU) ================= */}
      <div className="bg-[#F7F8FA] w-full py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeIn} className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
            
            <div className="w-full lg:w-2/3 flex flex-col gap-10 lg:gap-14 pt-2 order-2 lg:order-1">
              
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-14 h-14 shrink-0 bg-[#E9F5E1] rounded-full flex items-center justify-center border border-[#79CF02]/20">
                  <FiDroplet className="w-7 h-7 text-[#559400]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#111827] mb-3">Aplikasi Kompos Padat</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Taburkan pupuk kompos yang telah diayak secara merata di area sekitar perakaran tanaman. Kompos ini akan bekerja secara perlahan melepaskan nutrisi ke dalam tanah tanpa merusak akar.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-14 h-14 shrink-0 bg-[#E9F5E1] rounded-full flex items-center justify-center border border-[#79CF02]/20">
                  <FiRefreshCcw className="w-7 h-7 text-[#559400]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#111827] mb-3">Penyemprotan MOL Susulan</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Sisa cairan MOL yang tidak digunakan ke kompos dapat diaplikasikan langsung ke tanah. Selalu ingat takaran pengencerannya: <strong className="text-[#111827]">1 sendok makan MOL dicampur 5 liter air bersih</strong> sebelum disemprotkan.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-14 h-14 shrink-0 bg-[#E9F5E1] rounded-full flex items-center justify-center border border-[#79CF02]/20">
                  <FiSun className="w-7 h-7 text-[#559400]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#111827] mb-3">Waktu Pemupukan</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Lakukan pemupukan atau penyemprotan MOL di waktu <strong className="text-[#111827]">Pagi (06:00 - 09:00)</strong> atau <strong className="text-[#111827]">Sore (setelah jam 15:00)</strong>, karena pada waktu-waktu inilah aktivitas tanah dan penyerapan stomata tanaman sedang optimal.
                  </p>
                </div>
              </div>

            </div>

            <div className="w-full lg:w-1/3 lg:sticky lg:top-32 order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight mb-4">Aturan Pakai & Aplikasi</h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Penting: Jangan pernah menyemprotkan cairan MOL (pengurai) langsung dalam keadaan pekat tanpa dicampur air, karena konsentrasinya terlalu kuat bagi tanaman.
              </p>
            </div>

          </motion.div>

        </div>
      </div>


      {/* ================= CALL TO ACTION (END OF JOURNEY - PUTIH) ================= */}
      <div className="bg-[#FFFFFF] w-full py-20 lg:py-28 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            
            <div className="w-16 h-16 bg-[#E9F5E1] rounded-full flex items-center justify-center mx-auto mb-8 border border-[#79CF02]/20">
              <FiCheck className="w-8 h-8 text-[#559400]" />
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight mb-6">
              Saatnya Tangan Anda <br className="hidden sm:block" /> yang Bekerja
            </h2>
            
            <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
              Perubahan besar dimulai dari pekarangan rumah. Mari bersama-sama wujudkan kemandirian pangan dan lestarikan alam dari desa kita.
            </p>

            <div className="flex justify-center">
              <Link to="/" className="w-full sm:w-auto px-10 py-3.5 bg-[#111827] hover:bg-[#79CF02] text-white hover:text-[#111827] font-bold rounded-full transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:shadow-xl focus:outline-none">
                Kembali ke Beranda
              </Link>
            </div>
            
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}