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
          <div className="text-center lg:text-left">
            <h3 className="h3-heading text-nowrap pb-4">
              <Link href="/" className="nav-link">
                {dict.site.title}
              </Link>
            </h3>
            <p className="text-tagline">{dict.site.tagline}</p>
          </div>
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
