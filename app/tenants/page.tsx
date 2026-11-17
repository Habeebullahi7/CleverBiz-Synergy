"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import BottomNav from "@/components/BottomNav";
export const dynamic = "force-dynamic";

export default function Tenants() {
  const [list, setList] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [rent, setRent] = useState("");
  const [property, setProperty] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  async function load() { const { data } = await supabase.from("tenants").select("*").order("id", { ascending: false }); if (data) setList(data); }
  useEffect(() => { load(); }, []);

  async function add() {
    if (!name) return alert("Enter tenant name");
    setLoading(true);
    let photo_url = "";
    if (file) {
      const fn = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;
      const { error } = await supabase.storage.from("tenant-photos").upload(fn, file);
      if (!error) photo_url = supabase.storage.from("tenant-photos").getPublicUrl(fn).data.publicUrl;
    }
    const { error } = await supabase.from("tenants").insert([{ name, phone, rent: Number(rent) || 0, property, photo_url }]);
    if (error) alert(error.message); else { setName(""); setPhone(""); setRent(""); setProperty(""); setFile(null); setPreview(""); load(); }
    setLoading(false);
  }
  async function del(id: number) { if (!confirm("Delete tenant?")) return; await supabase.from("tenants").delete().eq("id", id); load(); }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <header className="bg-[#0F2A1A] text-white px-5 py-4 flex justify-between"><p className="font-black">Tenants</p><Link href="/dashboard">← Dashboard</Link></header>
      <div className="max-w-6xl mx-auto px-5 py-6">
        <div className="bg-white border rounded-2xl p-4 grid gap-3">
          <p className="font-black">+ Add Tenant</p>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="border rounded-xl p-3 w-full" />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone - 0808..." className="border rounded-xl p-3 w-full" />
          <input value={property} onChange={(e) => setProperty(e.target.value)} placeholder="Property - e.g. 4 Bed Duplex Adigbe" className="border rounded-xl p-3 w-full" />
          <input value={rent} onChange={(e) => setRent(e.target.value)} placeholder="Rent Amount" type="number" className="border rounded-xl p-3 w-full" />
          <label className="border-2 border-dashed rounded-xl p-3 text-center block bg-gray-50 cursor-pointer"><p className="text-sm font-bold">📸 {file ? file.name : "Tap to add Tenant Photo / ID"}</p><input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0] || null; setFile(f); if (f) setPreview(URL.createObjectURL(f)); }} /></label>
          {preview && <img src={preview} className="w-full h-32 object-cover rounded-xl" />}
          <button onClick={add} className="bg-[#FF6B00] text-white font-bold py-3 rounded-xl">{loading ? "Saving..." : "Save Tenant"}</button>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mt-5">
          {list.map((t) => (
            <div key={t.id} className="bg-white border rounded-2xl overflow-hidden">
              {t.photo_url ? <img src={t.photo_url} className="w-full h-36 object-cover" /> : <div className="h-20 bg-[#0F2A1A] flex items-center justify-center text-3xl">👤</div>}
              <div className="p-4"><p className="font-bold">{t.name}</p><p className="text-sm text-gray-500">📞 {t.phone}</p><p className="text-sm text-gray-500">🏠 {t.property}</p><p className="font-black text-[#FF6B00] mt-1">₦{Number(t.rent || 0).toLocaleString()}</p><button onClick={() => del(t.id)} className="w-full mt-3 text-red-600 text-sm font-bold border border-red-200 py-2 rounded-lg">Delete</button></div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
