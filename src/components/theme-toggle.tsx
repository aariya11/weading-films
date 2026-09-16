"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8" />;
  }

  const isDark = theme === "dark" || resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "flex items-center justify-center min-w-[36px] min-h-[36px] w-9 h-9 rounded-full hover:bg-ink/5 dark:hover:bg-white/10 transition-colors text-ink/80 hover:text-ink dark:text-white/80 dark:hover:text-white cursor-pointer select-none touch-manipulation",
        className
      )}
      aria-label="Toggle visual theme"
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}

export default ThemeToggle;
