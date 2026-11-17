import Link from "next/link";
const tenants = [
  { n: "Adebayo O.", prop: "4 Bed Duplex - Adigbe", rent: "₦2,500,000", due: "Dec 1, 2026", status: "Paid" },
  { n: "Chiamaka N.", prop: "3 Bed Flat - Akowonjo", rent: "₦1,800,000", due: "Nov 20, 2026", status: "Owing" },
  { n: "Musa K.", prop: "Shop - Shasha", rent: "₦800,000", due: "Nov 25, 2026", status: "Paid" },
];
export default function Tenants() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#0F2A1A] text-white px-5 py-4 flex justify-between"><p className="font-black">Tenants</p><Link href="/dashboard">← Dashboard</Link></header>
      <div className="max-w-6xl mx-auto px-5 py-6">
        <button className="bg-[#FF6B00] text-white font-bold px-5 py-3 rounded-xl">+ Add Tenant</button>
        <div className="bg-white border rounded-2xl mt-4 overflow-hidden">
          {tenants.map((t,i)=>(
            <div key={i} className="p-4 border-b flex justify-between items-center"><div><p className="font-bold">{t.n}</p><p className="text-sm text-gray-500">{t.prop} • Due: {t.due}</p><p className="text-sm font-bold">{t.rent}</p></div><span className={`text-xs font-bold px-3 py-1 rounded-full ${t.status==="Paid"?"bg-green-100 text-green-700":"bg-red-100 text-red-600"}`}>{t.status}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}
