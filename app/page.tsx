"use client";
import { useRouter } from "next/navigation";

export default function Landing() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white text-[#0F2A1A]">
      {/* NAV */}
      <nav className="flex justify-between items-center px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[#FF6B00] rounded-lg flex items-center justify-center font-extrabold text-white">C</div>
          <span className="font-extrabold tracking-wide">CLEVER-BIZ <span className="text-[#FF6B00]">PropertyPro</span></span>
        </div>
        <button onClick={()=>router.push("/login")} className="bg-[#0F2A1A] text-white px-6 py-2.5 rounded-full font-bold text-sm">Login</button>
      </nav>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-16 text-center">
        <p className="inline-block bg-[#E6F4EA] text-[#0F2A1A] px-4 py-1.5 rounded-full text-xs font-bold">🏠 PROPERTIES • RENT • SALES • TENANTS</p>
        <h1 className="mt-6 text-5xl md:text-6xl font-extrabold leading-[0.95]">Manage Your <br/><span className="text-[#FF6B00]">Properties</span> With Ease</h1>
        <p className="mt-4 text-gray-500 max-w-lg mx-auto">One app for landlords, tenants, agents and buyers. Collect rent, sell land, track faults, all in one place.</p>
        <div className="mt-8 flex justify-center gap-3">
          <button onClick={()=>router.push("/login")} className="bg-[#FF6B00] text-white px-8 py-4 rounded-full font-bold">Get Started →</button>
          <button onClick={()=>router.push("/properties")} className="bg-gray-100 px-8 py-4 rounded-full font-bold">View Properties</button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-4">
        {[
          { t: "🏠 Properties & Units", d: "Add properties, flats, shops, land. Manage units and occupancy." },
          { t: "💳 Rent & Payments", d: "Tenants pay rent online with Paystack. Auto receipts." },
          { t: "💰 Property Sales", d: "Sell land & houses. Track buyers & instalments." },
        ].map((f,i)=>(
          <div key={i} className="bg-[#F7F7F7] rounded-[20px] p-6">
            <h3 className="font-bold text-lg">{f.t}</h3>
            <p className="text-sm text-gray-500 mt-2">{f.d}</p>
          </div>
        ))}
      </section>

      <footer className="text-center py-6 text-xs text-gray-400 border-t">Clever-biz Synergy Limited • PropertyPro</footer>
    </div>
  );
}
