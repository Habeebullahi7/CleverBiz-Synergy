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
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="bg-white shadow-[0_15px_40px_rgba(0,0,0,0.15)] rounded-full px-2 py-2 flex justify-between items-center border">
        {items.map((it) => {
          const active = path === it.href;
          return (
            <Link key={it.href} href={it.href} className={`flex-1 flex flex-col items-center py-2 px-1 rounded-full transition-all ${active ? "bg-[#0F2A1A] text-white" : "text-gray-400"}`}>
              <span className="text-[19px] leading-none">{it.icon}</span>
              <span className={`text-[10px] mt-0.5 ${active ? "font-black" : "font-medium"}`}>{it.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
