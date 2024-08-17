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

function readContentFile(
  contentType: ContentType,
  slug: string
): string | null {
  const directory = getContentDirectory(contentType);
  const mdPath = path.join(directory, slug, "index.md");

  let fullPath: string;
  if (fs.existsSync(mdPath)) {
    fullPath = mdPath;
  } else {
    console.error(`No .md file found for slug: ${slug}`);
    return null;
  }

  try {
    return fs.readFileSync(fullPath, "utf8");
  } catch (error) {
    console.error(`Error reading file ${fullPath}:`, error);
    return null;
  }
}

export function getContentSlugs(contentType: ContentType) {
  const directory = getContentDirectory(contentType);
  return fs
    .readdirSync(directory)
    .filter((file) => fs.statSync(path.join(directory, file)).isDirectory());
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
  const { title, date, author, coverImage, tags, excerpt, ogImage } = data;

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
