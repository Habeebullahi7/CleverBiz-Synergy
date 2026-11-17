"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const path = usePathname();
  const items = [
    { href: "/dashboard", label: "Home", icon: "🏠" },
    { href: "/properties", label: "Properties", icon: "🏘️" },
    { href: "/tenants", label: "Tenants", icon: "👥" },
    { href: "/payments", label: "Payments", icon: "🧾" },
  ];

  return (
    <>
      {/* Floating Pill Nav - Mobile Only */}
      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        <div className="bg-[#0F2A1A]/95 backdrop-blur-xl border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.35)] rounded-full px-2 py-2 flex justify-between items-center">
          {items.map((it) => {
            const active = path === it.href;
            return (
              <Link
                key={it.href}
                href={it.href}
                className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-full transition-all ${
                  active ? "bg-[#FF6B00] text-white scale-105 shadow-lg" : "text-white/60"
                }`}
              >
                <span className="text-[20px] leading-none">{it.icon}</span>
                <span className={`text-[10px] mt-0.5 ${active ? "font-black" : "font-medium"}`}>{it.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Center + Button - Optional, for quick Add */}
      <Link
        href="/properties"
        className="fixed bottom-[88px] right-5 z-50 md:hidden w-12 h-12 bg-[#FF6B00] text-white rounded-full flex items-center justify-center text-2xl font-black shadow-[0_10px_25px_rgba(255,107,0,0.5)] active:scale-95"
      >
        +
      </Link>
    </>
  );
}
