import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function LangkahPembuatanPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [imagesLoaded, setImagesLoaded] = useState(false); 

  // 1. DATA LANGKAH 
  const steps = [
    {
      title: "Pencacahan Bahan",
      image: "https://picsum.photos/id/10/1920/1080", 
      items: [
        { name: "Bahan Hijau (Daun, sisa sayur)", qty: "1 Bagian" },
        { name: "Bahan Cokelat (Sekam, jerami)", qty: "1 Bagian" },
        { name: "Parang / Alat Potong", qty: "1 Buah" }
      ],
      desc: "Langkah pertama adalah mencacah seluruh bahan organik (hijau dan cokelat) hingga berukuran kecil, sekitar 2-5 cm. Semakin kecil ukuran bahan, semakin luas permukaan yang bisa diurai oleh mikroba, sehingga proses dekomposisi akan berlangsung jauh lebih cepat."
    },
    {
      title: "Pembuatan Larutan Dekomposer",
      image: "https://picsum.photos/id/11/1920/1080", 
      items: [
        { name: "EM4 Pertanian / MOL", qty: "200 ml" },
        { name: "Gula Merah / Molase", qty: "200 ml" },
        { name: "Air Sumur / Sungai", qty: "10 Liter" }
      ],
      desc: "Larutkan gula merah ke dalam sedikit air hangat, lalu campurkan dengan air bersih. Setelah itu, masukkan cairan dekomposer (EM4/MOL) ke dalam larutan gula tersebut. Aduk rata dan diamkan selama kurang lebih 15 menit agar mikroba 'bangun' dan aktif sebelum disiramkan."
    },
    {
      title: "Pencampuran & Pelembapan",
      image: "https://picsum.photos/id/12/1920/1080", 
      items: [
        { name: "Kotoran Hewan", qty: "1 Bagian" },
        { name: "Larutan Dekomposer", qty: "Secukupnya" },
        { name: "Cangkul / Pengaduk", qty: "1 Buah" }
      ],
      desc: "Hamparkan bahan cacahan dan kotoran hewan secara berlapis di atas terpal. Siramkan larutan dekomposer sedikit demi sedikit sambil diaduk merata. Pastikan kelembapannya pas (sekitar 30-40%): cirinya adalah saat digenggam, bahan terasa basah menggumpal tetapi tidak ada air yang menetes."
    },
    {
      title: "Proses Fermentasi (Inkubasi)",
      image: "https://picsum.photos/id/13/1920/1080", 
      items: [
        { name: "Drum / Karung / Terpal", qty: "1 Unit" }
      ],
      desc: "Masukkan campuran pupuk ke dalam wadah tertutup (seperti drum) atau tumpuk dan tutup rapat menggunakan terpal agar kedap udara (anaerob). Simpan di tempat yang teduh, terhindar dari sinar matahari langsung dan hujan."
    },
    {
      title: "Pengecekan & Panen",
      image: "https://picsum.photos/id/14/1920/1080", 
      items: [
        { name: "Sarung Tangan Karet", qty: "Opsional" }
      ],
      desc: "Pada hari ke-3, cek suhunya. Jika terasa panas (bisa mencapai 60°C), tandanya mikroba sedang bekerja. Pada hari ke-14 hingga ke-21, pupuk sudah bisa dipanen. Ciri pupuk yang berhasil matang adalah suhunya kembali normal, berbau harum seperti tanah hujan (tidak busuk), dan teksturnya gembur kehitaman."
    }
  ];

  // 2. LOGIKA PRE-LOADING
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const preloadImages = async () => {
      const promises = steps.map((step) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = step.image;
          img.onload = resolve; 
          img.onerror = resolve; 
        });
      });

      await Promise.all(promises);
      setImagesLoaded(true); 
    };

    preloadImages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll ke atas setiap kali step berubah — mencegah layout shift di mobile
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    }
  };

  // Variasi animasi geser (Slide) dikembalikan agar transisi teks mulus
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" } 
    },
    exit: (dir) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" }
    })
  };

  return (
    <div className="relative bg-[#f4f6f4] font-sans overflow-x-hidden" style={{ minHeight: '100dvh' }}>
      
      {/* 1. GAMBAR LATAR BERSIFAT TETAP */}
      <div className="fixed top-0 left-0 w-full z-0 bg-[#163627] overflow-hidden" style={{ height: '45dvh' }}>
        {imagesLoaded ? (
          <AnimatePresence>
            <motion.img 
              key={currentStep}
              src={steps[currentStep].image} 
              alt={steps[currentStep].title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-[#77D301] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/10 z-10 pointer-events-none"></div>
      </div>

      <div className="fixed top-6 left-6 z-50">
        <Link to="/praktik-pupuk" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#163627] shadow-xl hover:bg-gray-100 transition-colors">
          <FiArrowLeft className="text-sm pr-[2px]" />
        </Link>
      </div>

      {/* 2. AREA BOTTOM SHEET */}
      <div className="relative z-10 bg-white rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] pb-32" style={{ marginTop: '40dvh' }}>
        
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-4 mb-6"></div>

        {/* Konten langkah — normal flow agar bisa scroll, bounce dicegah oleh scrollTo + GPU hack */}
        <div className="max-w-2xl mx-auto px-6 md:px-10">
          
          {/* Step indicator — di luar AnimatePresence agar tidak ikut animasi geser */}
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#111827] mb-4">Langkah {currentStep + 1}</h2>
            
            <div className="flex items-center justify-center gap-2 md:gap-3">
              {steps.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    idx === currentStep 
                      ? 'bg-[#163627] text-white shadow-md scale-110' 
                      : idx < currentStep
                      ? 'bg-[#e5f0e6] text-[#77D301]' 
                      : 'bg-gray-100 text-gray-400'    
                  }`}
                >
                  {idx < currentStep ? <FiCheckCircle /> : idx + 1}
                </div>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div 
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >

              <h3 className="text-xl font-bold text-[#163627] mb-6 text-center">{steps[currentStep].title}</h3>

              <div className="bg-[#f4f6f4] rounded-2xl p-5 mb-8 border border-gray-200">
                <h4 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">Kebutuhan Langkah Ini</h4>
                <ul className="space-y-3">
                  {steps[currentStep].items.map((item, idx) => (
                    <li key={idx} className="flex justify-between items-center text-sm md:text-base border-b border-gray-200/60 pb-2 last:border-0 last:pb-0">
                      <span className="font-medium text-gray-800 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#77D301]"></span>
                        {item.name}
                      </span>
                      <span className="text-gray-500 font-semibold">{item.qty}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                {steps[currentStep].desc}
              </p>

            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      {/* 3. NAVIGASI BAWAH */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-100 py-4 px-6 md:px-10 z-50 flex items-center justify-center" style={{ transform: 'translate3d(0,0,0)' }}>
        <div className="w-full max-w-2xl flex gap-4">
          
          <button 
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`w-14 h-14 shrink-0 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-all duration-200 ${
              currentStep === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <FiArrowLeft className="text-xl" />
          </button>

          {currentStep < steps.length - 1 ? (
            <button 
              onClick={handleNext}
              className="flex-1 h-14 bg-[#163627] text-[#ffffff] font-bold text-lg rounded-full flex items-center justify-center gap-2 hover:bg-[#000201] transition-colors shadow-lg"
            >
              <span>Langkah Selanjutnya</span>
              <FiArrowRight />
            </button>
          ) : (
            <Link 
              to="/edukasi"
              className="flex-1 h-14 bg-[#163627] text-white font-bold text-lg rounded-full flex items-center justify-center gap-2 hover:bg-black transition-colors shadow-lg"
            >
              <span>Selesai Praktik</span>
              <FiCheckCircle />
            </Link>
          )}

        </div>
      </div>

    </div>
  );
}