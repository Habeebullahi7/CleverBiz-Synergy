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
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-[0_-5px_20px_rgba(0,0,0,0.08)] z-50 md:hidden">
      <div className="grid grid-cols-4">
        {items.map((it) => {
          const active = path === it.href;
          return (
            <Link key={it.href} href={it.href} className={`py-3 text-center ${active ? "text-[#FF6B00] font-black" : "text-gray-500"}`}>
              <p className="text-xl leading-none">{it.icon}</p>
              <p className="text-[11px] mt-1">{it.label}</p>
              {active && <div className="h-1 w-8 bg-[#FF6B00] rounded-full mx-auto mt-1" />}
            </Link>
          );
        })}
      </div>
      {/* Add space so content no hide behind nav */}
      <div className="h-[env(safe-area-inset-bottom)] bg-white" />
    </div>
  );
        }
