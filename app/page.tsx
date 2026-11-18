"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Footer from "@/components/Footer";
export const dynamic = "force-dynamic";

export default function Home() {
  const [list, setList] = useState<any[]>([]);
  const [filterType, setFilterType] = useState("All");
  const [filterTag, setFilterTag] = useState("All");

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("properties").select("*").order("id", { ascending: false });
      if (data) setList(data);
    }
    load();
  }, []);

  const filtered = list.filter((p) => {
    if (filterType !== "All" && p.type !== filterType) return false;
    if (filterTag !== "All") {
      if (filterTag === "Rent - TO LET" && p.tag !== "TO LET") return false;
      if (filterTag === "Sale - FOR SALE" && p.tag !== "FOR SALE") return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8F6F1]">
      <header className="bg-[#0B2B1E] text-white sticky top-0 z-50 border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-2.5 max-w-6xl mx-auto">
          <Link href="/" className="flex items-center">
            <div className="bg-[#F8F6F1] rounded-[14px] px-3 py-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.25)]">
              <img src="/logo.png" alt="Clever-Biz" className="h-[42px] md:h-[48px] w-auto object-contain" />
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-[13px] font-bold text-white/80">Login</Link>
            <Link href="/dashboard" className="text-[13px] font-bold bg-[#FF6B00] text-white px-4 py-2.5 rounded-full">Dashboard →</Link>
          </div>
        </div>
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#FF8A2A]/60 to-transparent" />
      </header>

      {/* HERO - HOUSE NOW VISIBLE */}
      <section className="relative text-white px-5 pt-10 pb-14 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop" alt="Luxury House" className="absolute inset-0 w-full h-full object-cover brightness-[1.1]" />
        {/* LIGHT OVERLAY - House go show */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#071F15]/60 via-[#0B2B1E]/45 to-[#071F15]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071F15]/70 via-[#071F15]/15 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#FFD700]/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[70px] bg-gradient-to-t from-[#F8F6F1] to-transparent" />

        <div className="max-w-6xl mx-auto relative">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-gradient-to-r from-[#FFD700] to-[#FF6B00]" />
            <p className="text-[#FFB877] font-bold text-[11px] tracking-[0.28em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">10 YEARS OF TRUST • SERVICE ABOVE SELF</p>
          </div>
          <h1 className="text-[42px] leading-[1.05] md:text-[64px] font-black mt-5 tracking-tight drop-shadow-[0_6px_20px_rgba(0,0,0,0.8)]">
            Find Your Perfect<br />Home With <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFE9A8] via-[#FF8A2A] to-[#FF6B00]">Clever-Biz</span>
          </h1>
          <p className="text-white mt-4 max-w-[430px] text-[15px] leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] font-medium">
            Rent, Buy Land & Houses with verified documents. No Omo Onile. Deed, Survey & Family Receipt included.
          </p>

          <div className="flex gap-2 mt-5">
            <div className="relative w-[110px] h-[70px] rounded-[12px] overflow-hidden border-2 border-white/50 shadow-xl"><img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" /><span className="absolute bottom-1 left-1 bg-black/70 text-[9px] font-bold px-1.5 py-0.5 rounded-full">EXTERIOR</span></div>
            <div className="relative w-[110px] h-[70px] rounded-[12px] overflow-hidden border-2 border-white/50 shadow-xl"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" /><span className="absolute bottom-1 left-1 bg-black/70 text-[9px] font-bold px-1.5 py-0.5 rounded-full">INTERIOR</span></div>
            <div className="relative w-[110px] h-[70px] rounded-[12px] overflow-hidden border-2 border-[#FFD700] shadow-xl"><img src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" /><span className="absolute bottom-1 left-1 bg-[#FF6B00] text-[9px] font-bold px-1.5 py-0.5 rounded-full">LUXURY</span></div>
          </div>

          <div className="flex flex-wrap gap-2 mt-5">
            {["✓ Deed of Assignment", "✓ Registered Survey", "✓ Family Receipt", "✓ 24/7 Support"].map(t => (
              <span key={t} className="bg-black/50 backdrop-blur-md border border-white/30 text-[11px] font-medium px-3 py-1.5 rounded-full text-white">{t}</span>
            ))}
          </div>

          <div className="bg-white text-black rounded-[24px] p-4 mt-6 shadow-[0_30px_70px_rgba(0,0,0,0.55)] border border-[#FFD700]/40 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FFD700] via-[#FF6B00] to-[#FFD700]" />
            <p className="text-[11px] font-black tracking-[0.22em] text-[#0B2B1E]/50 px-1 mb-2.5">SEARCH VERIFIED PROPERTIES</p>
            <div className="grid md:grid-cols-4 gap-2.5">
              <div className="bg-[#F8F6F1] rounded-[14px] px-3 py-1.5 border border-black/5"><label className="text-[9px] font-black tracking-widest text-black/40">TYPE</label><select value={filterTag} onChange={(e) => setFilterTag(e.target.value)} className="bg-transparent w-full text-[14px] font-medium outline-none pb-0.5"><option>All</option><option>Rent - TO LET</option><option>Sale - FOR SALE</option></select></div>
              <div className="bg-[#F8F6F1] rounded-[14px] px-3 py-1.5 border border-black/5"><label className="text-[9px] font-black tracking-widest text-black/40">CATEGORY</label><select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="bg-transparent w-full text-[14px] font-medium outline-none pb-0.5"><option>All</option><option>House</option><option>Land</option><option>Apartment</option><option>Shop</option></select></div>
              <div className="bg-[#F8F6F1] rounded-[14px] px-3 py-1.5 border border-black/5"><label className="text-[9px] font-black tracking-widest text-black/40">CITY</label><select className="bg-transparent w-full text-[14px] font-medium outline-none pb-0.5"><option>Abeokuta & Lagos</option><option>Abeokuta</option><option>Lagos</option></select></div>
              <div className="bg-[#F8F6F1] rounded-[14px] px-3 py-1.5 border border-black/5"><label className="text-[9px] font-black tracking-widest text-black/40">AREA</label><select className="bg-transparent w-full text-[14px] font-medium outline-none pb-0.5"><option>All Areas</option><option>Adigbe</option><option>Kobape</option><option>Akowonjo</option><option>Shasha</option></select></div>
            </div>
            <p className="bg-gradient-to-r from-[#0B2B1E] to-[#1A5C3F] text-white text-center font-bold py-3.5 rounded-[14px] mt-3 text-[14px] tracking-wide shadow-lg">Showing {filtered.length} Properties Below <span className="text-[#FFB877]">↓</span></p>
          </div>

          <div className="flex gap-7 mt-6">
            <div><p className="font-black text-[19px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">500+</p><p className="text-[10px] tracking-[0.18em] text-white/80">HAPPY CLIENTS</p></div>
            <div><p className="font-black text-[19px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">10+ <span className="text-[#FFB877]">Years</span></p><p className="text-[10px] tracking-[0.18em] text-white/80">OF TRUST</p></div>
            <div><p className="font-black text-[19px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">100%</p><p className="text-[10px] tracking-[0.18em] text-white/80">VERIFIED</p></div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-10">
        <p className="text-[#FF6B00] font-bold text-[11px] tracking-[0.25em]">PROPERTY</p>
        <h2 className="text-[26px] font-black text-[#0B2B1E] tracking-tight">Latest Listings</h2>
        {filtered.length === 0 && <p className="text-gray-500 text-sm mt-4 bg-white p-4 rounded-2xl shadow-sm">No properties yet for this filter.</p>}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {filtered.map((p) => {
            const gallery = p.image_urls?.length ? p.image_urls : (p.image_url ? [p.image_url] : []);
            const cover = gallery[0] || "";
            return (
              <div key={p.id} className="bg-white rounded-[20px] overflow-hidden shadow-[0_10px_30px_rgba(11,43,30,0.08)] border border-black/5">
                <div className="h-40 bg-[#0B2B1E] flex items-center justify-center relative overflow-hidden">
                  {cover ? <img src={cover} className="w-full h-full object-cover" /> : <span className="text-5xl">🏠</span>}
                  <span className={`absolute top-3 left-3 text-[10px] font-black tracking-widest px-2.5 py-1 rounded-full ${p.tag === "TO LET" ? "bg-[#FF6B00] text-white" : "bg-white text-[#0B2B1E]"}`}>{p.tag}</span>
                  {gallery.length > 1 && <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded-full">📸 {gallery.length}</span>}
                </div>
                <div className="p-4">
                  <p className="font-bold text-[15px] text-[#0B2B1E]">{p.title}</p>
                  <p className="text-[13px] text-gray-500">📍 {p.location}</p>
                  <p className="text-[11px] text-gray-400 mt-1">{p.type} • {p.beds}</p>
                  <p className="font-black text-[#0B2B1E] mt-2">₦{Number(p.price).toLocaleString()} {p.tag === "TO LET" ? <span className="text-[11px] font-medium text-gray-400">/ year</span> : ""}</p>
                  <Link href={`/properties/${p.id}`} className="block text-center mt-3 bg-[#0B2B1E] text-white text-[13px] font-bold py-2.5 rounded-full hover:bg-[#FF6B00] transition">View Details →</Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-10 px-5">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#FF6B00] font-bold text-[11px] tracking-[0.25em]">WHAT WE DO</p>
          <h2 className="text-[26px] font-black text-[#0B2B1E]">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-5">
            {[["🏠", "Real Estate Management", "Letting, buying, leasing & finding your dream accommodation."],["🧱", "Building Materials", "Hardware, tools, doors, gates, railings & more."],["🚗", "Automobile Sales", "Toyota, Honda, Lexus, Land Rover, KIA, Mercedes & more."]].map(([icon, title, desc]) => (
              <div key={title} className="bg-[#F8F6F1] p-5 rounded-[20px] border border-black/5"><p className="text-[28px]">{icon}</p><h3 className="font-bold mt-2 text-[#0B2B1E]">{title}</h3><p className="text-[13px] text-gray-500 mt-1 leading-relaxed">{desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-10">
        <h2 className="text-[26px] font-black text-[#0B2B1E]">Why Clever-Biz?</h2>
        <p className="text-gray-500 text-[13px] mt-1">We understand the dynamics of the property market.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
          {["TRUST", "ACCOUNTABILITY", "LOVE", "24/7 SUPPORT"].map((v) => (
            <div key={v} className="bg-white border border-black/5 rounded-[16px] p-4 text-center font-black text-[12px] tracking-widest text-[#0B2B1E] shadow-sm">✓ {v}</div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
