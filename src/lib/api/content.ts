import type { ContentRequest, ContentResponse, MarkdownContent } from "@/types";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { siteConfig } from "@/siteConfig";
import markdownToHtml from "@/lib/util/markdownToHtml";

const contentDirectory = join(process.cwd(), "public/content");

export function getContentDirectory(contentType: string) {
  const slug = siteConfig.contentTypes[contentType].slug;
  return join(contentDirectory, slug);
}

export function getContentSlugs(contentType: string) {
  const directory = getContentDirectory(contentType);
  return fs
    .readdirSync(directory)
    .filter((file) => fs.statSync(join(directory, file)).isDirectory());
}

export async function getContentBySlug(contentType: string, slug: string) {
  const fullPath = join(getContentDirectory(contentType), slug, "index.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const contentTypeSlug = siteConfig.contentTypes[contentType].slug;
  const htmlContent = await markdownToHtml(contentTypeSlug, slug, content);

  return {
    ...data,
    slug,
    content,
    htmlContent,
    contentType,
  } as MarkdownContent;
}

export async function getContent({
  contentType = "post",
  tag,
  page = 1,
  limit = siteConfig.defaultPageSize,
}: Partial<ContentRequest> = {}): Promise<ContentResponse> {
  const slugs = getContentSlugs(contentType);
  let allContent = await Promise.all(
    slugs.map((slug) => getContentBySlug(contentType, slug))
  );

  if (tag) {
    allContent = allContent.filter(
      (contentItem) => contentItem.tags && contentItem.tags.includes(tag)
    );
  }

  allContent.sort((content1, content2) =>
    content1.date > content2.date ? -1 : 1
  );

  const total = allContent.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const results = allContent.slice(start, end);

  return {
    results,
    pagination: {
      total,
      totalPages,
      currentPage: page,
      pageSize: limit,
    },
  };
}

export async function getAllTags(): Promise<string[]> {
  const response = await getContent();
  const content = response.results;
  const tagsSet = new Set<string>();

  content.forEach((contentItem) => {
    if (contentItem.tags) {
      contentItem.tags.forEach((tag) => tagsSet.add(tag));
    }
  });

  return Array.from(tagsSet);
}
