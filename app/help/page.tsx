import Footer from "@/components/Footer";
export default function Help() {
  const faqs = [
    ["How do I buy a Land / House?", "Go to Properties → Click the one you like → Click 'I Want This' → We go chat you on WhatsApp and show you documents before you pay."],
    ["How do I pay my rent?", "Login as Tenant → Go to My House → You go see how much remain → Chat us on WhatsApp for payment details → You go get receipt after payment."],
    ["How do I get my receipt?", "Login as Tenant → My House → My Receipts → Or ask Admin on WhatsApp, we go send your receipt PDF."],
    ["I forgot my password, wetin I go do?", "Chat us on WhatsApp +234 808 8735 444 with your email, we go reset am for you."],
    ["How do I become an Agent?", "Go to Careers page → Fill your details → Or chat us. Once approved, we go create Agent account for you."],
    ["Is Clever-Biz registered?", "Yes. Clever Biz Synergy Links Nig. Ltd. • RC: 1238707 • Head Office: Adigbe, Abeokuta."],
    ["Can I pay in installments?", "Yes, for some properties. Chat us to confirm installment plan for that property."],
  ];
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-5 py-10">
        <h1 className="text-3xl font-black">Help Center / FAQs</h1>
        <p className="text-gray-500 mt-1">Quick answers. If you no see your own, chat us.</p>
        <div className="space-y-3 mt-6">
          {faqs.map(([q, a]) => (
            <div key={q} className="border rounded-[18px] p-4">
              <p className="font-black">{q}</p>
              <p className="text-sm text-gray-600 mt-1">{a}</p>
            </div>
          ))}
        </div>
        <a href="https://wa.me/2348088735444?text=Hello Clever-Biz, I need help" target="_blank" className="block text-center bg-[#25D366] text-white font-bold py-3.5 rounded-full mt-6">Still need help? Chat on WhatsApp →</a>
      </div>
      <Footer />
    </div>
  );
        }
