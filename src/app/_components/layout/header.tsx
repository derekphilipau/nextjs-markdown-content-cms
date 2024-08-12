import Link from "next/link";
import { Navigation } from "./navigation";
import { ThemeSwitcher } from "./theme-switcher";
import { getDictionary } from "@/app/dictionaries/dictionaries";
import { siteConfig } from "@/siteConfig";

export function Header() {
  const dict = getDictionary();
  const combinedNavItems = [
    ...siteConfig.primaryNavigation,
    ...siteConfig.secondaryNavigation,
  ];

  return (
    <header className="container mx-auto px-5 flex flex-wrap items-center justify-between mb-20 mt-8">
      <div className="flex flex-col mb-4 md:mb-0">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight">
          <Link href="/">{dict.site.title}</Link>
        </h2>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          {dict.site.tagline}
        </p>
      </div>
      <Navigation items={combinedNavItems} style="primary" />
      <ThemeSwitcher />
    </header>
  );
}
