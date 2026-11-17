"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import BottomNav from "@/components/BottomNav";
export const dynamic = "force-dynamic";

export default function Dashboard() {
  const [stats, setStats] = useState({ properties: 0, tenants: 0, totalCollected: 0, totalRentExpected: 0 });
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const { data: props } = await supabase.from("properties").select("id");
      const { data: tenants } = await supabase.from("tenants").select("rent");
      const { data: pays } = await supabase.from("payments").select("*").order("id", { ascending: false }).limit(3);
      const totalRent = (tenants || []).reduce((s:number,t:any)=>s+(Number(t.rent)||0),0);
      const totalPaid = (await supabase.from("payments").select("amount")).data?.reduce((s:number,p:any)=>s+Number(p.amount||0),0) || 0;
      setStats({ properties: props?.length||0, tenants: tenants?.length||0, totalCollected: totalPaid, totalRentExpected: totalRent });
      setRecent(pays||[]);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen pb-32">
      {/* TOP */}
      <div className="bg-[#0F2A1A] text-white px-5 pt-6 pb-16 rounded-b-[32px]">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex gap-3 items-center">
            <div className="w-11 h-11 bg-[#FF6B00] rounded-2xl flex items-center justify-center text-xl font-black">C</div>
            <div><p className="font-black leading-none">CLEVER-BIZ</p><p className="text-[11px] text-white/60 mt-1">RC 1238707 • Abeokuta & Lagos</p></div>
          </div>
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">🔔</div>
        </div>
        <div className="max-w-6xl mx-auto mt-6">
          <p className="text-white/60 text-sm">Good afternoon,</p>
          <p className="text-[26px] font-black leading-tight">Habeeb 👋</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 -mt-10">
        {/* MONEY CARD */}
        <div className="bg-white rounded-[26px] p-5 shadow-[0_15px_40px_rgba(0,0,0,0.08)] border">
          <p className="text-xs text-gray-500 font-semibold">TOTAL COLLECTED</p>
          <p className="text-[34px] font-black tracking-tight">₦{stats.totalCollected.toLocaleString()}</p>
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-[#F6F7F2] rounded-2xl p-3"><p className="text-[11px] text-gray-500">Properties</p><p className="font-black text-lg">{stats.properties}</p></div>
            <div className="bg-[#F6F7F2] rounded-2xl p-3"><p className="text-[11px] text-gray-500">Tenants</p><p className="font-black text-lg">{stats.tenants}</p></div>
            <div className="bg-[#FFF1E6] rounded-2xl p-3"><p className="text-[11px] text-orange-600">Outstanding</p><p className="font-black text-lg text-[#FF6B00]">₦{(stats.totalRentExpected-stats.totalCollected).toLocaleString()}</p></div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <p className="font-black mt-6 mb-3">Quick Actions</p>
        <div className="grid grid-cols-4 gap-3">
          {[
            { href:"/properties", icon:"🏠", label:"Property" },
            { href:"/tenants", icon:"👥", label:"Tenant" },
            { href:"/payments", icon:"🧾", label:"Payment" },
            { href:"/sales", icon:"💰", label:"Sale" },
          ].map(a=>(
            <Link key={a.href} href={a.href} className="card p-3 text-center">
              <div className="w-11 h-11 mx-auto bg-[#0F2A1A] rounded-2xl flex items-center justify-center text-xl">{a.icon}</div>
              <p className="text-[11px] font-bold mt-2">{a.label}</p>
            </Link>
          ))}
        </div>

        {/* RECENT */}
        <p className="font-black mt-6 mb-3">Recent Payments</p>
        <div className="card divide-y">
          {recent.length===0 && <p className="p-4 text-sm text-gray-500">No payments yet. Add one to see am here.</p>}
          {recent.map((p:any)=>(
            <div key={p.id} className="p-4 flex justify-between items-center">
              <div className="flex gap-3 items-center"><div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">✓</div><div><p className="font-bold text-sm">{p.tenant_name}</p><p className="text-xs text-gray-500">{p.for_what}</p></div></div>
              <p className="font-black text-green-600 text-sm">+₦{Number(p.amount).toLocaleString()}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link href="/properties" className="mt-5 block bg-[#0F2A1A] text-white rounded-[22px] p-5 flex justify-between items-center">
          <div><p className="font-black">List new property</p><p className="text-xs text-white/60 mt-1">Add photo + price in 30 seconds</p></div>
          <div className="w-10 h-10 bg-[#FF6B00] rounded-full flex items-center justify-center text-xl">→</div>
        </Link>
      </div>
      <BottomNav />
    </div>
  );
        }
