import Avatar from "@/components/avatar";
import CoverImage from "@/components/cover-image";
import { type Author } from "@/types";
import Link from "next/link";
import DateFormatter from "../date-formatter";
import { siteConfig } from "@/siteConfig";

type ContentHeroProps = {
  contentType: string;
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author?: Author;
  slug: string;
};

export function ContentHero({
  contentType,
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: ContentHeroProps) {
  const contentTypeSlug = siteConfig.contentTypes[contentType].slug;
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage
          contentType={contentType}
          title={title}
          src={coverImage}
          slug={slug}
        />
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
