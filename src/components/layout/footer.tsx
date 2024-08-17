import { Container } from "@/components/layout/container";
import { getDictionary } from "@/lib/dictionaries/dictionaries";
import { Navigation } from "./navigation";
import { siteConfig } from "@/siteConfig";
import Link from "next/link";

export function Footer() {
  const dict = getDictionary();
  return (
    <footer className="border-t border-secondary mt-12">
      <Container>
        <div className="py-12 flex flex-col lg:flex-row items-center gap-3">
          <h3 className="h3-header text-nowrap">
            <Link href="/" className="nav-link">
              {dict.site.title}
            </Link>
          </h3>
          <p className="text-lg text-center lg:text-left lg:w-1/2">
            {dict.site.tagline}
          </p>
          <div className="flex flex-col lg:flex-row gap-y-3 lg:gap-x-4 lg:w-full items-center lg:justify-end">
            <Navigation items={siteConfig.primaryNavigation} style="primary" />
            <Navigation
              items={siteConfig.secondaryNavigation}
              style="primary"
            />
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
