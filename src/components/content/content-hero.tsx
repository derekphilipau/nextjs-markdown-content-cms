import Avatar from "@/components/avatar";
import CoverImage from "@/components/cover-image";
import { type Author } from "@/types";
import Link from "next/link";
import DateFormatter from "../date-formatter";
import { siteConfig } from "@/siteConfig";
import type { MarkdownContent } from "@/types";

type ContentHeroProps = {
  content: MarkdownContent;
};

export function ContentHero({ content }: ContentHeroProps) {
  const { contentType, title, date, excerpt, slug } = content;
  const contentTypeSlug = siteConfig.contentTypes[contentType].slug;
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage content={content} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
            <Link href={`/${contentTypeSlug}/${slug}`}>{title}</Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DateFormatter dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
        </div>
      </div>
    </section>
  );
}
