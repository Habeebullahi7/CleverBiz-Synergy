import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0B2B1E] text-white mt-0">
      {/* Orange luxury line on top */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#FF8A2A]/60 to-transparent" />

      <div className="max-w-6xl mx-auto px-5 py-10">
        {/* LOGO - Same as Header */}
        <div className="bg-[#F8F6F1] rounded-[14px] px-3 py-2 inline-block shadow-[0_8px_20px_rgba(0,0,0,0.25)]">
          <img
            src="/logo.png"
            alt="Clever-Biz Synergy Links Nig. Ltd - RC: 1238707"
            className="h-[46px] w-auto object-contain"
          />
        </div>

        <p className="text-white/60 text-[13px] leading-relaxed mt-4 max-w-[400px]">
          A trusted real estate, building materials and automobile company in Abeokuta & Lagos. Service Above Self.
        </p>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-7 text-[13px]">
          <div>
            <p className="font-black tracking-[0.2em] text-[11px] text-[#FF8A2A] mb-3">QUICK LINKS</p>
            <div className="space-y-2 text-white/70">
              <Link href="/" className="block">Home</Link>
              <Link href="/properties" className="block">Properties</Link>
              <Link href="/dashboard" className="block">Dashboard</Link>
              <Link href="/login" className="block">Login</Link>
            </div>
          </div>

          <div>
            <p className="font-black tracking-[0.2em] text-[11px] text-[#FF8A2A] mb-3">SERVICES</p>
            <div className="space-y-2 text-white/70">
              <p>Real Estate Management</p>
              <p>Building Materials</p>
              <p>Automobile Sales</p>
            </div>
          </div>

          <div>
            <p className="font-black tracking-[0.2em] text-[11px] text-[#FF8A2A] mb-3">CONTACT</p>
            <div className="space-y-2 text-white/70">
              <p>📍 Abeokuta & Lagos, Nigeria</p>
              <p>📞 0703 123 4567</p>
              <p>✉️ info@cleverbiz.com</p>
              <p>🕐 Mon - Sat: 8am - 6pm</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-8 pt-5 flex flex-col md:flex-row justify-between gap-2 text-[12px] text-white/40">
          <p>© 2026 Clever-Biz Synergy Links Nig. Ltd • RC: 1238707</p>
          <p>Service Above Self • 10 Years of Trust</p>
        </div>
      </div>
    </footer>
  );
}
