import fs from "fs";
import path from "path";
import Fuse from "fuse.js";
import type { ContentType } from "../types";
import { getContent } from "../lib/api/content";
import { siteConfig } from "../siteConfig";

type SearchIndexItem = {
  contentType: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  htmlContent: string;
};

async function generateSearchIndex() {
  const searchIndex: SearchIndexItem[] = [];

  for (const contentType of Object.keys(siteConfig.contentTypes)) {
    try {
      const { results } = await getContent({
        contentType: contentType as ContentType,
        limit: Number.MAX_SAFE_INTEGER,
      });

      console.log(`Fetched ${results.length} items for ${contentType}`);

      const formattedResults: SearchIndexItem[] = results.map((item) => ({
        contentType,
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt || "",
        coverImage: item.coverImage || "",
        tags: item.tags || [],
        htmlContent: item.htmlContent || "",
      }));

      searchIndex.push(...formattedResults);
    } catch (error) {
      console.error(`Error fetching content for ${contentType}:`, error);
    }
  }

  console.log(`Total items in searchIndex: ${searchIndex.length}`);

  if (searchIndex.length === 0) {
    console.error("No items found for search index. Aborting.");
    return;
  }

  const fuse = new Fuse(searchIndex, {
    keys: ["title", "excerpt", "tags", "content"],
    includeScore: true,
    threshold: 0.3,
  });

  const fuseIndex = fuse.getIndex();

  fs.writeFileSync(
    path.join(process.cwd(), "public", "search-data.json"),
    JSON.stringify(searchIndex, null, 2)
  );

  fs.writeFileSync(
    path.join(process.cwd(), "public", "fuse-index.json"),
    JSON.stringify(fuseIndex.toJSON(), null, 2)
  );

  console.log("Search index and Fuse index generated successfully.");
}

generateSearchIndex().catch(console.error);
