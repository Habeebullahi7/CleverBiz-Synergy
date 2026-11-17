import Link from "next/link";
export default function Login() {
  return (
    <div className="min-h-screen bg-[#0F2A1A] flex items-center justify-center px-5">
      <div className="bg-white w-full max-w-md rounded-2xl p-6">
        <p className="font-black text-xl">CLEVER-BIZ <span className="text-[#FF6B00]">PropertyPro</span></p>
        <p className="text-sm text-gray-500 mt-1">Login to manage properties, tenants & sales.</p>
        <label className="block text-sm font-bold mt-5">Email</label>
        <input className="w-full border rounded-xl p-3 mt-1" placeholder="info@cleverbiz.com.ng" />
        <label className="block text-sm font-bold mt-4">Password</label>
        <input type="password" className="w-full border rounded-xl p-3 mt-1" placeholder="••••••••" />
        <select className="w-full border rounded-xl p-3 mt-4"><option>Admin</option><option>Agent</option><option>Tenant</option><option>Buyer</option></select>
        <Link href="/dashboard" className="block text-center bg-[#FF6B00] text-white font-bold py-3 rounded-xl mt-5">Login →</Link>
        <p className="text-center text-xs text-gray-400 mt-4">RC: 1238707 • Clever Biz Synergy Links Nig. Ltd</p>
      </div>
    </div>
  );
}
