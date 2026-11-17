"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function doLogin() {
    if (!email || !password) return alert("Fill email + password");
    setLoading(true);
    const { data, error } = await supabase.from("profiles").select("*").eq("email", email.toLowerCase().trim()).eq("password", password).eq("role", role).single();
    if (error || !data) {
      setLoading(false);
      return alert(`Wrong login. Check Email / Password / Role.\nYou selected: ${role}`);
    }
    // Save session
    localStorage.setItem("clever_user", JSON.stringify(data));
    localStorage.setItem("clever_admin", data.role === "Admin" ? "yes" : "no");
    // Route by role
    if (data.role === "Admin") router.push("/dashboard");
    if (data.role === "Agent") router.push("/agent");
    if (data.role === "Tenant") router.push("/my-house");
    if (data.role === "Buyer") router.push("/buy");
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0F2A1A] flex items-center justify-center p-5">
      <div className="bg-white w-full max-w-[420px] rounded-[24px] p-6">
        <p className="font-black text-[22px]">CLEVER-BIZ <span className="text-[#FF6B00]">PropertyPro</span></p>
        <p className="text-gray-500 text-sm mt-1">Login to manage properties, tenants & sales.</p>
        <label className="block mt-5 font-bold text-sm">Email</label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="info@cleverbiz.com.ng" className="border rounded-xl p-3 w-full mt-1" />
        <label className="block mt-4 font-bold text-sm">Password</label>
        <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••" type="password" className="border rounded-xl p-3 w-full mt-1" />
        <label className="block mt-4 font-bold text-sm">Login As</label>
        <select value={role} onChange={(e)=>setRole(e.target.value)} className="border-2 border-black rounded-xl p-3 w-full mt-1 font-bold">
          <option>Admin</option><option>Agent</option><option>Tenant</option><option>Buyer</option>
        </select>
        <button onClick={doLogin} className="w-full bg-[#FF6B00] text-white font-black py-3.5 rounded-xl mt-5">{loading ? "Checking..." : "Login →"}</button>
        <p className="text-center text-xs text-gray-400 mt-4">RC: 1238707 • Clever Biz Synergy Links Nig. Ltd</p>
        <div className="bg-gray-50 rounded-xl p-3 mt-3 text-[11px] text-gray-500">
          <p className="font-bold text-black">Test Logins:</p>
          <p>Admin: info@cleverbiz.com.ng / Clever2026</p>
          <p>Agent: agent1@cleverbiz.com.ng / Agent123</p>
          <p>Tenant: sam@gmail.com / Sam123</p>
          <p>Buyer: musa@gmail.com / Musa123</p>
        </div>
      </div>
    </div>
  );
}
