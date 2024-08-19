import type { ContentType } from "@/types";
import fs from "fs";
import path from "path";
import { siteConfig } from "@/siteConfig";
import { unified } from "unified";
import matter from "gray-matter";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import type { Image } from "mdast";

const CONTENT_DIRECTORY = path.join(process.cwd(), "public/content");

export function getMarkdownContentDirectory(contentType: ContentType) {
  const slug = siteConfig.contentTypes[contentType].slug;
  return path.join(CONTENT_DIRECTORY, slug);
}

export function getMarkdownFiles(directory: string): string[] {
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

export function getMarkdownFilePaths(contentType: ContentType): string[] {
  const directory = getMarkdownContentDirectory(contentType);
  const files = getMarkdownFiles(directory);
  return files.map((file) =>
    path.relative(directory, file).replace(/\/index\.md$/, "")
  );
}

export function getMarkdownFile(
  contentType: ContentType,
  slug: string
): { data: { [key: string]: any }; content: string } | null {
  const directory = getMarkdownContentDirectory(contentType);
  const mdPath = path.join(directory, ...slug.split("/"), "index.md");

  if (fs.existsSync(mdPath)) {
    try {
      const fileContents = fs.readFileSync(mdPath, "utf8");
      if (!fileContents) return null;
      const { data, content } = matter(fileContents);
      return { data, content };
    } catch (error) {
      console.error(`Error reading file ${mdPath}:`, error);
      return null;
    }
  } else {
    console.error(`No .md file found for slug: ${slug}`);
    return null;
  }
}

export async function processMarkdown(
  content: string,
  slug: string,
  contentType: ContentType
): Promise<string> {
  return unified()
    .use(remarkParse)
    .use(() => (tree) => {
      // MD files may contain relatively linked images, e.g.:
      // ![My image](./images/placeholder-4x3.webp)
      // Transform to: /content/posts/my-post/images/placeholder-4x3.webp
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
    .process(content)
    .then(String);
}
