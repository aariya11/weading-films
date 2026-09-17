"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "Client Advisory & FAQs", href: "/help" },
  { label: "Client Profile", href: "/profile" },
  { label: "Order Tracking", href: "/orders" },
  { label: "Notification Settings", href: "/notifications" },
  { label: "Terms of Commission", href: "/terms" },
  { label: "Privacy Policy (DPDP)", href: "/privacy" },
  { label: "Cookie Preferences", href: "/cookies" },
];

export function HelpSuiteNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Help and Policy Suite Navigation"
      className={cn("w-full overflow-x-auto no-scrollbar py-2", className)}
    >
      <div className="flex items-center gap-2 sm:gap-3 min-w-max pb-1">
        {TABS.map((tab) => {
          const isActive =
            pathname === tab.href ||
            (tab.href === "/notifications" && pathname === "/settings/notifications") ||
            (tab.href === "/orders" && pathname === "/tracking") ||
            (tab.href === "/profile" && pathname === "/settings/profile");

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "btn min-h-[38px] px-4 py-2 rounded-full font-mono text-xs tracking-wider uppercase transition-all duration-200 select-none whitespace-nowrap inline-flex items-center justify-center cursor-pointer",
                isActive
                  ? "bg-ink !text-white font-bold shadow-xs hover:!text-white"
                  : "bg-paper-warm !text-charcoal border border-ink/15 hover:border-ink hover:!text-ink hover:bg-paper font-semibold"
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default HelpSuiteNav;
