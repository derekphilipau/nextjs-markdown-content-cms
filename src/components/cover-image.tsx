import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import { resolveImagePath } from "@/lib/util/image";
import { siteConfig } from "@/siteConfig";

type Props = {
  contentType: string;
  title: string;
  src: string;
  slug: string;
};

const CoverImage = ({ contentType, title, src, slug }: Props) => {
  const contentTypeSlug = siteConfig.contentTypes[contentType].slug;
  const resolvedSrc = resolveImagePath(contentTypeSlug, slug, src);

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
