import type { Content } from "@/types";
import ContentRenderer from "../content-renderer";

type ContentBodyProps = {
  content: Content;
};

export function ContentBody({ content }: ContentBodyProps) {
  if (!content?.contentChunks) return null;
  return (
    <article className="max-w-3xl mx-auto prose prose-lg lg:prose-2xl dark:prose-invert">
      <ContentRenderer contentChunks={content.contentChunks} />
    </article>
  );
}
