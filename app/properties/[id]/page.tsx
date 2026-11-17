"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
export const dynamic = "force-dynamic";
export default function Details() {
  const { id } = useParams();
  const [p, setP] = useState<any>(null);
  const [main, setMain] = useState(0);
  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("properties").select("*").eq("id", id).single();
      if (data) setP(data);
    }
    if (id) load();
  }, [id]);
  if (!p) return <p className="p-5">Loading...</p>;
  const gallery = p.image_urls?.length ? p.image_urls : (p.image_url ? [p.image_url] : []);
  const msg = encodeURIComponent(`Hello Clever-Biz, I want to inspect ${p.title} at ${p.location} - ₦${Number(p.price).toLocaleString()}`);
  return (
    <div className="min-h-screen bg-white pb-20">
      {gallery.length > 0 ? <img src={gallery[main]} className="w-full h-[320px] object-cover" /> : <div className="h-[280px] bg-[#0F2A1A] flex items-center justify-center text-7xl">🏠</div>}
      {gallery.length > 1 && (
        <div className="flex gap-2 overflow-x-auto p-3">
          {gallery.map((img: string, i: number) => (
            <img key={i} src={img} onClick={() => setMain(i)} className={`w-20 h-16 object-cover rounded-xl border-2 ${main === i ? "border-[#FF6B00]" : "border-transparent"}`} />
          ))}
        </div>
      )}
      <div className="px-5">
        <span className="bg-[#FF6B00] text-white text-xs font-bold px-3 py-1 rounded-full">{p.tag}</span>
        <h1 className="text-[26px] font-black mt-3">{p.title}</h1>
        <p className="text-gray-500">📍 {p.location} • {p.type} • {p.beds}</p>
        <p className="text-[28px] font-black text-[#FF6B00] mt-2">₦{Number(p.price).toLocaleString()}</p>
        <p className="text-sm text-gray-600 mt-3 bg-gray-50 p-4 rounded-2xl">✅ Family Receipt Available<br />✅ Verified by Clever-Biz Synergy Ltd (RC 1238707)<br />✅ Inspection available in Abeokuta & Lagos</p>
        <a href={`https://wa.me/2340000000000?text=${msg}`} className="block mt-5 bg-[#25D366] text-white text-center py-4 rounded-2xl font-black">Chat on WhatsApp →</a>
        <Link href="/" className="block mt-3 text-center text-sm text-gray-500">← Back to Home</Link>
      </div>
    </div>
  );
}
