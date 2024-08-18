import type {
  ContentRequest,
  ContentResponse,
  Content,
  ContentType,
} from "@/types";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { siteConfig } from "@/siteConfig";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import type { Image } from "mdast";

const CONTENT_DIRECTORY = path.join(process.cwd(), "public/content");

export function getContentDirectory(contentType: ContentType) {
  const slug = siteConfig.contentTypes[contentType].slug;
  return path.join(CONTENT_DIRECTORY, slug);
}

function getContentFiles(directory: string): string[] {
  const files: string[] = [];

  function traverseDirectory(currentPath: string) {
    const items = fs.readdirSync(currentPath);
    for (const item of items) {
      const fullPath = path.join(currentPath, item);
      if (fs.statSync(fullPath).isDirectory()) {
        traverseDirectory(fullPath);
      } else if (item === "index.md") {
        files.push(fullPath);
      }
    }
  }

  traverseDirectory(directory);
  return files;
}

function readContentFile(
  contentType: ContentType,
  slug: string
): string | null {
  const directory = getContentDirectory(contentType);
  const mdPath = path.join(directory, ...slug.split("/"), "index.md");

  if (fs.existsSync(mdPath)) {
    try {
      return fs.readFileSync(mdPath, "utf8");
    } catch (error) {
      console.error(`Error reading file ${mdPath}:`, error);
      return null;
    }
  } else {
    console.error(`No .md file found for slug: ${slug}`);
    return null;
  }
}

export function getContentSlugs(contentType: ContentType): string[] {
  const directory = getContentDirectory(contentType);
  const files = getContentFiles(directory);
  return files.map((file) =>
    path.relative(directory, file).replace(/\/index\.md$/, "")
  );
}

export async function getContentBySlug(
  contentType: ContentType,
  slug: string
): Promise<Content | null> {
  const fileContents = readContentFile(contentType, slug);

  if (!fileContents) return null;

  const { data, content } = matter(fileContents);
  const processedMarkdown = await unified()
    .use(remarkParse)
    .use(() => (tree) => {
      // MD files may contain relatively linked images, e.g.:
      // ![My image](./images/my_image.webp)
      // Transform to: /content/posts/my-post/images/my_image.webp
      visit(tree, "image", (node: Image) => {
        if (node.url && node.url.startsWith("./")) {
          node.url = `/content/${
            siteConfig.contentTypes[contentType].slug
          }/${slug}/${node.url.slice(2)}`;
        }
      });
    })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify)
    .process(content);
  const htmlContent = processedMarkdown.toString();
  const {
    title,
    date,
    author,
    coverImage,
    tags,
    excerpt,
    ogImage,
    isHighlighted,
  } = data;

  return {
    contentType,
    slug,
    htmlContent,
    title,
    date,
    coverImage,
    author,
    tags,
    excerpt,
    ogImage,
    isHighlighted,
  } as Content;
}

export async function getContent({
  contentType = "post",
  tag,
  page = 1,
  limit = siteConfig.defaultPageSize,
}: Partial<ContentRequest> = {}): Promise<ContentResponse> {
  const slugs = getContentSlugs(contentType);
  const allContent = await Promise.all(
    slugs.map((slug) => getContentBySlug(contentType, slug))
  ).then((contents) =>
    contents.filter((content): content is Content => content !== null)
  );

  const filteredContent = tag
    ? allContent.filter((item) => item.tags?.includes(tag))
    : allContent;

  filteredContent.sort((a, b) => b.date?.localeCompare(a.date));

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
