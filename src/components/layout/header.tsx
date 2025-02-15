import Link from "next/link";
import { Navigation } from "./navigation";
import { ThemeSwitcher } from "./theme-switcher";
import { getDictionary } from "@/lib/dictionaries/dictionaries";
import { siteConfig } from "@/siteConfig";
import { Search } from "lucide-react";

export function Header() {
  const dict = getDictionary();
  const combinedNavItems = [
    ...siteConfig.primaryNavigation,
    ...siteConfig.secondaryNavigation,
  ];

  return (
    <header className="container max-w-7xl mx-auto px-5 flex flex-wrap items-center justify-between gap-y-4 gap-x-6 mb-8 md:mb-12 mt-4 md:mt-8">
      <div className="flex flex-col gap-y-2">
        <h2 className="h2-heading">
          <Link href="/" className="nav-link">
            {dict.site.title}
          </Link>
        </h2>
        <p className="text-tagline">{dict.site.tagline}</p>
      </div>
      <Navigation items={combinedNavItems} style="primary" />
      <div className="flex items-center gap-x-2 sm:gap-x-4">
        <Link href="/search" className="nav-link" aria-label="Search">
          <Search size={24} />
          <span className="sr-only">Search</span>
        </Link>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
