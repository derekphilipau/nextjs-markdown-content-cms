import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import { resolveImagePath } from "@/lib/util/image";
import { siteConfig } from "@/siteConfig";
import type { MarkdownContent } from "@/types";

type CoverImageProps = {
  content: MarkdownContent;
};

const CoverImage = ({ content }: CoverImageProps) => {
  const { contentType, title, coverImage, slug } = content;
  const contentTypeSlug = siteConfig.contentTypes[contentType].slug;
  const resolvedSrc = resolveImagePath(contentTypeSlug, slug, coverImage);

  const image = (
    <Image
      src={`${resolvedSrc}`}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-sm w-full", {
        "hover:shadow-lg transition-shadow duration-200": slug,
      })}
      width={1300}
      height={630}
    />
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/${contentTypeSlug}/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
