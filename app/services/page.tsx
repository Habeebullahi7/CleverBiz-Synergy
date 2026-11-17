import Footer from "@/components/Footer";
import Link from "next/link";
export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-5 py-10">
        <h1 className="text-3xl font-black">Our Services</h1>
        <p className="text-gray-500 mt-1">What Clever-Biz does for you — RC: 1238707</p>
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {[
            ["🏠", "Property Sales", "Land, Houses, Shops & Plots in Abeokuta, Lagos & Ogun. Verified documents, no wahala."],
            ["🔑", "Rentals & Tenancy", "Houses, Shops, Self-Contain & Flats. We manage your rent, receipts & renewals."],
            ["🚗", "Cars & Automobile", "Toyota, Honda, Lexus, Land Rover, KIA, Mercedes & more. Inspected before sale."],
            ["📋", "Property Management", "We collect rent, follow up tenants, and give you full report as landlord."],
            ["📄", "Documentation & Verification", "We verify survey, C of O, family receipt & title before you pay."],
            ["💼", "Agent Partnership", "Join as Agent, list properties, earn commission. We handle receipt & trust."],
          ].map(([icon, title, desc]) => (
            <div key={title} className="border rounded-[20px] p-5">
              <p className="text-2xl">{icon}</p>
              <p className="font-black mt-2">{title}</p>
              <p className="text-sm text-gray-600 mt-1">{desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-[#0F2A1A] text-white rounded-[20px] p-5 mt-6 flex justify-between items-center">
          <div><p className="font-black">Need one of these?</p><p className="text-sm text-white/60">Chat us now, we go reply fast.</p></div>
          <Link href="/contact" className="bg-[#FF6B00] px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap">Contact Us →</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
