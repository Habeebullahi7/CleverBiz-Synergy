import Link from "next/link";

const properties = [
  {
    id: 1,
    title: "4 Bedroom Duplex",
    location: "Adigbe, Abeokuta",
    price: "₦2,500,000 / year",
    tag: "TO LET",
    type: "House",
    beds: "4 Beds",
  },
  {
    id: 2,
    title: "Full Plot of Land",
    location: "Kobape, Abeokuta",
    price: "₦1,200,000",
    tag: "FOR SALE",
    type: "Land",
    beds: "600 sqm",
  },
  {
    id: 3,
    title: "3 Bedroom Flat",
    location: "Akowonjo, Lagos",
    price: "₦1,800,000 / year",
    tag: "TO LET",
    type: "Apartment",
    beds: "3 Beds",
  },
  {
    id: 4,
    title: "Shop Space",
    location: "Shasha, Lagos",
    price: "₦800,000 / year",
    tag: "FOR SALE",
    type: "Shop",
    beds: "Shop",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <header className="flex items-center justify-between px-5 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#FF6B00] rounded-lg flex items-center justify-center text-white font-black text-xl">C</div>
          <div>
            <p className="font-black leading-none">CLEVER-BIZ <span className="text-[#FF6B00]">PropertyPro</span></p>
            <p className="text-[10px] text-gray-500">RC: 1238707 • Synergy Links Nig. Ltd</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href="/login" className="text-sm font-bold px-4 py-2">Login</Link>
          <Link href="/dashboard" className="text-sm font-bold bg-[#0F2A1A] text-white px-4 py-2 rounded-full">Dashboard →</Link>
        </div>
      </header>

      {/* HERO - PROPOSAL SEARCH */}
      <section className="bg-[#0F2A1A] text-white px-5 py-12">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#FF6B00] font-bold text-sm">● 10 YEARS OF TRUST • SERVICE ABOVE SELF</p>
          <h1 className="text-4xl md:text-5xl font-black mt-3 leading-tight">Find Your Perfect<br />Home With <span className="text-[#FF6B00]">Clever-Biz</span></h1>
          <p className="text-gray-300 mt-3 max-w-lg">Rent, Buy Land & Houses with verified documents. No Omo Onile. Deed, Survey & Family Receipt included.</p>

          {/* SEARCH BOX - PROPOSAL FILTERS */}
          <div className="bg-white text-black rounded-2xl p-4 mt-6 grid md:grid-cols-4 gap-3">
            <select className="border rounded-xl p-3 w-full"><option>Rent / Sale</option><option>Rent - TO LET</option><option>Sale - FOR SALE</option></select>
            <select className="border rounded-xl p-3 w-full"><option>Property Type</option><option>House</option><option>Land</option><option>Apartment</option><option>Shop</option></select>
            <select className="border rounded-xl p-3 w-full"><option>Location</option><option>Abeokuta</option><option>Lagos</option></select>
            <select className="border rounded-xl p-3 w-full"><option>Sub-Location</option><option>Adigbe</option><option>Kobape</option><option>Akowonjo</option><option>Shasha</option></select>
            <Link href="/properties" className="md:col-span-4 bg-[#FF6B00] text-white text-center font-bold py-3 rounded-xl">Search Properties →</Link>
          </div>

          <div className="flex flex-wrap gap-2 mt-5 text-xs">
            <span className="bg-white/10 px-3 py-1.5 rounded-full">✅ Deed of Assignment</span>
            <span className="bg-white/10 px-3 py-1.5 rounded-full">✅ Registered Survey</span>
            <span className="bg-white/10 px-3 py-1.5 rounded-full">✅ Family Receipt</span>
            <span className="bg-white/10 px-3 py-1.5 rounded-full">✅ 24/7 Support</span>
          </div>
        </div>
      </section>

      {/* LATEST LISTINGS */}
      <section className="max-w-6xl mx-auto px-5 py-10">
        <p className="text-[#FF6B00] font-bold text-sm">PROPERTY</p>
        <h2 className="text-2xl font-black">Latest Listings</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          {properties.map((p) => (
            <div key={p.id} className="border rounded-2xl overflow-hidden">
              <div className="h-36 bg-[#0F2A1A] flex items-center justify-center relative">
                <span className="text-5xl">🏠</span>
                <span className={`absolute top-3 left-3 text-[11px] font-bold px-2 py-1 rounded-full ${p.tag === "TO LET" ? "bg-[#FF6B00] text-white" : "bg-white text-black"}`}>{p.tag}</span>
              </div>
              <div className="p-4">
                <p className="font-bold">{p.title}</p>
                <p className="text-sm text-gray-500">📍 {p.location}</p>
                <p className="text-xs text-gray-400 mt-1">{p.type} • {p.beds}</p>
                <p className="font-black text-[#FF6B00] mt-2">{p.price}</p>
                <Link href="/properties" className="block text-center mt-3 bg-black text-white text-sm font-bold py-2 rounded-lg">View Details →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES - PROPOSAL */}
      <section className="bg-gray-50 py-10 px-5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-black">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-5">
            <div className="bg-white p-5 rounded-2xl border"><p className="text-3xl">🏠</p><h3 className="font-bold mt-2">Real Estate Management</h3><p className="text-sm text-gray-500 mt-1">Letting, buying, leasing & finding your dream accommodation.</p></div>
            <div className="bg-white p-5 rounded-2xl border"><p className="text-3xl">🧱</p><h3 className="font-bold mt-2">Building Materials</h3><p className="text-sm text-gray-500 mt-1">Hardware, tools, doors, gates, railings & more.</p></div>
            <div className="bg-white p-5 rounded-2xl border"><p className="text-3xl">🚗</p><h3 className="font-bold mt-2">Automobile Sales</h3><p className="text-sm text-gray-500 mt-1">Toyota, Honda, Lexus, Land Rover, KIA, Mercedes & more.</p></div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="max-w-6xl mx-auto px-5 py-10">
        <h2 className="text-2xl font-black">Why Clever-Biz?</h2>
        <p className="text-gray-500 text-sm mt-1">We understand the dynamics of the property market.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
          {["TRUST", "ACCOUNTABILITY", "LOVE", "24/7 SUPPORT"].map((v) => (
            <div key={v} className="border rounded-xl p-4 text-center font-bold text-sm">✓ {v}</div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0F2A1A] text-white">
        <div className="max-w-6xl mx-auto px-5 py-10 grid md:grid-cols-3 gap-6 text-sm">
          <div><p className="font-black text-lg">Clever Biz <span className="text-[#FF6B00]">Synergy Links Nig. Ltd.</span></p><p className="text-gray-400 text-xs mt-1">RC: 1238707</p><p className="mt-3">📞 +234 808 8735 444</p><p>✉️ info@cleverbiz.com.ng</p><p>🌐 www.cleverbiz.com.ng</p></div>
          <div><p className="font-bold">Head Office</p><p className="text-gray-400 mt-2">Clever-Biz Plaza, Along Idi-Mango Road, Afobaja Junction, Adigbe, Abeokuta, Ogun State.</p></div>
          <div><p className="font-bold">Branch Office</p><p className="text-gray-400 mt-2">3 Church St, Akowonjo, 102213, Lagos, Nigeria.</p><a href="https://wa.me/2348088735444" className="inline-block mt-4 bg-[#25D366] text-white px-5 py-2.5 rounded-full font-bold text-xs">Chat on WhatsApp →</a></div>
        </div>
        <p className="text-center text-[11px] text-gray-500 pb-6">© 2026 Clever Biz Synergy Links Nig. Ltd. All rights reserved.</p>
      </footer>
    </div>
  );
}
