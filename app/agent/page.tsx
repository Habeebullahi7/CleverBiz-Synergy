"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AgentPage() {
  const [user, setUser] = useState<any>(null);
  const [props, setProps] = useState<any[]>([]);
  const router = useRouter();
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("clever_user") || "null");
    if (!u || u.role !== "Agent") return router.push("/login");
    setUser(u);
    supabase.from("properties").select("*").order("id", { ascending: false }).then(({ data }) => setProps(data || []));
  }, []);
  if (!user) return <p className="p-6">Loading...</p>;
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-[#0F2A1A] text-white p-5"><p className="font-black text-xl">Agent Dashboard</p><p className="text-sm text-white/60">{user.name} • {user.email}</p></div>
      <div className="max-w-5xl mx-auto px-5 py-5">
        <div className="bg-white border rounded-2xl p-4 flex justify-between"><p className="font-bold">Total Properties Available</p><p className="font-black text-[#FF6B00]">{props.length}</p></div>
        <p className="font-black mt-5 mb-2">Properties to Share</p>
        <div className="grid md:grid-cols-3 gap-4">
          {props.map((x: any) => (
            <div key={x.id} className="bg-white border rounded-2xl overflow-hidden">
              {x.image_url ? <img src={x.image_url} className="w-full h-32 object-cover" /> : <div className="h-24 bg-[#0F2A1A] flex items-center justify-center text-3xl">🏠</div>}
              <div className="p-4"><p className="font-bold">{x.title}</p><p className="text-sm text-gray-500">{x.location}</p><p className="font-black text-[#FF6B00]">₦{Number(x.price).toLocaleString()}</p><p className="text-[11px] text-red-500 mt-1">⚠️ You cannot delete / see total money. Only Admin can.</p><a href={`https://wa.me/?text=${encodeURIComponent(`Check this property: ${x.title} - ₦${Number(x.price).toLocaleString()} - ${x.location}`)}`} target="_blank" className="block text-center bg-[#25D366] text-white font-bold py-2 rounded-lg mt-2 text-sm">Share on WhatsApp</a></div>
            </div>
          ))}
        </div>
        <button onClick={() => { localStorage.clear(); router.push("/login"); }} className="w-full mt-6 text-sm text-gray-500">Logout</button>
      </div>
    </div>
  );
                                                                                                                                                                                                                                                                                                                       }
