import type { ContentChunk, ContentType, ContentRequest } from "@/types";
import { getContent } from "./content";

/**
 * This might be naive:  A shortcode is identified as either:
 * 1. A single line of text surrounded by square brackets, e.g. [component:contact-form]
 * 2. A multi-line block of text surrounded by square brackets, e.g. [gallery]...[/gallery]
 */
function splitMarkdownIntoChunks(markdown: string): string[] {
  const singleLineRegex = /(\[.*?\]|\[.*?\].*?$|[^\[]+)/g;
  const multiLineRegex = /(\[.*?\][\s\S]*?\[\/.*?\])/g;

  const initialSplit = markdown.split(multiLineRegex);
  return initialSplit.flatMap((chunk) =>
    chunk.match(multiLineRegex) ? [chunk] : chunk.match(singleLineRegex) || []
  );
}

const parseParams = (paramString: string): Record<string, string> =>
  Object.fromEntries(
    paramString.split(",").map((param) => {
      const [key, value] = param
        .trim()
        .split("=")
        .map((p) => p.trim());
      return [key, value];
    })
  );

async function processComponentShortcode(
  chunk: string
): Promise<ContentChunk | null> {
  const match = chunk.match(/^\[component:([^\]]+)\]$/);
  if (!match) return null;

  const [componentName, ...componentParams] = match[1]
    .split(",")
    .map((p) => p.trim());
  return {
    type: "component",
    content: componentName,
    params: parseParams(componentParams.join(",")),
  };
}

async function processContentShortcode(
  chunk: string
): Promise<ContentChunk | null> {
  const match = chunk.match(/^\[content:([^\]]+)\]$/);
  if (!match) return null;

  const params = parseParams(match[1]);
  const contentRequest: Partial<ContentRequest> = {
    contentType: params.type as ContentType,
    tag: params.tag,
    page: params.page ? parseInt(params.page, 10) : undefined,
    limit: params.limit ? parseInt(params.limit, 10) : undefined,
  };
  const contentData = await getContent(contentRequest);
  return { type: "content", params, data: contentData };
}

async function processGalleryShortcode(
  chunk: string
): Promise<ContentChunk | null> {
  const match = chunk.match(/^\[gallery\]([\s\S]*?)\[\/gallery\]$/);
  if (!match) return null;

  const images = match[1].match(/<img[^>]+>/g) || [];
  return {
    type: "gallery",
    content: images.join("\n"),
  };
}

export async function processContentChunks(
  content: string
): Promise<ContentChunk[]> {
  if (!content) return [];
  const chunks = splitMarkdownIntoChunks(content);
  const processedChunks: ContentChunk[] = [];

  for (const chunk of chunks) {
    const processors = [
      processComponentShortcode,
      processContentShortcode,
      processGalleryShortcode,
    ];

    let processed = false;
    for (const processor of processors) {
      const result = await processor(chunk);
      if (result) {
        processedChunks.push(result);
        processed = true;
        break;
      }
    }

    if (!processed && chunk.trim() !== "") {
      processedChunks.push({ type: "text", content: chunk });
    }
  }

  return processedChunks;
}
