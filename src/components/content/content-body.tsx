"use client";

import type { Content } from "@/types";
import ContentRenderer from "../content-renderer";

type ContentBodyProps = {
  content: Content;
};

export function ContentBody({ content }: ContentBodyProps) {
  if (!content) return null;
  return (
    <article className="max-w-2xl mx-auto prose prose-lg lg:prose-2xl dark:prose-invert">
      <ContentRenderer htmlContent={content.htmlContent} />
    </article>
  );
}
