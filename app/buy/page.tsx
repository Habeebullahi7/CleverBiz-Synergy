"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function BuyPage() {
  const [user, setUser] = useState<any>(null);
  const [props, setProps] = useState<any[]>([]);
  const router = useRouter();
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("clever_user") || "null");
    if (!u || u.role !== "Buyer") return router.push("/login");
    setUser(u);
    supabase.from("properties").select("*").eq("tag", "FOR SALE").order("id", { ascending: false }).then(({ data }) => setProps(data || []));
  }, []);
  if (!user) return <p className="p-6">Loading...</p>;
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-[#0F2A1A] text-white p-5"><p className="font-black text-xl">Properties For Sale</p><p className="text-sm text-white/60">Welcome {user.name} — Buyer</p></div>
      <div className="max-w-5xl mx-auto px-5 py-5 grid md:grid-cols-3 gap-4">
        {props.map((x: any) => (
          <div key={x.id} className="bg-white border rounded-2xl overflow-hidden">
            {x.image_url ? <img src={x.image_url} className="w-full h-36 object-cover" /> : <div className="h-24 bg-[#0F2A1A] flex items-center justify-center text-3xl">🏠</div>}
            <div className="p-4"><span className="text-[11px] font-bold bg-[#FF6B00] text-white px-2 py-1 rounded-full">FOR SALE</span><p className="font-bold mt-2">{x.title}</p><p className="text-sm text-gray-500">{x.location}</p><p className="font-black text-[#FF6B00]">₦{Number(x.price).toLocaleString()}</p><a href={`https://wa.me/2348088735444?text=${encodeURIComponent(`Hello Clever-Biz, I want to buy: ${x.title} - ₦${Number(x.price).toLocaleString()}`)}`} target="_blank" className="block text-center bg-black text-white font-bold py-2.5 rounded-xl mt-3 text-sm">I Want This →</a></div>
          </div>
        ))}
        {props.length === 0 && <p className="bg-white p-4 rounded-2xl col-span-3">No property for sale yet.</p>}
      </div>
      <button onClick={() => { localStorage.clear(); router.push("/login"); }} className="block mx-auto text-sm text-gray-500">Logout</button>
    </div>
  );
        }
