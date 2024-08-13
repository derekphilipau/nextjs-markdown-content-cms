import { MarkdownContent } from "@/types";
import { ContentPreview } from "./content-preview";
import { Pagination } from "../layout/pagination";
import type { Pagination as PaginationType } from "@/types";

type ContentListProps = {
  contentType: string;
  items: MarkdownContent[];
  pagination: PaginationType;
};

export function ContentList({
  contentType,
  items,
  pagination,
}: ContentListProps) {
  return (
    <section>
      <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
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
