"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import BottomNav from "@/components/BottomNav";

export const dynamic = "force-dynamic";

export default function Dashboard() {
  const [stats, setStats] = useState({ properties: 0, tenants: 0, totalCollected: 0, totalRentExpected: 0 });

  useEffect(() => {
    async function load() {
      const { data: props } = await supabase.from("properties").select("id");
      const { data: tenants } = await supabase.from("tenants").select("rent");
      const { data: pays } = await supabase.from("payments").select("amount");
      const totalRent = (tenants || []).reduce((s: number, t: any) => s + (Number(t.rent) || 0), 0);
      const totalPaid = (pays || []).reduce((s: number, p: any) => s + (Number(p.amount) || 0), 0);
      setStats({ properties: props?.length || 0, tenants: tenants?.length || 0, totalCollected: totalPaid, totalRentExpected: totalRent });
    }
    load();
  }, []);

  const outstanding = stats.totalRentExpected - stats.totalCollected;

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <header className="bg-[#0F2A1A] text-white px-5 py-4 flex justify-between items-center">
        <p className="font-black text-lg">CLEVER-BIZ • PropertyPro</p>
        <Link href="/" className="text-sm underline">Home</Link>
      </header>
      <div className="max-w-6xl mx-auto px-5 py-6">
        <p className="text-2xl font-black">Welcome back, Habeeb 👋</p>
        <p className="text-sm text-gray-500">RC: 1238707 • Live data from Supabase</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
          <div className="bg-white border rounded-2xl p-4"><p className="text-xs text-gray-500">Properties</p><p className="text-2xl font-black">{stats.properties}</p></div>
          <div className="bg-white border rounded-2xl p-4"><p className="text-xs text-gray-500">Tenants</p><p className="text-2xl font-black">{stats.tenants}</p></div>
          <div className="bg-white border rounded-2xl p-4"><p className="text-xs text-gray-500">Total Collected</p><p className="text-2xl font-black text-green-600">₦{stats.totalCollected.toLocaleString()}</p></div>
          <div className="bg-white border rounded-2xl p-4"><p className="text-xs text-gray-500">Outstanding</p><p className="text-2xl font-black text-red-600">₦{outstanding.toLocaleString()}</p></div>
        </div>
        <div className="grid md:grid-cols-4 gap-3 mt-5">
          <Link href="/properties" className="bg-[#0F2A1A] text-white rounded-2xl p-5"><p className="text-3xl">🏠</p><p className="font-bold mt-2">Properties</p><p className="text-xs text-white/70">Add / View</p></Link>
          <Link href="/tenants" className="bg-white border rounded-2xl p-5"><p className="text-3xl">👥</p><p className="font-bold mt-2">Tenants</p><p className="text-xs text-gray-500">Add / View</p></Link>
          <Link href="/payments" className="bg-white border rounded-2xl p-5"><p className="text-3xl">🧾</p><p className="font-bold mt-2">Payments</p><p className="text-xs text-gray-500">Receipts + WhatsApp</p></Link>
          <Link href="/sales" className="bg-white border rounded-2xl p-5"><p className="text-3xl">💰</p><p className="font-bold mt-2">Sales</p><p className="text-xs text-gray-500">Land / House Sales</p></Link>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
