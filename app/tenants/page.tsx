"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import BottomNav from "@/components/BottomNav";

export const dynamic = "force-dynamic";

export default function Tenants() {
  const [tenants, setTenants] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [property, setProperty] = useState("");
  const [rent, setRent] = useState("");
  const [loading, setLoading] = useState(false);

  async function load() {
    const { data } = await supabase.from("tenants").select("*").order("id", { ascending: false });
    if (data) setTenants(data);
  }
  useEffect(() => { load(); }, []);

  async function addTenant() {
    if (!name || !property) return alert("Fill name + property");
    setLoading(true);
    const { error } = await supabase.from("tenants").insert([{ name, property, rent: Number(rent) || 0, status: "Owing" }]);
    if (error) alert(error.message);
    else { setName(""); setProperty(""); setRent(""); load(); }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <header className="bg-[#0F2A1A] text-white px-5 py-4 flex justify-between"><p className="font-black">Tenants - REAL DATA</p><Link href="/dashboard">← Dashboard</Link></header>
      <div className="max-w-6xl mx-auto px-5 py-6">
        <div className="bg-white border rounded-2xl p-4 grid gap-3">
          <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Tenant Name - e.g. Adebayo O." className="border rounded-xl p-3 w-full" />
          <input value={property} onChange={(e)=>setProperty(e.target.value)} placeholder="Property - e.g. 4 Bed Duplex Adigbe" className="border rounded-xl p-3 w-full" />
          <input value={rent} onChange={(e)=>setRent(e.target.value)} placeholder="Rent Amount - e.g. 2500000" type="number" className="border rounded-xl p-3 w-full" />
          <button onClick={addTenant} className="bg-[#FF6B00] text-white font-bold py-3 rounded-xl">{loading ? "Saving..." : "+ Add Tenant (Save to Supabase)"}</button>
        </div>
        <div className="bg-white border rounded-2xl mt-4 overflow-hidden">
          {tenants.length === 0 && <p className="p-4 text-gray-500 text-sm">No tenants yet. Add one above.</p>}
          {tenants.map((t)=>(
            <div key={t.id} className="p-4 border-b flex justify-between items-center"><div><p className="font-bold">{t.name}</p><p className="text-sm text-gray-500">{t.property}</p><p className="text-sm font-bold">₦{Number(t.rent).toLocaleString()}</p></div><span className={`text-xs font-bold px-3 py-1 rounded-full ${t.status==="Paid"?"bg-green-100 text-green-700":"bg-red-100 text-red-600"}`}>{t.status}</span></div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
          }
