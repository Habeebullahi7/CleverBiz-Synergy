"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import BottomNav from "@/components/BottomNav";

export const dynamic = "force-dynamic";

export default function Sales() {
  const [list, setList] = useState<any[]>([]);
  const [buyer, setBuyer] = useState("");
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Land");
  const [location, setLocation] = useState("Kobape, Abeokuta");
  const [loading, setLoading] = useState(false);

  async function load() {
    const { data } = await supabase.from("sales").select("*").order("id", { ascending: false });
    if (data) setList(data);
  }
  useEffect(() => { load(); }, []);

  async function addSale() {
    if (!buyer || !amount) return alert("Fill buyer + amount");
    setLoading(true);
    const { error } = await supabase.from("sales").insert([{ buyer_name: buyer, item: item || `${type} - ${location}`, amount: Number(amount), type, location }]);
    if (error) alert(error.message);
    else { setBuyer(""); setItem(""); setAmount(""); load(); }
    setLoading(false);
  }

  function shareWhatsApp(s: any) {
    const msg = `CLEVER-BIZ SALES RECEIPT\nRC: 1238707\nReceipt #SALE-${s.id}\nBuyer: ${s.buyer_name}\nItem: ${s.item}\nLocation: ${s.location}\nAmount: ₦${Number(s.amount).toLocaleString()}\nType: ${s.type}\nThank you! - Clever Biz Synergy Links Nig. Ltd`;
    window.open(`https://wa.me/2348088735444?text=${encodeURIComponent(msg)}`, "_blank");
  }

  const totalSales = list.reduce((sum: number, s: any) => sum + Number(s.amount || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <header className="bg-[#0F2A1A] text-white px-5 py-4 flex justify-between">
        <p className="font-black">Sales - REAL DATA</p>
        <Link href="/dashboard">← Dashboard</Link>
      </header>
      <div className="max-w-6xl mx-auto px-5 py-6">
        <div className="bg-[#0F2A1A] text-white rounded-2xl p-5 flex justify-between">
          <div><p className="text-xs text-white/70">Total Sales</p><p className="text-2xl font-black">₦{totalSales.toLocaleString()}</p></div>
          <div><p className="text-xs text-white/70">Deals</p><p className="text-2xl font-black text-right">{list.length}</p></div>
        </div>

        <div className="bg-white border rounded-2xl p-4 grid gap-3 mt-4">
          <p className="font-black">+ Record New Sale</p>
          <input value={buyer} onChange={(e)=>setBuyer(e.target.value)} placeholder="Buyer Name - e.g. Mr. Ade" className="border rounded-xl p-3 w-full" />
          <input value={item} onChange={(e)=>setItem(e.target.value)} placeholder="Item - e.g. Full Plot Kobape / 4 Bed Duplex" className="border rounded-xl p-3 w-full" />
          <input value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="Amount - e.g. 8500000" type="number" className="border rounded-xl p-3 w-full" />
          <div className="grid grid-cols-2 gap-3">
            <select value={type} onChange={(e)=>setType(e.target.value)} className="border rounded-xl p-3 w-full"><option>Land</option><option>House</option><option>Building Materials</option></select>
            <select value={location} onChange={(e)=>setLocation(e.target.value)} className="border rounded-xl p-3 w-full"><option>Kobape, Abeokuta</option><option>Adigbe, Abeokuta</option><option>Akowonjo, Lagos</option><option>Shasha, Lagos</option></select>
          </div>
          <button onClick={addSale} className="bg-[#FF6B00] text-white font-bold py-3 rounded-xl">{loading ? "Saving..." : "Save Sale → Generate Receipt"}</button>
        </div>

        <div className="grid gap-3 mt-4">
          {list.length === 0 && <p className="bg-white border rounded-2xl p-4 text-gray-500 text-sm">No sales yet.</p>}
          {list.map((s)=>(
            <div key={s.id} className="bg-white border rounded-2xl p-5">
              <p className="font-black">SALE #SALE-{s.id} • {s.type}</p>
              <p className="text-sm text-gray-600 mt-1">Buyer: <b>{s.buyer_name}</b> • <b>₦{Number(s.amount).toLocaleString()}</b></p>
              <p className="text-sm text-gray-500">{s.item} • {s.location}</p>
              <button onClick={()=>shareWhatsApp(s)} className="bg-[#25D366] text-white font-bold px-4 py-2 rounded-lg text-sm mt-3">Share Receipt on WhatsApp →</button>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
          }
