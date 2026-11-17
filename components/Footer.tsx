import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0A1128] text-white">
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-6">
        {/* BRAND - Like Zamari */}
        <p className="font-black tracking-[0.35em] text-[18px]">CLEVER-BIZ</p>
        <p className="tracking-[0.35em] text-[11px] font-bold text-[#C9A86A] mt-1">HOME • NIGERIA 🌍</p>

        <p className="text-[14px] leading-relaxed text-white/60 mt-4 max-w-[340px]">
          Trusted property platform across Ogun & Lagos. Find your dream home with verified documents & secure receipts.
        </p>

        {/* FLAGS - Like Zamari */}
        <p className="text-[18px] tracking-widest mt-5 leading-7">
          🇳🇬 🇬🇭 🇿🇦 🇰🇪 🇺🇸 🇬🇧 🇦🇪 🇨🇦
        </p>

        {/* FOLLOW US */}
        <p className="tracking-[0.25em] text-[11px] font-bold text-white/40 mt-7 mb-3">FOLLOW US</p>
        <div className="flex gap-2.5">
          <a href="https://instagram.com/cleverbiz" target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[16px]">📸</a>
          <a href="https://facebook.com/cleverbiz" target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[16px]">📘</a>
          <a href="https://x.com/cleverbiz" target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[14px] font-black">𝕏</a>
          <a href="https://youtube.com/@cleverbiz" target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[16px]">▶️</a>
          <a href="https://wa.me/2348088735444" target="_blank" className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[16px]">💬</a>
          <a href="https://tiktok.com/@cleverbiz" target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[16px]">🎵</a>
        </div>

        {/* CONTACT - Like Zamari */}
        <p className="tracking-[0.25em] text-[11px] font-bold text-white/40 mt-7 mb-3">CONTACT</p>
        <div className="space-y-2.5 text-[14px]">
          <p>✉️ <span className="text-[#C9A86A]">info@cleverbiz.com.ng</span></p>
          <p>✉️ <span className="text-[#C9A86A]">cleverbizsynergy@gmail.com</span></p>
          <p>📞 <span className="text-white/80">+234 808 8735 444</span></p>
          <p>📍 <span className="text-white/80">Adigbe, Abeokuta • Akowonjo, Lagos • Nigeria</span></p>
        </div>

        {/* COMPANY + SUPPORT - Compact, 2 columns, no long list */}
        <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-white/10">
          <div>
            <p className="tracking-[0.25em] text-[11px] font-bold text-white/40 mb-3">COMPANY</p>
            <div className="space-y-2 text-[13px] text-white/70">
              <Link href="/about" className="block">About Us</Link>
              <Link href="/services" className="block">Our Services</Link>
              <Link href="/properties" className="block">Properties</Link>
              <Link href="/careers" className="block">Careers / Join As Agent</Link>
              <Link href="/contact" className="block">Contact Us</Link>
            </div>
          </div>
          <div>
            <p className="tracking-[0.25em] text-[11px] font-bold text-white/40 mb-3">SUPPORT</p>
            <div className="space-y-2 text-[13px] text-white/70">
              <Link href="/help" className="block">Help Center / FAQs</Link>
              <Link href="/privacy" className="block">Privacy Policy</Link>
              <Link href="/terms" className="block">Terms of Service</Link>
              <Link href="/refund" className="block">Refund Policy</Link>
              <Link href="/cookies" className="block">Cookie Policy</Link>
            </div>
          </div>
        </div>

        {/* BOTTOM LINKS - Like Zamari bottom */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-8 pt-5 border-t border-white/10 text-[12px] text-white/40">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/properties" className="text-[#C9A86A] font-bold">Buy with Clever-Biz</Link>
          <Link href="/login">• Admin</Link>
        </div>

        <p className="text-[11px] text-white/30 mt-3">© {new Date().getFullYear()} Clever Biz Synergy Links Nig. Ltd. All rights reserved. RC: 1238707 • Receipt protected.</p>
      </div>
    </footer>
  );
                }
