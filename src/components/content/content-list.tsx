import { Content } from "@/types";
import { ContentPreview } from "./content-preview";
import { Pagination } from "../layout/pagination";
import type { Pagination as PaginationType, ContentType } from "@/types";
import { getDictionary } from "@/lib/dictionaries/dictionaries";

type ContentListProps = {
  contentType: ContentType;
  items: Content[];
  pagination: PaginationType;
  showTitle?: boolean;
};

export function ContentList({
  contentType,
  items,
  pagination,
  showTitle = false,
}: ContentListProps) {
  const dict = getDictionary();
  return (
    <section className="py-6">
      {showTitle && (
        <h2 className="mb-8 h2-heading">
          {dict.contentTypes[contentType].plural}
        </h2>
      )}
      <div className="content-grid">
        {items.map((content) => (
          <div className={content.isHighlighted ? "col-span-full" : ""}>
            <ContentPreview content={content} />
          </div>
        ))}
      </div>
      <Pagination pagination={pagination} basePath="/" />
    </section>
  );
}
