"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import BottomNav from "@/components/BottomNav";
export const dynamic = "force-dynamic";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({ properties: 0, tenants: 0, collected: 0, expected: 0, sales: 0, users: 0 });
  const [recent, setRecent] = useState<any[]>([]);
  const [saleRecent, setSaleRecent] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("clever_user") || "null");
    if (!u || u.role !== "Admin") { router.push("/login"); return; }
    setUser(u);
    async function load() {
      const { data: props } = await supabase.from("properties").select("id");
      const { data: tenants } = await supabase.from("tenants").select("rent");
      const { data: pays } = await supabase.from("payments").select("*").order("id", { ascending: false }).limit(4);
      const { data: sales } = await supabase.from("sales").select("*").order("id", { ascending: false }).limit(3);
      const { data: users } = await supabase.from("profiles").select("id");
      const totalRent = (tenants || []).reduce((s: number, t: any) => s + (Number(t.rent) || 0), 0);
      const allPays = (await supabase.from("payments").select("amount")).data || [];
      const totalPaid = allPays.reduce((s: number, p: any) => s + Number(p.amount || 0), 0);
      const allSales = (await supabase.from("sales").select("amount")).data || [];
      const totalSales = allSales.reduce((s: number, p: any) => s + Number(p.amount || 0), 0);
      setStats({ properties: props?.length || 0, tenants: tenants?.length || 0, collected: totalPaid, expected: totalRent, sales: totalSales, users: users?.length || 0 });
      setRecent(pays || []);
      setSaleRecent(sales || []);
    }
    load();
  }, [router]);

  function logout() {
    localStorage.removeItem("clever_user");
    localStorage.removeItem("clever_admin");
    router.push("/login");
  }

  if (!user) return <div className="min-h-screen bg-[#0F2A1A] flex items-center justify-center text-white font-bold">Checking Admin...</div>;

  return (
    <div className="min-h-screen pb-32 bg-[#F6F7F2]">
      <div className="bg-[#0F2A1A] text-white px-5 pt-6 pb-16 rounded-b-[32px]">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex gap-3 items-center">
            <div className="w-11 h-11 bg-[#FF6B00] rounded-2xl flex items-center justify-center text-xl font-black">C</div>
            <div><p className="font-black leading-none">CLEVER-BIZ</p><p className="text-[11px] text-white/60 mt-1">RC 1238707 • Abeokuta & Lagos</p></div>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-[10px] bg-[#FF6B00] px-2 py-1 rounded-full font-black">ADMIN</span>
            <button onClick={logout} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-sm">↪</button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-6">
          <p className="text-white/60 text-sm">Welcome back,</p>
          <p className="text-[26px] font-black">{user.name?.split(" ")[0] || "Habeeb"} 👋</p>
          <p className="text-xs text-white/60">{user.email} • Admin • {stats.users} users</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 -mt-10">
        <div className="bg-white rounded-[26px] p-5 shadow-[0_15px_40px_rgba(0,0,0,0.08)] border">
          <div className="flex justify-between items-start">
            <div><p className="text-xs text-gray-500 font-semibold">TOTAL COLLECTED (RENT)</p><p className="text-[34px] font-black leading-tight">₦{stats.collected.toLocaleString()}</p></div>
            <div className="text-right"><p className="text-xs text-gray-500 font-semibold">TOTAL SALES</p><p className="font-black text-[#FF6B00] text-lg">₦{stats.sales.toLocaleString()}</p></div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-[#F6F7F2] rounded-2xl p-3"><p className="text-[11px] text-gray-500">Properties</p><p className="font-black text-lg">{stats.properties}</p></div>
            <div className="bg-[#F6F7F2] rounded-2xl p-3"><p className="text-[11px] text-gray-500">Tenants</p><p className="font-black text-lg">{stats.tenants}</p></div>
            <div className="bg-[#FFF1E6] rounded-2xl p-3"><p className="text-[11px] text-orange-600">Outstanding</p><p className="font-black text-lg text-[#FF6B00]">₦{Math.max(0, stats.expected - stats.collected).toLocaleString()}</p></div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-[11px] text-gray-500 mb-1"><span>Collection Progress</span><span>{stats.expected > 0 ? Math.round((stats.collected / stats.expected) * 100) : 0}%</span></div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-[#FF6B00] rounded-full" style={{ width: `${stats.expected > 0 ? Math.min(100, (stats.collected / stats.expected) * 100) : 0}%` }} /></div>
          </div>
        </div>

        <p className="font-black mt-6 mb-3">Quick Actions</p>
        <div className="grid grid-cols-4 gap-3">
          {[{ href: "/properties", icon: "🏠", label: "Property" }, { href: "/tenants", icon: "👥", label: "Tenant" }, { href: "/payments", icon: "🧾", label: "Payment" }, { href: "/sales", icon: "💰", label: "Sale" }].map(a => (
            <Link key={a.href} href={a.href} className="bg-white border rounded-[22px] p-3 text-center shadow-sm active:scale-95"><div className="w-11 h-11 mx-auto bg-[#0F2A1A] rounded-2xl flex items-center justify-center text-xl">{a.icon}</div><p className="text-[11px] font-bold mt-2">{a.label}</p></Link>
          ))}
        </div>

        {/* FIXED - NOW GOES TO /users NOT /login */}
        <Link href="/users" className="block bg-[#0F2A1A] text-white rounded-[22px] p-4 mt-4 flex justify-between items-center active:scale-[0.98]">
          <div>
            <p className="font-black text-sm">👥 Manage Users — Admin / Agent / Tenant / Buyer</p>
            <p className="text-xs text-white/60 mt-0.5">Create accounts for your team & customers • {stats.users} users</p>
          </div>
          <span className="text-xl">→</span>
        </Link>

        <div className="flex justify-between items-end mt-6 mb-3"><p className="font-black">Recent Payments</p><Link href="/payments" className="text-xs font-bold text-[#FF6B00]">See All →</Link></div>
        <div className="bg-white rounded-[22px] border divide-y">
          {recent.length === 0 && <p className="p-4 text-sm text-gray-500">No payments yet. Add one to see am here.</p>}
          {recent.map((p: any) => (
            <div key={p.id} className="p-4 flex justify-between items-center"><div className="flex gap-3 items-center"><div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">✓</div><div><p className="font-bold text-sm">{p.tenant_name}</p><p className="text-xs text-gray-500">{p.for_what} • {new Date(p.created_at || Date.now()).toLocaleDateString()}</p></div></div><p className="font-black text-green-600 text-sm">+₦{Number(p.amount).toLocaleString()}</p></div>
          ))}
        </div>

        <div className="flex justify-between items-end mt-6 mb-3"><p className="font-black">Recent Sales</p><Link href="/sales" className="text-xs font-bold text-[#FF6B00]">See All →</Link></div>
        <div className="bg-white rounded-[22px] border divide-y">
          {saleRecent.length === 0 && <p className="p-4 text-sm text-gray-500">No sales yet.</p>}
          {saleRecent.map((s: any) => (
            <div key={s.id} className="p-4 flex justify-between items-center"><div className="flex gap-3 items-center"><div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">💰</div><div><p className="font-bold text-sm">{s.item}</p><p className="text-xs text-gray-500">{s.buyer_name || "Buyer"}</p></div></div><p className="font-black text-sm">₦{Number(s.amount || 0).toLocaleString()}</p></div>
          ))}
        </div>

        <button onClick={logout} className="w-full mt-6 bg-white border font-bold py-3 rounded-2xl text-sm text-gray-600">Logout</button>
      </div>
      <BottomNav />
    </div>
  );
                                                                                                                                                                                                                                                                                                                                                                                                                                      }
