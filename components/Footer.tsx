import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0F2A1A] text-white mt-10">
      {/* TOP */}
      <div className="max-w-6xl mx-auto px-5 py-8 grid md:grid-cols-4 gap-8">
        <div>
          <p className="font-black text-xl leading-tight">Clever Biz <span className="text-[#FF6B00]">Synergy Links Nig. Ltd.</span></p>
          <p className="text-xs text-white/60 mt-1">RC: 1238707</p>
          <p className="text-sm text-white/70 mt-3">Trusted property partner for Land, Houses, Shops & Cars in Ogun & Lagos. We understand the dynamics of the property market.</p>
          <div className="flex gap-2 mt-4">
            <span className="bg-white/10 px-2.5 py-1 rounded-full text-[11px] font-bold">✓ TRUST</span>
            <span className="bg-white/10 px-2.5 py-1 rounded-full text-[11px] font-bold">✓ ACCOUNTABILITY</span>
          </div>
          <div className="flex gap-2 mt-2">
            <span className="bg-white/10 px-2.5 py-1 rounded-full text-[11px] font-bold">✓ LOVE</span>
            <span className="bg-white/10 px-2.5 py-1 rounded-full text-[11px] font-bold">✓ 24/7 SUPPORT</span>
          </div>
        </div>

        <div>
          <p className="font-black text-sm mb-3">Company</p>
          <div className="space-y-2 text-sm text-white/70">
            <Link href="/about" className="block hover:text-white">About Us</Link>
            <Link href="/services" className="block hover:text-white">Our Services</Link>
            <Link href="/properties" className="block hover:text-white">Properties</Link>
            <Link href="/contact" className="block hover:text-white">Contact Us</Link>
            <Link href="/careers" className="block hover:text-white">Careers / Join As Agent</Link>
          </div>
        </div>

        <div>
          <p className="font-black text-sm mb-3">Support</p>
          <div className="space-y-2 text-sm text-white/70">
            <Link href="/help" className="block hover:text-white">Help Center / FAQs</Link>
            <Link href="/privacy" className="block hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="block hover:text-white">Terms of Service</Link>
            <Link href="/refund" className="block hover:text-white">Refund & Payment Policy</Link>
            <Link href="/cookies" className="block hover:text-white">Cookie Policy</Link>
          </div>
        </div>

        <div>
          <p className="font-black text-sm mb-3">Contact</p>
          <p className="text-sm text-white/70">📞 +234 808 8735 444</p>
          <p className="text-sm text-white/70 mt-1">✉️ info@cleverbiz.com.ng</p>
          <p className="text-sm text-white/70 mt-1">🌐 www.cleverbiz.com.ng</p>
          <p className="font-bold text-sm mt-4">Head Office</p>
          <p className="text-sm text-white/60">Clever-Biz Plaza, Along Idi-Mango Road, Afobaja Junction, Adigbe, Abeokuta, Ogun State.</p>
          <p className="font-bold text-sm mt-3">Branch Office</p>
          <p className="text-sm text-white/60">3 Church St, Akowonjo, 102213, Lagos, Nigeria.</p>
          <a href="https://wa.me/2348088735444?text=Hello Clever-Biz" target="_blank" className="inline-block bg-[#25D366] text-white font-bold text-sm px-4 py-2.5 rounded-full mt-4">Chat on WhatsApp →</a>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-5 py-4 flex flex-col md:flex-row justify-between items-center gap-2 text-center">
          <p className="text-xs text-white/50">© {new Date().getFullYear()} Clever Biz Synergy Links Nig. Ltd. All rights reserved. RC: 1238707</p>
          <div className="flex gap-4 text-xs text-white/60">
            <Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/cookies">Cookies</Link><Link href="/about">About</Link>
          </div>
        </div>
      </div>
    </footer>
  );
            }
