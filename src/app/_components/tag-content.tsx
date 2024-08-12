import { getContentBySlug } from "@/lib/api/content";

export default async function TagContent({ tag }: { tag: string }) {
  const tagContent = await getContentBySlug("tag", tag);

  if (!tagContent) {
    return null;
  }

  return (
    <div
      className="mb-8 prose prose-lg lg:prose-2xl dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: tagContent.htmlContent }}
    />
  );
}
