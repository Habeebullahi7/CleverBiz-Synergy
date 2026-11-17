"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default function Payments() {
  const [list, setList] = useState<any[]>([]);
  const [tenantName, setTenantName] = useState("");
  const [amount, setAmount] = useState("");
  const [forWhat, setForWhat] = useState("Rent - Adigbe");
  const [loading, setLoading] = useState(false);

  async function load() {
    const { data } = await supabase.from("payments").select("*").order("id", { ascending: false });
    if (data) setList(data);
  }
  useEffect(() => { load(); }, []);

  async function addPayment() {
    if (!tenantName || !amount) return alert("Fill name + amount");
    setLoading(true);
    const { error } = await supabase.from("payments").insert([
      { tenant_name: tenantName, amount: Number(amount), for_what: forWhat }
    ]);
    if (error) alert(error.message);
    else { setTenantName(""); setAmount(""); load(); }
    setLoading(false);
  }

  function shareWhatsApp(p: any) {
    const msg = `CLEVER-BIZ RECEIPT\nRC: 1238707\nReceipt #CB-${p.id}\nReceived from: ${p.tenant_name}\nAmount: ₦${Number(p.amount).toLocaleString()}\nFor: ${p.for_what}\nDate: ${p.date || p.created_at?.slice(0,10)}\nThank you! - Clever Biz Synergy Links Nig. Ltd`;
    window.open(`https://wa.me/2348088735444?text=${encodeURIComponent(msg)}`, "_blank");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#0F2A1A] text-white px-5 py-4 flex justify-between">
        <p className="font-black">Payments & Receipts - REAL</p>
        <Link href="/dashboard">← Dashboard</Link>
      </header>

      <div className="max-w-6xl mx-auto px-5 py-6">
        {/* ADD PAYMENT */}
        <div className="bg-white border rounded-2xl p-4 grid gap-3">
          <p className="font-black">+ Record New Payment</p>
          <input value={tenantName} onChange={(e)=>setTenantName(e.target.value)} placeholder="Tenant / Buyer Name" className="border rounded-xl p-3 w-full" />
          <input value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="Amount - e.g. 2500000" type="number" className="border rounded-xl p-3 w-full" />
          <select value={forWhat} onChange={(e)=>setForWhat(e.target.value)} className="border rounded-xl p-3 w-full">
            <option>Rent - Adigbe</option>
            <option>Rent - Akowonjo</option>
            <option>Land Sale - Kobape</option>
            <option>House Sale</option>
            <option>Building Materials</option>
          </select>
          <button onClick={addPayment} className="bg-[#FF6B00] text-white font-bold py-3 rounded-xl">
            {loading ? "Saving..." : "Save Payment → Generate Receipt"}
          </button>
        </div>

        {/* RECEIPTS LIST */}
        <div className="grid gap-3 mt-5">
          {list.length === 0 && <p className="bg-white border rounded-2xl p-4 text-gray-500 text-sm">No payments yet.</p>}
          {list.map((p)=>(
            <div key={p.id} className="bg-white border rounded-2xl p-5">
              <p className="text-xs text-gray-500">CLEVER BIZ SYNERGY LINKS NIG. LTD • RC: 1238707</p>
              <p className="font-black mt-1">RECEIPT #CB-{p.id}</p>
              <p className="text-sm text-gray-600 mt-1">Received from: <b>{p.tenant_name}</b> • Amount: <b>₦{Number(p.amount).toLocaleString()}</b></p>
              <p className="text-sm text-gray-500">For: {p.for_what} • Date: {p.date || p.created_at?.slice(0,10)}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={()=>shareWhatsApp(p)} className="bg-[#25D366] text-white font-bold px-4 py-2 rounded-lg text-sm">Share on WhatsApp →</button>
                <button onClick={()=>window.print()} className="border font-bold px-4 py-2 rounded-lg text-sm">Print</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
                                                                                                                          }
