import { remark } from "remark";
import html from "remark-html";
import { visit } from "unist-util-visit";
import { resolveImagePath } from "./image";
import remarkGfm from "remark-gfm";

export default async function markdownToHtml(
  contentTypeSlug: string,
  slug: string,
  markdown: string
) {
  const result = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .use(() => (tree) => {
      visit(tree, "image", (node: { url: string }) => {
        node.url = resolveImagePath(contentTypeSlug, slug, node.url);
      });
    })
    .process(markdown);
  return result.toString();
}
