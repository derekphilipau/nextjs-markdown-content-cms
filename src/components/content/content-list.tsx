import { Content } from "@/types";
import { ContentPreview } from "./content-preview";
import { Pagination } from "../layout/pagination";
import type { Pagination as PaginationType, ContentType } from "@/types";
import { getDictionary } from "@/lib/dictionaries/dictionaries";

type ContentListProps = {
  contentType: ContentType;
  items: Content[];
  pagination: PaginationType;
};

export function ContentList({
  contentType,
  items,
  pagination,
}: ContentListProps) {
  const dict = getDictionary();
  return (
    <section className="py-6">
      <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        More {dict.contentTypes[contentType].plural}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {items.map((content) => (
          <ContentPreview content={content} />
        ))}
      </div>
      <Pagination pagination={pagination} basePath="/" />
    </section>
  );
}
