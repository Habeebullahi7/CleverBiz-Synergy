import Link from "next/link";
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#0F2A1A] text-white px-5 py-4 flex justify-between"><p className="font-black">CLEVER-BIZ <span className="text-[#FF6B00]">PropertyPro</span></p><Link href="/" className="text-sm">← Home</Link></header>
      <div className="max-w-6xl mx-auto px-5 py-6">
        <h1 className="text-2xl font-black">Dashboard</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
          <div className="bg-white p-4 rounded-2xl border"><p className="text-xs text-gray-500">Total Properties</p><p className="text-2xl font-black">24</p></div>
          <div className="bg-white p-4 rounded-2xl border"><p className="text-xs text-gray-500">Total Tenants</p><p className="text-2xl font-black">18</p></div>
          <div className="bg-white p-4 rounded-2xl border"><p className="text-xs text-gray-500">Rent Due This Month</p><p className="text-2xl font-black text-[#FF6B00]">₦4.2M</p></div>
          <div className="bg-white p-4 rounded-2xl border"><p className="text-xs text-gray-500">Total Sales</p><p className="text-2xl font-black">₦12.5M</p></div>
        </div>
        <div className="grid md:grid-cols-3 gap-3 mt-4">
          <Link href="/properties" className="bg-white p-5 rounded-2xl border font-bold">🏠 Properties →</Link>
          <Link href="/tenants" className="bg-white p-5 rounded-2xl border font-bold">👥 Tenants →</Link>
          <Link href="/rent" className="bg-white p-5 rounded-2xl border font-bold">💰 Rent Management →</Link>
          <Link href="/sales" className="bg-white p-5 rounded-2xl border font-bold">📄 Sales / Land →</Link>
          <Link href="/payments" className="bg-white p-5 rounded-2xl border font-bold">🧾 Payments & Receipts →</Link>
          <Link href="/login" className="bg-white p-5 rounded-2xl border font-bold">⚙️ Logout →</Link>
        </div>
      </div>
    </div>
  );
}
