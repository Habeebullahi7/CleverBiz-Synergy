import Footer from "@/components/Footer";
export default function Cookies() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-5 py-10">
        <h1 className="text-3xl font-black">Cookie Policy</h1>
        <p className="text-sm text-gray-500">Clever Biz Synergy Links Nig. Ltd. • RC: 1238707</p>
        <div className="space-y-4 mt-6 text-gray-700 leading-relaxed">
          <p><b>1. What be Cookies:</b> Small files wey your browser save to remember say you don login, so you no go dey login every time.</p>
          <p><b>2. Cookies we use:</b> <br/>• <b>Login Cookie:</b> To keep you logged in as Admin / Agent / Tenant / Buyer.<br/>• <b>Preference Cookie:</b> To remember your language and last page.<br/>• <b>Analytics:</b> To know which properties people dey view most, so we go improve.</p>
          <p><b>3. We no use cookies to:</b> Sell your data, show you ads from other companies, or track you for other websites.</p>
          <p><b>4. You fit turn off:</b> Go to your browser Settings → Privacy → Block Cookies. But if you block login cookie, you go need to login every time.</p>
          <p><b>5. Questions:</b> info@cleverbiz.com.ng / +234 808 8735 444</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
