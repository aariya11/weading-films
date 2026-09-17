"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "Client Advisory & FAQs", href: "/help" },
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
            (tab.href === "/notifications" && pathname === "/settings/notifications");

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "px-4 py-2 rounded-full font-mono text-xs tracking-wider uppercase transition-all duration-200 select-none whitespace-nowrap",
                isActive
                  ? "bg-ink text-paper font-semibold shadow-xs"
                  : "bg-paper-warm text-charcoal/80 hover:text-ink hover:bg-paper-warm/80 border border-ink/10 font-medium"
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
