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
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between px-5 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#FF6B00] rounded-lg flex items-center justify-center text-white font-black text-xl">C</div>
          <div>
            <p className="font-black leading-none">CLEVER-BIZ <span className="text-[#FF6B00]">PropertyPro</span></p>
            <p className="text-[10px] text-gray-500">RC: 1238707 • Synergy Links Nig. Ltd</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/login" className="text-sm font-bold px-4 py-2">Login</Link>
          <Link href="/dashboard" className="text-sm font-bold bg-[#0F2A1A] text-white px-4 py-2 rounded-full">Dashboard →</Link>
        </div>
      </header>

      <section className="bg-[#0F2A1A] text-white px-5 py-12">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#FF6B00] font-bold text-sm">● 10 YEARS OF TRUST • SERVICE ABOVE SELF</p>
          <h1 className="text-4xl md:text-5xl font-black mt-3 leading-tight">Find Your Perfect<br />Home With <span className="text-[#FF6B00]">Clever-Biz</span></h1>
          <p className="text-gray-300 mt-3 max-w-lg">Rent, Buy Land & Houses with verified documents. No Omo Onile. Deed, Survey & Family Receipt included.</p>
          <div className="bg-white text-black rounded-2xl p-4 mt-6 grid md:grid-cols-4 gap-3">
            <select value={filterTag} onChange={(e) => setFilterTag(e.target.value)} className="border rounded-xl p-3 w-full"><option>All</option><option>Rent - TO LET</option><option>Sale - FOR SALE</option></select>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="border rounded-xl p-3 w-full"><option>All</option><option>House</option><option>Land</option><option>Apartment</option><option>Shop</option></select>
            <select className="border rounded-xl p-3 w-full"><option>Abeokuta & Lagos</option><option>Abeokuta</option><option>Lagos</option></select>
            <select className="border rounded-xl p-3 w-full"><option>All Areas</option><option>Adigbe</option><option>Kobape</option><option>Akowonjo</option><option>Shasha</option></select>
            <p className="md:col-span-4 bg-[#FF6B00] text-white text-center font-bold py-3 rounded-xl">Showing {filtered.length} Properties Below ↓</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-5 text-xs">
            <span className="bg-white/10 px-3 py-1.5 rounded-full">✅ Deed of Assignment</span>
            <span className="bg-white/10 px-3 py-1.5 rounded-full">✅ Registered Survey</span>
            <span className="bg-white/10 px-3 py-1.5 rounded-full">✅ Family Receipt</span>
            <span className="bg-white/10 px-3 py-1.5 rounded-full">✅ 24/7 Support</span>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-10">
        <p className="text-[#FF6B00] font-bold text-sm">PROPERTY</p>
        <h2 className="text-2xl font-black">Latest Listings</h2>
        {filtered.length === 0 && <p className="text-gray-500 text-sm mt-4 bg-gray-50 p-4 rounded-2xl">No properties yet for this filter. Go to /properties and add one with photos.</p>}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {filtered.map((p) => {
            const gallery = p.image_urls?.length ? p.image_urls : (p.image_url ? [p.image_url] : []);
            const cover = gallery[0] || "";
            return (
              <div key={p.id} className="border rounded-2xl overflow-hidden">
                <div className="h-36 bg-[#0F2A1A] flex items-center justify-center relative overflow-hidden">
                  {cover ? <img src={cover} className="w-full h-full object-cover" /> : <span className="text-5xl">🏠</span>}
                  <span className={`absolute top-3 left-3 text-[11px] font-bold px-2 py-1 rounded-full ${p.tag === "TO LET" ? "bg-[#FF6B00] text-white" : "bg-white text-black"}`}>{p.tag}</span>
                  {gallery.length > 1 && <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded-full">📸 {gallery.length}</span>}
                </div>
                <div className="p-4">
                  <p className="font-bold">{p.title}</p>
                  <p className="text-sm text-gray-500">📍 {p.location}</p>
                  <p className="text-xs text-gray-400 mt-1">{p.type} • {p.beds}</p>
                  <p className="font-black text-[#FF6B00] mt-2">₦{Number(p.price).toLocaleString()} {p.tag === "TO LET" ? "/ year" : ""}</p>
                  <Link href={`/properties/${p.id}`} className="block text-center mt-3 bg-black text-white text-sm font-bold py-2 rounded-lg">View Details →</Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-gray-50 py-10 px-5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-black">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-5">
            <div className="bg-white p-5 rounded-2xl border"><p className="text-3xl">🏠</p><h3 className="font-bold mt-2">Real Estate Management</h3><p className="text-sm text-gray-500 mt-1">Letting, buying, leasing & finding your dream accommodation.</p></div>
            <div className="bg-white p-5 rounded-2xl border"><p className="text-3xl">🧱</p><h3 className="font-bold mt-2">Building Materials</h3><p className="text-sm text-gray-500 mt-1">Hardware, tools, doors, gates, railings & more.</p></div>
            <div className="bg-white p-5 rounded-2xl border"><p className="text-3xl">🚗</p><h3 className="font-bold mt-2">Automobile Sales</h3><p className="text-sm text-gray-500 mt-1">Toyota, Honda, Lexus, Land Rover, KIA, Mercedes & more.</p></div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 py-10">
        <h2 className="text-2xl font-black">Why Clever-Biz?</h2>
        <p className="text-gray-500 text-sm mt-1">We understand the dynamics of the property market.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
          {["TRUST", "ACCOUNTABILITY", "LOVE", "24/7 SUPPORT"].map((v) => (
            <div key={v} className="border rounded-xl p-4 text-center font-bold text-sm">✓ {v}</div>
          ))}
        </div>
      </section>

      {/* NEW STANDARD FOOTER - REPLACES OLD ONE */}
      <Footer />
    </div>
  );
          }
