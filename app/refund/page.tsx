import Footer from "@/components/Footer";
export default function Refund() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-5 py-10">
        <h1 className="text-3xl font-black">Refund & Payment Policy</h1>
        <p className="text-sm text-gray-500">Clever Biz Synergy Links Nig. Ltd. • RC: 1238707 • Last updated: Nov 17, 2026</p>
        <div className="space-y-5 mt-6 text-gray-700 leading-relaxed">
          <p><b>1. Official Payment Only:</b> Pay only to Clever-Biz official account given on your receipt / WhatsApp from +234 808 8735 444. Payment to any other personal account without our receipt is not our responsibility.</p>
          <p><b>2. Inspection Fee / Commitment Fee:</b> Non-refundable, unless we fail to show you the property as agreed.</p>
          <p><b>3. Land / House Deposit:</b> If you cancel after we don reserve the property for you and reject other buyers, we go deduct 10% administrative fee, return the remaining 90% within 14 working days.</p>
          <p><b>4. Full Refund:</b> If the property title / document fails verification or the property no longer exists, you go get 100% refund within 7 working days.</p>
          <p><b>5. Rent:</b> Rent already used cannot be refunded. Unused rent can be refunded minus 10% admin fee, if you give 30 days notice.</p>
          <p><b>6. How to request refund:</b> Send email to info@cleverbiz.com.ng or WhatsApp +234 808 8735 444 with your name, receipt number, amount, and reason. We go reply within 48 hours.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
