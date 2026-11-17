import Link from "next/link";
const list = [
  { t: "4 Bedroom Duplex", l: "Adigbe, Abeokuta", p: "₦2,500,000 / year", tag: "TO LET" },
  { t: "Full Plot Land", l: "Kobape, Abeokuta", p: "₦1,200,000", tag: "FOR SALE" },
  { t: "3 Bedroom Flat", l: "Akowonjo, Lagos", p: "₦1,800,000 / year", tag: "TO LET" },
];
export default function Properties() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#0F2A1A] text-white px-5 py-4 flex justify-between"><p className="font-black">Properties</p><Link href="/dashboard">← Dashboard</Link></header>
      <div className="max-w-6xl mx-auto px-5 py-6">
        <div className="flex gap-2"><select className="border rounded-xl p-3 bg-white"><option>All - Rent / Sale</option><option>TO LET</option><option>FOR SALE</option></select><select className="border rounded-xl p-3 bg-white"><option>All Locations</option><option>Abeokuta</option><option>Lagos</option></select></div>
        <div className="grid md:grid-cols-3 gap-4 mt-5">{list.map((x,i)=>(
          <div key={i} className="bg-white border rounded-2xl overflow-hidden"><div className="h-32 bg-[#0F2A1A] flex items-center justify-center text-5xl">🏠</div><div className="p-4"><span className="text-[11px] font-bold bg-[#FF6B00] text-white px-2 py-1 rounded-full">{x.tag}</span><p className="font-bold mt-2">{x.t}</p><p className="text-sm text-gray-500">📍 {x.l}</p><p className="font-black text-[#FF6B00] mt-1">{x.p}</p><p className="text-xs text-gray-400 mt-2">✅ Deed ✅ Survey ✅ Family Receipt</p></div></div>))}
        </div>
      </div>
    </div>
  );
}
