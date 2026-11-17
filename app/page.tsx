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
      {/* HEADER - Deep Green Luxury */}
      <header className="bg-[#0B2B1E] text-white sticky top-0 z-50 border-b border-white/10">
        <div className="flex items-center justify-between px-5 py-3.5 max-w-6xl mx-auto">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF8A2A] to-[#C94E00] rounded-[10px] flex items-center justify-center text-white font-black text-[20px] shadow-[0_8px_20px_rgba(255,107,0,0.35)]">C</div>
            <div>
              <p className="font-black leading-none tracking-[0.08em] text-[14px]">CLEVER-BIZ <span className="text-[#FF8A2A]">PropertyPro</span></p>
              <p className="text-[9px] tracking-[0.18em] text-white/50 mt-1">RC: 1238707 • SYNERGY LINKS NIG. LTD</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-[13px] font-bold text-white/80">Login</Link>
            <Link href="/dashboard" className="text-[13px] font-bold bg-[#FF6B00] text-white px-4 py-2.5 rounded-full shadow-[0_8px_20px_rgba(255,107,0,0.3)]">Dashboard →</Link>
          </div>
        </div>
      </header>

      {/* HERO - Deep Green + Eloquent Orange */}
      <section className="bg-[#0B2B1E] text-white px-5 pt-10 pb-14 relative overflow-hidden">
        {/* Soft luxury glows - green + orange */}
        <div className="absolute -top-24 -right-24 w-[320px] h-[320px] bg-[#FF6B00]/20 blur-[90px] rounded-full pointer-events-none" />
        <div className="absolute top-52 -left-24 w-[220px] h-[220px] bg-[#1A5C3F]/60 blur-[70px] rounded-full pointer-events-none" />
        {/* Fine gold line texture */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF8A2A]/50 to-transparent" />

        <div className="max-w-6xl mx-auto relative">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-[#FF8A2A]" />
            <p className="text-[#FF8A2A] font-bold text-[11px] tracking-[0.28em]">10 YEARS OF TRUST • SERVICE ABOVE SELF</p>
          </div>

          <h1 className="text-[42px] leading-[1.05] md:text-[64px] font-black mt-5 tracking-tight">
            Find Your Perfect<br />
            Home With <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB877] via-[#FF6B00] to-[#D14E00]">Clever-Biz</span>
          </h1>

          <p className="text-white/60 mt-4 max-w-[430px] text-[15px] leading-relaxed">
            Rent, Buy Land & Houses with verified documents. No Omo Onile. Deed, Survey & Family Receipt included.
          </p>

          {/* Trust pills - elegant */}
          <div className="flex flex-wrap gap-2 mt-5">
            {["✓ Deed of Assignment", "✓ Registered Survey", "✓ Family Receipt", "✓ 24/7 Support"].map(t => (
              <span key={t} className="bg-white/[0.07] border border-white/10 text-[11px] font-medium px-3 py-1.5 rounded-full text-white/80 backdrop-blur">{t}</span>
            ))}
          </div>

          {/* LUXURY SEARCH CARD - Cream + Green + Orange */}
          <div className="bg-white text-black rounded-[24px] p-4 mt-7 shadow-[0_24px_60px_rgba(0,0,0,0.45)] border border-[#FF6B00]/10">
            <p className="text-[11px] font-black tracking-[0.22em] text-[#0B2B1E]/50 px-1 mb-2.5">SEARCH VERIFIED PROPERTIES</p>
            <div className="grid md:grid-cols-4 gap-2.5">
              <div className="bg-[#F8F6F1] rounded-[14px] px-3 py-1.5 border border-black/5">
                <label className="text-[9px] font-black tracking-widest text-black/40">TYPE</label>
                <select value={filterTag} onChange={(e) => setFilterTag(e.target.value)} className="bg-transparent w-full text-[14px] font-medium outline-none pb-0.5"><option>All</option><option>Rent - TO LET</option><option>Sale - FOR SALE</option></select>
              </div>
              <div className="bg-[#F8F6F1] rounded-[14px] px-3 py-1.5 border border-black/5">
                <label className="text-[9px] font-black tracking-widest text-black/40">CATEGORY</label>
                <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="bg-transparent w-full text-[14px] font-medium outline-none pb-0.5"><option>All</option><option>House</option><option>Land</option><option>Apartment</option><option>Shop</option></select>
              </div>
              <div className="bg-[#F8F6F1] rounded-[14px] px-3 py-1.5 border border-black/5">
                <label className="text-[9px] font-black tracking-widest text-black/40">CITY</label>
                <select className="bg-transparent w-full text-[14px] font-medium outline-none pb-0.5"><option>Abeokuta & Lagos</option><option>Abeokuta</option><option>Lagos</option></select>
              </div>
              <div className="bg-[#F8F6F1] rounded-[14px] px-3 py-1.5 border border-black/5">
                <label className="text-[9px] font-black tracking-widest text-black/40">AREA</label>
                <select className="bg-transparent w-full text-[14px] font-medium outline-none pb-0.5"><option>All Areas</option><option>Adigbe</option><option>Kobape</option><option>Akowonjo</option><option>Shasha</option></select>
              </div>
            </div>
            <p className="bg-[#0B2B1E] text-white text-center font-bold py-3.5 rounded-[14px] mt-3 text-[14px] tracking-wide">Showing {filtered.length} Properties Below <span className="text-[#FF8A2A]">↓</span></p>
          </div>

          {/* Stats - elegant */}
          <div className="flex gap-7 mt-6">
            <div><p className="font-black text-[19px]">500+</p><p className="text-[10px] tracking-[0.18em] text-white/50">HAPPY CLIENTS</p></div>
            <div><p className="font-black text-[19px]">10+ <span className="text-[#FF8A2A]">Years</span></p><p className="text-[10px] tracking-[0.18em] text-white/50">OF TRUST</p></div>
            <div><p className="font-black text-[19px]">100%</p><p className="text-[10px] tracking-[0.18em] text-white/50">VERIFIED</p></div>
          </div>
        </div>
      </section>

      {/* LISTINGS */}
      <section className="max-w-6xl mx-auto px-5 py-10">
        <p className="text-[#FF6B00] font-bold text-[11px] tracking-[0.25em]">PROPERTY</p>
        <h2 className="text-[26px] font-black text-[#0B2B1E] tracking-tight">Latest Listings</h2>
        {filtered.length === 0 && <p className="text-gray-500 text-sm mt-4 bg-white p-4 rounded-2xl shadow-sm">No properties yet for this filter. Go to /properties and add one with photos.</p>}
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

      {/* SERVICES */}
      <section className="bg-white py-10 px-5">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#FF6B00] font-bold text-[11px] tracking-[0.25em]">WHAT WE DO</p>
          <h2 className="text-[26px] font-black text-[#0B2B1E]">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-5">
            {[
              ["🏠", "Real Estate Management", "Letting, buying, leasing & finding your dream accommodation."],
              ["🧱", "Building Materials", "Hardware, tools, doors, gates, railings & more."],
              ["🚗", "Automobile Sales", "Toyota, Honda, Lexus, Land Rover, KIA, Mercedes & more."],
            ].map(([icon, title, desc]) => (
              <div key={title} className="bg-[#F8F6F1] p-5 rounded-[20px] border border-black/5">
                <p className="text-[28px]">{icon}</p>
                <h3 className="font-bold mt-2 text-[#0B2B1E]">{title}</h3>
                <p className="text-[13px] text-gray-500 mt-1 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
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
