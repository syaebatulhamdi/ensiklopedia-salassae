import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    // Latar belakang diubah menjadi #E9F5E1 dan teks utama menjadi hitam/gelap
    <footer className="relative z-10 bg-[#E9F5E1] text-[#111827] pt-8 pb-6 px-6 sm:px-12 md:px-16 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-6 md:gap-8">
        
        {/* Kolom Kiri: Branding & Deskripsi */}
        <div className="flex flex-col gap-2 md:w-1/2">
          <h4 className="text-xl md:text-2xl font-extrabold text-[#111827] tracking-tight">
            Pertanian Alami <span className="text-[#79CF02]">Salassae</span>
          </h4>
          {/* Warna teks diubah menjadi abu-abu gelap agar nyaman dibaca di latar terang */}
          <p className="text-gray-600 text-sm leading-relaxed font-normal max-w-sm mt-1">
            Membangun kemandirian pangan dan memulihkan ekosistem tanah melalui praktik bertani yang selaras dengan alam.
          </p>
        </div>

        {/* Kolom Kanan: Kontak & Info */}
        <div className="flex flex-col gap-3 mt-2 md:mt-0">
          <div className="flex items-start gap-3 text-gray-600 group hover:text-[#111827] transition-colors">
            {/* Chips Ikon diubah menggunakan warna #79CF02 */}
            <div className="p-1.5 bg-[#79CF02]/15 rounded-full group-hover:bg-[#79CF02]/30 transition-colors">
              <FiMapPin className="text-[#79CF02] shrink-0 text-base" />
            </div>
            <span className="text-xs sm:text-sm leading-relaxed mt-0.5">
              Desa Salassae, Kec. Bulukumpa<br/>Kab. Bulukumba, Sulawesi Selatan
            </span>
          </div>
          
          <div className="flex items-center gap-3 text-gray-600 group hover:text-[#111827] transition-colors">
            <div className="p-1.5 bg-[#79CF02]/15 rounded-full group-hover:bg-[#79CF02]/30 transition-colors">
              <FiPhone className="text-[#79CF02] shrink-0 text-base" />
            </div>
            <span className="text-xs sm:text-sm font-medium">0852-xxxx-xxxx</span>
          </div>
          
          <div className="flex items-center gap-3 text-gray-600 group hover:text-[#111827] transition-colors">
            <div className="p-1.5 bg-[#79CF02]/15 rounded-full group-hover:bg-[#79CF02]/30 transition-colors">
              <FiMail className="text-[#79CF02] shrink-0 text-base" />
            </div>
            <span className="text-xs sm:text-sm font-medium">kontak@salassae.id</span>
          </div>
        </div>

      </div>

      {/* Garis Bawah Copyright */}
      {/* Garis pemisah diubah warnanya agar pas dengan latar terang */}
      <div className="max-w-5xl mx-auto mt-8 pt-4 border-t border-[#111827]/10 flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-gray-500 text-xs font-medium">
          © {new Date().getFullYear()} Pertanian Alami Salassae.
        </p>
        <p className="text-gray-500 text-[10px] sm:text-xs font-medium">
          Dirancang untuk Kemandirian Desa.
        </p>
      </div>
    </footer>
  );
}