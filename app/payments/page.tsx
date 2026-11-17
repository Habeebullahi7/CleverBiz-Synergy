import Link from "next/link";
export default function Payments() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#0F2A1A] text-white px-5 py-4 flex justify-between"><p className="font-black">Payments & Receipts</p><Link href="/dashboard">← Dashboard</Link></header>
      <div className="max-w-6xl mx-auto px-5 py-6">
        <div className="bg-white border rounded-2xl p-5"><p className="text-xs text-gray-500">CLEVER BIZ SYNERGY LINKS NIG. LTD • RC: 1238707</p><p className="font-black mt-1">RECEIPT #CB-001</p><p className="text-sm text-gray-500 mt-1">Received from: Adebayo O. • Amount: ₦2,500,000 • For: Rent - 4 Bed Duplex Adigbe • Date: Nov 17, 2026</p><button className="bg-[#25D366] text-white font-bold px-4 py-2 rounded-lg mt-3 text-sm">Share on WhatsApp →</button></div>
      </div>
    </div>
  );
}
