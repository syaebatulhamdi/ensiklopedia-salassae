import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { 
  FiCheck, FiWind, FiEye, FiThermometer, FiDroplet, FiClock, FiSun, FiRefreshCcw, FiTool, FiPackage, FiChevronLeft, FiChevronRight
} from "react-icons/fi";
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';

export default function PraktikPupukPage() {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  const autoScrollDirection = useRef('right');
  const autoScrollInterval = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const steps = [
    {
      id: 1,
      title: "Pencacahan Bahan",
      details: "Gunakan parang atau sabit untuk mencacah daun gamal, lamtoro, atau sisa sayuran segar hingga berukuran 1-2 cm. Semakin kecil ukuran cacahan, semakin luas permukaan yang bisa diurai oleh mikroba, sehingga proses fermentasi akan berjalan jauh lebih cepat.",
      icon: FiWind,
      image: "https://picsum.photos/800/600?nature,leaves"
    },
    {
      id: 2,
      title: "Aktivasi Mikroba",
      details: "Siapkan wadah kecil. Larutkan gula merah yang sudah disisir halus ke dalam sedikit air, kemudian tambahkan cairan EM4. Aduk rata dan diamkan selama 15-20 menit agar bakteri pembusuk mulai aktif dari masa hibernasinya.",
      icon: FiDroplet,
      image: "https://picsum.photos/800/600?water,glass"
    },
    {
      id: 3,
      title: "Pencampuran Bahan",
      details: "Masukkan bahan hijauan yang sudah dicacah ke dalam tong plastik. Tuangkan 10 liter air bersih, kemudian masukkan larutan aktivator (EM4 + gula). Aduk kuat menggunakan kayu panjang hingga seluruh bahan tercampur sempurna.",
      icon: FiRefreshCcw,
      image: "https://picsum.photos/800/600?farm,tools"
    },
    {
      id: 4,
      title: "Masa Fermentasi",
      details: "Tutup rapat tong plastik untuk menciptakan kondisi anaerob. Simpan di tempat teduh. Setiap 3 hari sekali, buka tutup tong perlahan untuk membuang gas, aduk sebentar, lalu tutup kembali dengan sangat rapat. Biarkan selama 14-21 hari.",
      icon: FiClock,
      image: "https://picsum.photos/800/600?nature,time"
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

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] font-extrabold text-[#111827] tracking-tight leading-[1.1] mb-6">
              Meracik Pupuk Organik <br className="hidden lg:block"/> Cair <span className="text-[#79CF02]">Mandiri</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-gray-600 text-base md:text-lg lg:text-xl max-w-xl leading-relaxed">
              Panduan persiapan alat dan bahan, serta tata cara pengaplikasian nutrisi cair berkualitas tinggi dari alam untuk tanaman Anda.
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


      {/* ================= ALAT & BAHAN (PUTIH) ================= */}
      <div className="bg-[#FFFFFF] w-full py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="mb-12 md:mb-16 flex flex-col items-start text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight mb-4">Kebutuhan Formulasi</h2>
            <p className="text-gray-500 text-lg">Siapkan kelengkapan berikut sebelum Anda memulai proses peracikan di rumah.</p>
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
                {['Ember atau tong plastik bertutup rapat', 'Parang atau sabit untuk mencacah', 'Kayu panjang untuk mengaduk', 'Saringan (kain tipis/saringan teh)', 'Sarung tangan karet'].map((alat, i) => (
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
                  { title: "Hijauan (Nitrogen)", desc: "1 kg daun gamal/lamtoro/sisa sayur." },
                  { title: "Dekomposer", desc: "100 ml EM4 Pertanian atau air cucian beras." },
                  { title: "Sumber Energi", desc: "100 gram gula merah atau molase cair." },
                  { title: "Air Bersih", desc: "10 liter air (hindari air kaporit/PDAM langsung)." }
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


      {/* ================= LANGKAH-LANGKAH (ABU-ABU) ================= */}
      <div className="w-full py-20 lg:py-28 bg-[#F7F8FA]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="mb-16 flex flex-col items-start text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight mb-4">Langkah demi Langkah</h2>
            <p className="text-gray-500 text-lg">Ikuti tahapan visual berikut ini untuk memastikan proses fermentasi Anda berjalan sempurna.</p>
          </div>

          <div className="relative">
            <div className="absolute left-6 md:left-8 top-2 bottom-2 w-0.5 bg-gray-200 transform -translate-x-1/2 z-0"></div>

            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true, margin: "-50px" }} 
                  variants={fadeIn} 
                  key={step.id} 
                  className={`relative z-10 flex gap-6 md:gap-10 ${index !== steps.length - 1 ? 'mb-20' : ''}`}
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 bg-white rounded-full flex items-center justify-center font-bold text-lg md:text-xl text-gray-700 shadow-sm border border-gray-100">
                    {step.id}
                  </div>

                  <div className="flex-1 flex flex-col lg:flex-row gap-8 lg:gap-16 pt-1 md:pt-2">
                    <div className="flex-1">
                      <div className="w-10 h-10 rounded-full bg-[#E9F5E1] flex items-center justify-center text-[#79CF02] mb-5 border border-[#79CF02]/20">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-[#111827] mb-3">{step.title}</h3>
                      <p className="text-gray-500 text-base md:text-lg leading-relaxed">{step.details}</p>
                    </div>

                    <div className="w-full lg:w-[40%] shrink-0">
                      <div className="w-full rounded-[2rem] overflow-hidden shadow-sm border border-gray-200">
                        <img 
                          src={step.image} 
                          alt={step.title} 
                          className="w-full h-auto aspect-video md:aspect-[4/3] lg:aspect-auto lg:h-64 object-cover hover:scale-105 transition-transform duration-700" 
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
                Bagaimana cara mengetahui bahwa proses fermentasi POC Anda berhasil dan siap diaplikasikan? Perhatikan tiga tanda utama berikut.
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
                    Pupuk yang berhasil akan mengeluarkan aroma wangi khas fermentasi, mirip seperti wangi tapai atau cairan alkohol. Jika baunya sangat busuk seperti bangkai, itu menandakan proses pembusukan gagal (didominasi bakteri patogen).
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-14 h-14 shrink-0 bg-[#E9F5E1] rounded-full flex items-center justify-center border border-[#79CF02]/20">
                  <FiEye className="w-7 h-7 text-[#559400]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#111827] mb-3">Perubahan Warna</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Cairan pupuk akan berubah warna menjadi kuning kecokelatan hingga cokelat pekat gelap (bergantung pada bahan hijauan yang digunakan). Warna yang pekat menandakan unsur hara telah terlarut sempurna di dalam air.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-14 h-14 shrink-0 bg-[#E9F5E1] rounded-full flex items-center justify-center border border-[#79CF02]/20">
                  <FiThermometer className="w-7 h-7 text-[#559400]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#111827] mb-3">Suhu Mendingin</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Pada minggu pertama fermentasi, suhu tong biasanya akan terasa hangat karena aktivitas bakteri yang tinggi. Pupuk dikatakan matang jika suhu cairannya sudah kembali normal atau dingin saat disentuh.
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
                  <h3 className="text-2xl font-bold text-[#111827] mb-3">Rasio Pengenceran</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Gunakan perbandingan <strong className="text-[#111827]">1:10</strong>. Campurkan 1 liter POC pekat hasil panen dengan 10 liter air bersih biasa ke dalam ember sebelum digunakan untuk penyiraman.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-14 h-14 shrink-0 bg-[#E9F5E1] rounded-full flex items-center justify-center border border-[#79CF02]/20">
                  <FiSun className="w-7 h-7 text-[#559400]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#111827] mb-3">Waktu Penyiraman</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Lakukan penyemprotan pada daun atau penyiraman pada area akar di waktu <strong className="text-[#111827]">Pagi (06:00 - 09:00)</strong> atau <strong className="text-[#111827]">Sore (setelah jam 15:00)</strong> saat stomata tanaman sedang terbuka lebar.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-14 h-14 shrink-0 bg-[#E9F5E1] rounded-full flex items-center justify-center border border-[#79CF02]/20">
                  <FiClock className="w-7 h-7 text-[#559400]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#111827] mb-3">Frekuensi Aplikasi</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Untuk mendapatkan hasil yang paling maksimal pada masa vegetatif (pertumbuhan awal), aplikasikan pupuk cair ini secara rutin sebanyak <strong className="text-[#111827]">1 hingga 2 kali dalam seminggu</strong>.
                  </p>
                </div>
              </div>

            </div>

            <div className="w-full lg:w-1/3 lg:sticky lg:top-32 order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#111827] tracking-tight mb-4">Aturan Pakai & Dosis</h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Penting: Pupuk organik cair tidak boleh disiramkan langsung ke tanaman dalam keadaan pekat karena kandungannya terlalu keras dan dapat membuat tanaman layu (kepanasan).
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