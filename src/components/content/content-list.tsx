import { Content } from "@/types";
import { ContentPreview } from "./content-preview";
import { Pagination } from "../layout/pagination";
import type { Pagination as PaginationType, ContentType } from "@/types";
import { getDictionary } from "@/lib/dictionaries/dictionaries";
import { siteConfig } from "@/siteConfig";

type ContentListProps = {
  contentType?: ContentType;
  items?: Content[];
  pagination?: PaginationType;
  showTitle?: boolean;
};

export function ContentList({
  contentType,
  items,
  pagination,
  showTitle = false,
}: ContentListProps) {
  if (!items || items.length === 0 || !contentType) return null;
  const dict = getDictionary();
  const contentTypeSlug = siteConfig.contentTypes[contentType].slug;
  return (
    <section className="">
      {showTitle && (
        <h2 className="h2-heading">{dict.contentTypes[contentType].plural}</h2>
      )}
      <div className="content-grid">
        {items.map((content) => (
          <div className={content.isHighlighted ? "col-span-full" : ""}>
            <ContentPreview
              content={content}
              size={content.isHighlighted ? "large" : "small"}
            />
          </div>
        ))}
      </div>
      <Pagination pagination={pagination} basePath={`/${contentTypeSlug}`} />
    </section>
  );
}
