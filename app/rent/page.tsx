import Link from "next/link";
export default function Rent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#0F2A1A] text-white px-5 py-4 flex justify-between"><p className="font-black">Rent Management</p><Link href="/dashboard">← Dashboard</Link></header>
      <div className="max-w-6xl mx-auto px-5 py-6">
        <div className="grid md:grid-cols-3 gap-3"><div className="bg-white p-4 rounded-2xl border"><p className="text-xs text-gray-500">Collected</p><p className="font-black text-xl text-green-600">₦3,300,000</p></div><div className="bg-white p-4 rounded-2xl border"><p className="text-xs text-gray-500">Outstanding</p><p className="font-black text-xl text-red-600">₦1,800,000</p></div><div className="bg-white p-4 rounded-2xl border"><p className="text-xs text-gray-500">Overdue Tenants</p><p className="font-black text-xl">1</p></div></div>
        <div className="bg-white border rounded-2xl mt-4 p-4"><p className="font-bold">Chiamaka N. - Akowonjo</p><p className="text-sm text-gray-500">Due Nov 20, 2026 • ₦1,800,000 • Status: Owing</p><button className="bg-[#FF6B00] text-white font-bold px-4 py-2 rounded-lg mt-3 text-sm">Record Payment → Generate Receipt</button></div>
      </div>
    </div>
  );
}
