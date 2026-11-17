import Link from "next/link";
export default function Sales() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#0F2A1A] text-white px-5 py-4 flex justify-between"><p className="font-black">Sales / Land</p><Link href="/dashboard">← Dashboard</Link></header>
      <div className="max-w-6xl mx-auto px-5 py-6">
        <div className="bg-white border rounded-2xl p-5"><p className="font-bold">Full Plot - Kobape, Abeokuta</p><p className="text-sm text-gray-500">Buyer: Mr. Johnson • Total: ₦1,200,000 • Paid: ₦800,000 • Balance: ₦400,000</p><p className="text-xs mt-2">✅ Deed of Assignment ✅ Registered Survey ✅ Royal Family Receipt ✅ Sales Receipt</p><div className="h-2 bg-gray-200 rounded-full mt-3"><div className="h-2 bg-[#FF6B00] rounded-full" style={{width:"66%"}}></div></div><p className="text-xs mt-1">66% Paid - Instalment Plan</p></div>
      </div>
    </div>
  );
}
