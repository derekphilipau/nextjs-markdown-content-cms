import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

import type { SiteNavigationItem } from "@/types";

type NavigationProps = {
  items: SiteNavigationItem[];
  style: "primary" | "secondary";
};

export function Navigation({ items, style }: NavigationProps) {
  const baseClasses = "flex space-x-4";
  const styleClasses =
    style === "primary"
      ? "text-lg font-semibold"
      : "text-sm text-muted-foreground";

  return (
    <nav className={`${baseClasses} ${styleClasses}`}>
      {items.map((item) => {
        const Icon: LucideIcon | null = item.icon
          ? (LucideIcons[item.icon as keyof typeof LucideIcons] as LucideIcon)
          : null;

        return (
          <Link
            key={item.slug}
            href={item.slug}
            className="hover:text-blue-500 transition-colors flex items-center"
          >
            {item.icon && Icon ? <Icon size={24} /> : item.title}
          </Link>
        );
      })}
    </nav>
  );
}
