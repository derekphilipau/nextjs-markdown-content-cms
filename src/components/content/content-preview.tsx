import { type Author } from "@/types";
import Link from "next/link";
import CoverImage from "../cover-image";
import DateFormatter from "../date-formatter";
import { siteConfig } from "@/siteConfig";
import type { Content } from "@/types";

type ContentPreviewProps = {
  content: Content;
  size?: "small" | "large";
};

export function ContentPreview({
  content,
  size = "small",
}: ContentPreviewProps) {
  const { contentType, title, date, excerpt, slug } = content;
  const contentTypeSlug =
    contentType === "page" ? "" : siteConfig.contentTypes[contentType].slug;
  return (
    <div>
      <div className="mb-5">
        <CoverImage content={content} size={size} />
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
