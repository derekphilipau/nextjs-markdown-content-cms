import { type Author } from "@/types";
import Link from "next/link";
import CoverImage from "../cover-image";
import DateFormatter from "../date-formatter";
import { siteConfig } from "@/siteConfig";

type ContentPreviewProps = {
  contentType: string;
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export function ContentPreview({
  contentType,
  title,
  coverImage,
  date,
  excerpt,
  slug,
}: ContentPreviewProps) {
  const contentTypeSlug = siteConfig.contentTypes[contentType].slug;
  return (
    <div>
      <div className="mb-5">
        <CoverImage
          contentType={contentType}
          slug={slug}
          title={title}
          src={coverImage}
        />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`${contentTypeSlug}/${slug}`}>{title}</Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
    </div>
  );
}
