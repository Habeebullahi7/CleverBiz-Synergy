"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import BottomNav from "@/components/BottomNav";
export const dynamic = "force-dynamic";

export default function Payments() {
  const [list, setList] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [forWhat, setForWhat] = useState("Rent - Akowonjo");
  const [method, setMethod] = useState("Bank Transfer");
  const [selected, setSelected] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    const { data } = await supabase.from("payments").select("*").order("id", { ascending: false });
    if (data) setList(data);
  }
  useEffect(() => { load(); }, []);

  async function add() {
    if (!name || !amount) return alert("Fill name + amount");
    setLoading(true);
    const { error } = await supabase.from("payments").insert([{ tenant_name: name, amount: Number(amount), for_what: forWhat, method }]);
    if (error) alert(error.message);
    else { setName(""); setAmount(""); load(); }
    setLoading(false);
  }

  function printOne(p: any) {
    setSelected(p);
    setTimeout(() => window.print(), 300);
  }

  function shareOne(p: any) {
    const msg = encodeURIComponent(`CLEVER-BIZ SYNERGY LINKS NIG. LTD (RC: 1238707)\n\nRECEIPT #CB-${p.id}\nReceived from: ${p.tenant_name}\nAmount: ₦${Number(p.amount).toLocaleString()}\nFor: ${p.for_what}\nDate: ${new Date(p.created_at || Date.now()).toLocaleDateString()}\nPayment: ${p.method || "Bank Transfer"}\n\nThank you for your business.\n📞 +234 808 8735 444\n📍 Clever-Biz Plaza, Adigbe, Abeokuta`);
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #single-receipt, #single-receipt * { visibility: visible; }
          #single-receipt { position: absolute; left: 0; top: 0; width: 100%; padding: 20px; background: white; }
          .no-print { display: none !important; }
        }
      `}</style>

      <header className="bg-[#0F2A1A] text-white px-5 py-4 flex justify-between no-print">
        <p className="font-black">Payments & Receipts</p>
        <Link href="/dashboard">← Dashboard</Link>
      </header>

      <div className="max-w-3xl mx-auto px-5 py-6 no-print">
        <div className="bg-white border rounded-2xl p-4 grid gap-3">
          <p className="font-black">+ Record New Payment</p>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tenant / Buyer Name" className="border rounded-xl p-3 w-full" />
          <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount - e.g. 2500000" type="number" className="border rounded-xl p-3 w-full" />
          <select value={forWhat} onChange={(e) => setForWhat(e.target.value)} className="border rounded-xl p-3 w-full">
            <option>Rent - Akowonjo</option>
            <option>Rent - Adigbe</option>
            <option>Rent - Kobape</option>
            <option>Rent - Shasha</option>
            <option>Building Materials</option>
            <option>Land - Full Plot</option>
            <option>Land - Half Plot</option>
            <option>Shop Rent</option>
            <option>Car Sale</option>
          </select>
          <select value={method} onChange={(e) => setMethod(e.target.value)} className="border rounded-xl p-3 w-full">
            <option>Bank Transfer</option><option>Cash</option><option>POS</option><option>Cheque</option>
          </select>
          <button onClick={add} className="bg-[#FF6B00] text-white font-bold py-3 rounded-xl">{loading ? "Saving..." : "Save Payment → Generate Receipt"}</button>
        </div>

        <div className="mt-5 grid gap-3">
          {list.map((p) => (
            <div key={p.id} className="bg-white border rounded-2xl p-4 flex justify-between items-center">
              <div>
                <p className="font-bold">RECEIPT #CB-{p.id} — {p.tenant_name}</p>
                <p className="text-sm text-gray-500">₦{Number(p.amount).toLocaleString()} • {p.for_what} • {new Date(p.created_at || Date.now()).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setSelected(p)} className="bg-black text-white text-xs font-bold px-3 py-2 rounded-lg">View Receipt</button>
                <button onClick={() => printOne(p)} className="bg-[#0F2A1A] text-white text-xs font-bold px-3 py-2 rounded-lg">Print</button>
                <button onClick={() => shareOne(p)} className="bg-[#25D366] text-white text-xs font-bold px-3 py-2 rounded-lg">WhatsApp</button>
              </div>
            </div>
          ))}
          {list.length === 0 && <p className="text-center text-gray-500 text-sm bg-white p-4 rounded-2xl">No payments yet.</p>}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[600px] max-h-[90vh] overflow-y-auto rounded-2xl">
            <div id="single-receipt" className="p-6 md:p-8 text-black">
              <div className="flex justify-between items-start border-b-4 border-[#FF6B00] pb-4">
                <div className="flex gap-3">
                  <div className="w-14 h-14 bg-[#FF6B00] rounded-xl flex items-center justify-center text-white font-black text-3xl shrink-0">C</div>
                  <div>
                    <p className="font-black text-[18px] leading-tight">CLEVER-BIZ SYNERGY<br />LINKS NIG. LTD.</p>
                    <p className="text-[11px] text-gray-500">RC: 1238707 • SERVICE ABOVE SELF</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="bg-[#0F2A1A] text-white text-xs font-black px-3 py-1.5 rounded-full inline-block">OFFICIAL RECEIPT</p>
                  <p className="font-black text-lg mt-2">#CB-{selected.id}</p>
                  <p className="text-xs text-gray-500">{new Date(selected.created_at || Date.now()).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
                </div>
              </div>

              <p className="text-[11px] text-gray-500 mt-3 text-center">Clever-Biz Plaza, Along Idi-Mango Road, Afobaja Junction, Adigbe, Abeokuta, Ogun State. • Branch: 3 Church St, Akowonjo, Lagos<br />📞 +234 808 8735 444 • ✉️ info@cleverbiz.com.ng • 🌐 www.cleverbiz.com.ng</p>

              <div className="mt-6 space-y-4 text-[15px]">
                <div className="flex justify-between border-b border-dashed pb-3"><span className="text-gray-500">Received From:</span><span className="font-black text-right">{selected.tenant_name}</span></div>
                <div className="flex justify-between border-b border-dashed pb-3"><span className="text-gray-500">Being Payment For:</span><span className="font-bold text-right">{selected.for_what}</span></div>
                <div className="flex justify-between border-b border-dashed pb-3"><span className="text-gray-500">Payment Method:</span><span className="font-bold">{selected.method || "Bank Transfer"}</span></div>
                <div className="bg-[#FFF1E6] rounded-2xl p-4 flex justify-between items-center mt-2">
                  <span className="font-black">AMOUNT PAID</span>
                  <span className="font-black text-[26px] text-[#FF6B00]">₦{Number(selected.amount).toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-xl">✅ This receipt is valid for {selected.for_what}. Please keep it safe. No refund after payment except as agreed by management. For verification, call +234 808 8735 444.</p>
              </div>

              {/* SIGNATURE - NOW CLEVER-BIZ, NOT HABEEB */}
              <div className="flex justify-between items-end mt-10">
                <div className="text-center">
                  <p className="font-black text-[26px] leading-none tracking-tight">Clever<span className="text-[#FF6B00]">-Biz</span></p>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-gray-500 mt-1">SYNERGY LINKS NIG. LTD.</p>
                  <div className="border-t-2 border-black w-44 pt-1 mt-2 mx-auto">
                    <p className="text-[11px] font-bold">AUTHORIZED SIGNATURE</p>
                    <p className="text-[10px] text-gray-500">For: Clever-Biz Synergy Links Nig. Ltd.</p>
                  </div>
                </div>
                <div className="w-24 h-24 border-[3px] border-[#FF6B00] rounded-full flex items-center justify-center rotate-[-12deg] text-center">
                  <p className="text-[#FF6B00] font-black text-[10px] leading-tight">PAID<br />✓<br />CLEVER-BIZ<br />RC 1238707</p>
                </div>
              </div>

              <p className="text-center text-[11px] text-gray-400 mt-6 border-t pt-3">Thank you for doing business with us! • 10 Years of Trust • God Bless You 🙏</p>
            </div>

            <div className="p-4 flex gap-2 no-print border-t bg-gray-50 rounded-b-2xl">
              <button onClick={() => printOne(selected)} className="flex-1 bg-black text-white font-bold py-3 rounded-xl text-sm">🖨️ Print This Receipt Only</button>
              <button onClick={() => shareOne(selected)} className="flex-1 bg-[#25D366] text-white font-bold py-3 rounded-xl text-sm">Share on WhatsApp</button>
              <button onClick={() => setSelected(null)} className="px-4 bg-white border font-bold rounded-xl text-sm">Close</button>
            </div>
          </div>
        </div>
      )}

      <div className="no-print"><BottomNav /></div>
    </div>
  );
              }
