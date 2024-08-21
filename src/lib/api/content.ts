import type {
  ContentRequest,
  ContentResponse,
  Content,
  ContentType,
} from "@/types";
import { siteConfig } from "@/siteConfig";
import {
  getMarkdownFile,
  getMarkdownFilePaths,
  processMarkdown,
} from "./markdown";
import { processContentChunks } from "./shortcode";

export async function getContentBySlug(
  contentType: ContentType,
  slug: string
): Promise<Content | null> {
  const markdownContent = getMarkdownFile(contentType, slug);
  if (!markdownContent) return null;
  const { data, content } = markdownContent;
  const htmlContent = await processMarkdown(content, slug, contentType);
  const contentChunks = await processContentChunks(htmlContent);

  return {
    contentType,
    slug,
    htmlContent,
    contentChunks,
    ...data,
  } as Content;
}

export async function getContent({
  contentType = "post",
  tag,
  page = 1,
  limit = siteConfig.defaultPageSize,
}: Partial<ContentRequest> = {}): Promise<ContentResponse> {
  const slugs = getMarkdownFilePaths(contentType);
  const allContent = await Promise.all(
    slugs.map((slug) => getContentBySlug(contentType, slug))
  ).then((contents) =>
    contents.filter((content): content is Content => content !== null)
  );

  const filteredContent = tag
    ? allContent.filter((item) => item.tags?.includes(tag))
    : allContent;

  filteredContent.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

  const total = filteredContent.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const results = filteredContent.slice(start, end);

  return {
    results,
    pagination: { total, totalPages, currentPage: page, pageSize: limit },
  };
}

export async function getAllTags(): Promise<string[]> {
  const { results } = await getContent();
  const tagsSet = new Set<string>(results.flatMap((item) => item.tags || []));
  return Array.from(tagsSet);
}
