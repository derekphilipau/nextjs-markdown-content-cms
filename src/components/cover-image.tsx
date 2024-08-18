import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import { resolveImagePath } from "@/lib/util/image";
import { siteConfig } from "@/siteConfig";
import type { Content } from "@/types";

type CoverImageProps = {
  content: Content;
  isLink?: boolean;
  size?: "small" | "large";
};

const CoverImage = ({
  content,
  isLink = true,
  size = "large",
}: CoverImageProps) => {
  const dimensions = {
    small: { width: 600, height: 400 },
    large: { width: 1920, height: 1080 },
  };
  const { width, height } = dimensions[size];

  const { contentType, title, coverImage, slug } = content;
  const imageSlug = siteConfig.contentTypes[contentType].slug;
  const contentTypeSlug =
    contentType === "page" ? "" : siteConfig.contentTypes[contentType].slug;

  const resolvedSrc = resolveImagePath(imageSlug, slug, coverImage);

  const image = (
    <Image
      src={`${resolvedSrc}`}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-sm w-full", {
        "hover:shadow-lg transition-shadow duration-200": slug,
      })}
      width={width}
      height={height}
    />
  );
  return (
    <div className="sm:mx-0">
      {slug && isLink ? (
        <Link href={`${contentTypeSlug}/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
