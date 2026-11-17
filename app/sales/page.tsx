"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import BottomNav from "@/components/BottomNav";

export const dynamic = "force-dynamic";

export default function Properties() {
  const [list, setList] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Adigbe, Abeokuta");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("House");
  const [tag, setTag] = useState("TO LET");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  async function load() {
    const { data } = await supabase.from("properties").select("*").order("id", { ascending: false });
    if (data) setList(data);
  }
  useEffect(() => { load(); }, []);

  function onFile(e: any) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function addProperty() {
    if (!title || !price) return alert("Fill title + price");
    setLoading(true);
    let image_url = "";
    if (file) {
      const fileName = `${Date.now()}-${file.name.replace(/\s/g, "-")}`;
      const { error: upErr } = await supabase.storage.from("property-photos").upload(fileName, file);
      if (upErr) alert("Upload failed: " + upErr.message);
      else {
        const { data } = supabase.storage.from("property-photos").getPublicUrl(fileName);
        image_url = data.publicUrl;
      }
    }
    const { error } = await supabase.from("properties").insert([{ title, location, price: Number(price), type, tag, beds: type === "Land" ? "600 sqm" : "3 Beds", image_url }]);
    if (error) alert(error.message);
    else { setTitle(""); setPrice(""); setFile(null); setPreview(""); load(); }
    setLoading(false);
  }

  async function deleteProperty(id: number) {
    if (!confirm("Delete this property?")) return;
    const { error } = await supabase.from("properties").delete().eq("id", id);
    if (error) alert(error.message); else load();
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <header className="bg-[#0F2A1A] text-white px-5 py-4 flex justify-between">
        <p className="font-black">Properties - REAL + PHOTOS</p>
        <Link href="/dashboard">← Dashboard</Link>
      </header>
      <div className="max-w-6xl mx-auto px-5 py-6">
        <div className="bg-white border rounded-2xl p-4 grid gap-3">
          <p className="font-black">+ Add New Property</p>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title - e.g. 4 Bedroom Duplex" className="border rounded-xl p-3 w-full" />
          <select value={location} onChange={(e) => setLocation(e.target.value)} className="border rounded-xl p-3 w-full">
            <option>Adigbe, Abeokuta</option><option>Kobape, Abeokuta</option><option>Akowonjo, Lagos</option><option>Shasha, Lagos</option>
          </select>
          <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price - e.g. 2500000" type="number" className="border rounded-xl p-3 w-full" />
          <div className="grid grid-cols-2 gap-3">
            <select value={type} onChange={(e) => setType(e.target.value)} className="border rounded-xl p-3 w-full"><option>House</option><option>Land</option><option>Apartment</option><option>Shop</option></select>
            <select value={tag} onChange={(e) => setTag(e.target.value)} className="border rounded-xl p-3 w-full"><option>TO LET</option><option>FOR SALE</option></select>
          </div>

          {/* PHOTO UPLOAD */}
          <label className="border-2 border-dashed rounded-xl p-4 text-center block cursor-pointer bg-gray-50">
            {preview ? <img src={preview} className="w-full h-40 object-cover rounded-xl" /> : <p className="text-sm text-gray-500">📸 Tap to Upload House Photo<br /><span className="text-xs">From your phone gallery</span></p>}
            <input type="file" accept="image/*" onChange={onFile} className="hidden" />
          </label>

          <button onClick={addProperty} className="bg-[#FF6B00] text-white font-bold py-3 rounded-xl">{loading ? "Uploading + Saving..." : "Save Property with Photo"}</button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-5">
          {list.length === 0 && <p className="text-gray-500 text-sm col-span-3 bg-white p-4 rounded-2xl border">No properties yet.</p>}
          {list.map((x) => (
            <div key={x.id} className="bg-white border rounded-2xl overflow-hidden">
              {x.image_url ? <img src={x.image_url} className="w-full h-40 object-cover" /> : <div className="h-32 bg-[#0F2A1A] flex items-center justify-center text-5xl">🏠</div>}
              <div className="p-4">
                <span className="text-[11px] font-bold bg-[#FF6B00] text-white px-2 py-1 rounded-full">{x.tag}</span>
                <p className="font-bold mt-2">{x.title}</p>
                <p className="text-sm text-gray-500">📍 {x.location}</p>
                <p className="font-black text-[#FF6B00] mt-1">₦{Number(x.price).toLocaleString()}</p>
                <button onClick={() => deleteProperty(x.id)} className="w-full mt-3 text-red-600 text-sm font-bold border border-red-200 py-2 rounded-lg">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
