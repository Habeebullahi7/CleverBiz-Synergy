"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function MyHouse() {
  const [user, setUser] = useState<any>(null);
  const [myPayments, setMyPayments] = useState<any[]>([]);
  const [myTenant, setMyTenant] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("clever_user") || "null");
    if (!u || u.role !== "Tenant") return router.push("/login");
    setUser(u);
    async function load() {
      const { data: t } = await supabase.from("tenants").select("*").eq("email", u.email).single();
      setMyTenant(t);
      const { data: p } = await supabase.from("payments").select("*").eq("tenant_name", u.name).order("id", { ascending: false });
      setMyPayments(p || []);
    }
    load();
  }, []);

  if (!user) return <p className="p-6">Loading...</p>;
  const totalPaid = myPayments.reduce((s: number, p: any) => s + Number(p.amount || 0), 0);
  const rent = Number(myTenant?.rent || 0);
  const remain = Math.max(0, rent - totalPaid);

  return (
    <div className="min-h-screen bg-[#F6F7F2] pb-20">
      <div className="bg-[#0F2A1A] text-white p-5 rounded-b-[28px]">
        <p className="text-white/60 text-sm">Welcome,</p><p className="font-black text-2xl">{user.name} 👋</p><p className="text-xs text-white/60">Tenant • {user.email}</p>
      </div>
      <div className="max-w-3xl mx-auto px-5 -mt-4">
        <div className="bg-white rounded-[22px] p-5 border shadow">
          <p className="text-xs text-gray-500">MY HOUSE</p><p className="font-black text-lg">{myTenant?.property || "No house assigned yet"}</p>
          <div className="grid grid-cols-3 gap-3 mt-4 text-center">
            <div className="bg-gray-50 rounded-2xl p-3"><p className="text-[11px] text-gray-500">Rent</p><p className="font-black">₦{rent.toLocaleString()}</p></div>
            <div className="bg-green-50 rounded-2xl p-3"><p className="text-[11px] text-gray-500">Paid</p><p className="font-black text-green-600">₦{totalPaid.toLocaleString()}</p></div>
            <div className="bg-orange-50 rounded-2xl p-3"><p className="text-[11px] text-gray-500">Remain</p><p className="font-black text-orange-600">₦{remain.toLocaleString()}</p></div>
          </div>
          <a href="https://wa.me/2348088735444?text=Hello Clever-Biz, I want to pay my rent" target="_blank" className="block text-center bg-[#25D366] text-white font-bold py-3 rounded-xl mt-4">Chat Clever-Biz on WhatsApp</a>
          <button onClick={() => { localStorage.clear(); router.push("/login"); }} className="w-full mt-2 text-sm text-gray-500">Logout</button>
        </div>
        <p className="font-black mt-5 mb-2">My Receipts Only</p>
        {myPayments.map((p: any) => (
          <div key={p.id} className="bg-white border rounded-2xl p-4 mb-2 flex justify-between"><div><p className="font-bold">Receipt #CB-{p.id}</p><p className="text-xs text-gray-500">{p.for_what} • {new Date(p.created_at).toLocaleDateString()}</p></div><p className="font-black text-green-600">₦{Number(p.amount).toLocaleString()}</p></div>
        ))}
        {myPayments.length === 0 && <p className="bg-white p-4 rounded-2xl text-sm text-gray-500">No payment yet.</p>}
      </div>
    </div>
  );
             }
