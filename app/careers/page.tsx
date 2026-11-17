"use client";
import Footer from "@/components/Footer";
import { useState } from "react";
export default function Careers() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", area: "Abeokuta" });
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-5 py-10">
        <h1 className="text-3xl font-black">Careers / Join As Agent</h1>
        <p className="text-gray-500 mt-1">Earn with Clever-Biz. No capital needed.</p>
        <div className="bg-[#FFF1E6] rounded-[20px] p-5 mt-6">
          <p className="font-black">Why Join As Agent?</p>
          <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 space-y-1">
            <li>Earn commission on every Land, House or Car you sell / rent.</li>
            <li>We give you verified listings + receipt + trust — you just bring buyer.</li>
            <li>You get your own Agent Login to see properties and share them.</li>
            <li>Training + WhatsApp support from Admin.</li>
          </ul>
        </div>
        <div className="border rounded-[20px] p-5 mt-5">
          <p className="font-black mb-3">Apply Now</p>
          <label className="text-sm font-bold">Your Name</label>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. John Ade" className="border rounded-xl p-3 w-full mt-1 mb-3" />
          <label className="text-sm font-bold">WhatsApp Number</label>
          <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="e.g. 08012345678" className="border rounded-xl p-3 w-full mt-1 mb-3" />
          <label className="text-sm font-bold">Your Area</label>
          <select value={form.area} onChange={e => setForm({ ...form, area: e.target.value })} className="border rounded-xl p-3 w-full mt-1 mb-3">
            <option>Abeokuta</option><option>Lagos - Akowonjo</option><option>Lagos - Other</option><option>Ogun - Other</option><option>Other State</option>
          </select>
          {sent ? <p className="bg-green-50 text-green-700 font-bold p-3 rounded-xl text-center">Application received! We go chat you on WhatsApp within 24 hours. ✅</p> : <a href={`https://wa.me/2348088735444?text=${encodeURIComponent(`Hello Clever-Biz, I want to join as Agent.\nName: ${form.name}\nPhone: ${form.phone}\nArea: ${form.area}`)}`} target="_blank" className="block text-center bg-[#0F2A1A] text-white font-bold py-3.5 rounded-xl">Send Application on WhatsApp →</a>}
        </div>
        <p className="text-xs text-gray-400 mt-3 text-center">By applying, you agree to our Terms & Privacy Policy.</p>
      </div>
      <Footer />
    </div>
  );
          }
