"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Tenant");
  const [phone, setPhone] = useState("");
  const [property, setProperty] = useState("");
  const router = useRouter();

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("clever_user") || "null");
    if (!u || u.role !== "Admin") { router.push("/login"); return; }
    load();
  }, []);

  async function load() {
    const { data } = await supabase.from("profiles").select("*").order("id", { ascending: false });
    setUsers(data || []);
  }

  async function createUser() {
    if (!name || !email || !password) return alert("Fill Name, Email, Password");
    const { error } = await supabase.from("profiles").insert([{ name, email: email.toLowerCase().trim(), password, role, phone, property }]);
    if (error) return alert("Error: " + error.message + "\nMaybe email don exist before.");

    // If na Tenant, also link am for tenants table so My House go work
    if (role === "Tenant") {
      await supabase.from("tenants").update({ email: email.toLowerCase().trim(), password }).eq("name", name);
    }
    alert(`${role} account created! ${name} can now login.`);
    setName(""); setEmail(""); setPassword(""); setPhone(""); setProperty("");
    load();
  }

  async function deleteUser(id: number, email: string) {
    if (!confirm(`Delete ${email}?`)) return;
    await supabase.from("profiles").delete().eq("id", id);
    load();
  }

  function shareWhatsApp(u: any) {
    const text = `Hello ${u.name}, your Clever-Biz account don ready!\n\nLogin: https://cleverbiz-synergy.vercel.app/login\nEmail: ${u.email}\nPassword: ${u.password}\nRole: ${u.role}\n\nPlease change your password after first login.`;
    window.open(`https://wa.me/${u.phone?.replace(/[^0-9]/g, "") || "2348088735444"}?text=${encodeURIComponent(text)}`, "_blank");
  }

  return (
    <div className="min-h-screen bg-[#F6F7F2] pb-20">
      <div className="bg-[#0F2A1A] text-white p-5">
        <Link href="/dashboard" className="text-sm text-white/60">← Back to Dashboard</Link>
        <p className="font-black text-xl mt-2">Manage Users</p>
        <p className="text-sm text-white/60">Create Agent / Tenant / Buyer accounts</p>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-5">
        {/* CREATE FORM */}
        <div className="bg-white rounded-[22px] p-5 border">
          <p className="font-black mb-3">Create New Account</p>
          <label className="text-sm font-bold">Full Name</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. T Boy" className="border rounded-xl p-3 w-full mt-1 mb-3" />
          <label className="text-sm font-bold">Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="e.g. tboy@gmail.com" className="border rounded-xl p-3 w-full mt-1 mb-3" />
          <label className="text-sm font-bold">Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="e.g. Tboy123" className="border rounded-xl p-3 w-full mt-1 mb-3" />
          <label className="text-sm font-bold">Role</label>
          <select value={role} onChange={e => setRole(e.target.value)} className="border-2 border-black rounded-xl p-3 w-full mt-1 mb-3 font-bold">
            <option>Tenant</option><option>Agent</option><option>Buyer</option><option>Admin</option>
          </select>
          <label className="text-sm font-bold">Phone (for WhatsApp)</label>
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="e.g. 08098765432" className="border rounded-xl p-3 w-full mt-1 mb-3" />
          <label className="text-sm font-bold">Property / House (for Tenant only)</label>
          <input value={property} onChange={e => setProperty(e.target.value)} placeholder="e.g. Rent - Akowonjo" className="border rounded-xl p-3 w-full mt-1 mb-3" />
          <button onClick={createUser} className="w-full bg-[#FF6B00] text-white font-black py-3.5 rounded-xl">Create Account →</button>
          <p className="text-[11px] text-gray-400 mt-2 text-center">Tenant name must match exactly the name for Tenants page (e.g. Sam, T boy) — so My House go show im rent.</p>
        </div>

        {/* LIST */}
        <p className="font-black mt-6 mb-2">All Users ({users.length})</p>
        <div className="space-y-2">
          {users.map((u: any) => (
            <div key={u.id} className="bg-white border rounded-2xl p-4 flex justify-between items-center">
              <div>
                <p className="font-bold">{u.name} <span className={`text-[10px] px-2 py-0.5 rounded-full text-white ${u.role === "Admin" ? "bg-black" : u.role === "Tenant" ? "bg-green-600" : u.role === "Agent" ? "bg-blue-600" : "bg-orange-500"}`}>{u.role}</span></p>
                <p className="text-xs text-gray-500">{u.email} • {u.phone || ""}</p>
                <p className="text-xs text-gray-500">Pass: {u.password} • {u.property || ""}</p>
              </div>
              <div className="flex flex-col gap-1">
                <button onClick={() => shareWhatsApp(u)} className="bg-[#25D366] text-white text-xs font-bold px-3 py-1.5 rounded-lg">Share Login</button>
                <button onClick={() => deleteUser(u.id, u.email)} className="bg-red-50 text-red-600 text-xs font-bold px-3 py-1.5 rounded-lg">Delete</button>
              </div>
            </div>
          ))}
          {users.length === 0 && <p className="bg-white p-4 rounded-2xl text-sm text-gray-500">No users yet.</p>}
        </div>
      </div>
    </div>
  );
                                                             }
