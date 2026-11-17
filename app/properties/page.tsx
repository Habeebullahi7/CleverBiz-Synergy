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
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPass, setAdminPass] = useState("");

  useEffect(() => { if (localStorage.getItem("clever_admin") === "yes") setIsAdmin(true); load(); }, []);
  async function load() {
    const { data } = await supabase.from("properties").select("*").order("id", { ascending: false });
    if (data) setList(data);
  }
  function unlock() {
    if (adminPass === "Clever2026") { localStorage.setItem("clever_admin", "yes"); setIsAdmin(true); }
    else alert("Wrong password");
  }
  function onFiles(e: any) {
    const selected = Array.from(e.target.files || []) as File[];
    const all = [...files, ...selected].slice(0, 5);
    setFiles(all); setPreviews(all.map(f => URL.createObjectURL(f)));
  }
  function removePhoto(i: number) { const nf = files.filter((_, x) => x !== i); setFiles(nf); setPreviews(nf.map(f => URL.createObjectURL(f))); }
  async function addProperty() {
    if (!title || !price) return alert("Fill title + price");
    setLoading(true);
    let urls: string[] = [];
    for (const file of files) {
      const fn = `${Date.now()}-${Math.random()}-${file.name.replace(/\s/g, "-")}`;
      const { error } = await supabase.storage.from("property-photos").upload(fn, file);
      if (!error) { const { data } = supabase.storage.from("property-photos").getPublicUrl(fn); urls.push(data.publicUrl); }
    }
    const { error } = await supabase.from("properties").insert([{ title, location, price: Number(price), type, tag, beds: type === "Land" ? "600 sqm" : "3 Beds", image_url: urls[0] || "", image_urls: urls }]);
    if (error) alert(error.message); else { setTitle(""); setPrice(""); setFiles([]); setPreviews([]); load(); }
    setLoading(false);
  }
  async function deleteProperty(id: number) { if (!confirm("Delete?")) return; await supabase.from("properties").delete().eq("id", id); load(); }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <header className="bg-[#0F2A1A] text-white px-5 py-4 flex justify-between"><p className="font-black">Properties</p><Link href="/dashboard">← Dashboard</Link></header>
      <div className="max-w-6xl mx-auto px-5 py-6">
        {!isAdmin ? (
          <div className="bg-white border rounded-2xl p-4 flex gap-2">
            <input value={adminPass} onChange={(e) => setAdminPass(e.target.value)} placeholder="Admin password to add property" className="border rounded-xl p-3 flex-1" />
            <button onClick={unlock} className="bg-black text-white px-4 rounded-xl font-bold">Unlock</button>
          </div>
        ) : (
          <div className="bg-white border rounded-2xl p-4 grid gap-3">
            <p className="font-black">+ Add New Property <span className="text-green-600 text-xs">● Admin</span></p>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title - e.g. 4 Bedroom Duplex" className="border rounded-xl p-3 w-full" />
            <select value={location} onChange={(e) => setLocation(e.target.value)} className="border rounded-xl p-3 w-full"><option>Adigbe, Abeokuta</option><option>Kobape, Abeokuta</option><option>Akowonjo, Lagos</option><option>Shasha, Lagos</option></select>
            <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" type="number" className="border rounded-xl p-3 w-full" />
            <div className="grid grid-cols-2 gap-3">
              <select value={type} onChange={(e) => setType(e.target.value)} className="border rounded-xl p-3 w-full"><option>House</option><option>Land</option><option>Apartment</option><option>Shop</option></select>
              <select value={tag} onChange={(e) => setTag(e.target.value)} className="border rounded-xl p-3 w-full"><option>TO LET</option><option>FOR SALE</option></select>
            </div>
            <label className="border-2 border-dashed rounded-xl p-4 text-center block cursor-pointer bg-gray-50"><p className="text-sm font-bold">📸 Tap to Add Photos ({files.length}/5)</p><p className="text-xs text-gray-400">Long-press to select many</p><input type="file" accept="image/*" multiple onChange={onFiles} className="hidden" /></label>
            {previews.length > 0 && <div className="grid grid-cols-3 gap-2">{previews.map((src, i) => (<div key={i} className="relative"><img src={src} className="w-full h-24 object-cover rounded-xl" /><button onClick={() => removePhoto(i)} className="absolute -top-1 -right-1 bg-red-500 text-white w-6 h-6 rounded-full text-xs">✕</button>{i === 0 && <span className="absolute bottom-1 left-1 bg-[#FF6B00] text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">MAIN</span>}</div>))}</div>}
            <button onClick={addProperty} className="bg-[#FF6B00] text-white font-bold py-3 rounded-xl">{loading ? "Uploading..." : `Save with ${files.length} Photo(s)`}</button>
          </div>
        )}
        <div className="grid md:grid-cols-3 gap-4 mt-5">
          {list.map((x) => {
            const gallery = x.image_urls?.length ? x.image_urls : (x.image_url ? [x.image_url] : []);
            return (
              <div key={x.id} className="bg-white border rounded-2xl overflow-hidden">
                {gallery.length > 0 ? <div className="flex overflow-x-auto snap-x">{gallery.map((img: string, idx: number) => <img key={idx} src={img} className="w-full shrink-0 h-44 object-cover snap-center" />)}</div> : <div className="h-32 bg-[#0F2A1A] flex items-center justify-center text-5xl">🏠</div>}
                <div className="p-4">
                  <span className="text-[11px] font-bold bg-[#FF6B00] text-white px-2 py-1 rounded-full">{x.tag} • {gallery.length} photos</span>
                  <p className="font-bold mt-2">{x.title}</p><p className="text-sm text-gray-500">📍 {x.location}</p>
                  <p className="font-black text-[#FF6B00] mt-1">₦{Number(x.price).toLocaleString()}</p>
                  <Link href={`/properties/${x.id}`} className="block mt-3 bg-black text-white text-center py-2 rounded-lg text-sm font-bold">View Details →</Link>
                  {isAdmin && <button onClick={() => deleteProperty(x.id)} className="w-full mt-2 text-red-600 text-sm font-bold border border-red-200 py-2 rounded-lg">Delete</button>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </div>
  );
    }
