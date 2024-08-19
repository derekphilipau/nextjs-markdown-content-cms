import type {
  ContentRequest,
  ContentResponse,
  Content,
  ContentType,
  ContentChunk,
} from "@/types";
import { siteConfig } from "@/siteConfig";
import {
  getMarkdownFile,
  getMarkdownFilePaths,
  processMarkdown,
} from "./markdown";

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

export async function processContentChunks(
  content: string
): Promise<ContentChunk[]> {
  const chunks: ContentChunk[] = [];
  const regex = /\[(component|content):(\s*[^\]]+)?\]/g;
  let lastIndex = 0;

  let match;
  while ((match = regex.exec(content)) !== null) {
    const [fullMatch, shortcodeType, paramsString] = match;
    const start = match.index!;
    const end = start + fullMatch.length;

    if (start > lastIndex) {
      chunks.push({
        type: "text",
        content: content.slice(lastIndex, start).trim(),
      });
    }

    if (shortcodeType === "component") {
      const [componentName, ...componentParams] = paramsString
        .split(",")
        .map((p) => p.trim());
      const params: Record<string, string> = {};
      componentParams.forEach((param) => {
        const [key, value] = param.split("=").map((p) => p.trim());
        params[key] = value;
      });
      chunks.push({
        type: "component",
        content: componentName,
        params,
      });
    } else if (shortcodeType === "content") {
      const params: Record<string, string> = {};
      if (paramsString) {
        paramsString.split(",").forEach((param) => {
          const [key, value] = param
            .trim()
            .split("=")
            .map((p) => p.trim());
          params[key] = value;
        });
      }

      const contentRequest: Partial<ContentRequest> = {
        contentType: params.type as ContentType,
        tag: params.tag,
        page: params.page ? parseInt(params.page, 10) : undefined,
        limit: params.limit ? parseInt(params.limit, 10) : undefined,
      };

      const contentData = await getContent(contentRequest);

      chunks.push({
        type: "content",
        params,
        data: contentData,
      });
    }

    lastIndex = end;
  }

  if (lastIndex < content.length) {
    chunks.push({ type: "text", content: content.slice(lastIndex).trim() });
  }

  return chunks;
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
