import fs from "fs";
import path from "path";
import Fuse from "fuse.js";
import { ContentList } from "@/components/content/content-list";
import { Container } from "@/components/layout/container";
import SearchForm from "@/components/search/search-form";
import type { Content } from "@/types";

export default function SearchResults({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q;
  let searchResults: Array<{
    item: Content;
    refIndex: number;
    score?: number;
  }> = [];
  if (query?.trim()) {
    const searchDataPath = path.join(
      process.cwd(),
      "public",
      "search-data.json"
    );
    const fuseIndexPath = path.join(process.cwd(), "public", "fuse-index.json");

    const searchData: Content[] = JSON.parse(
      fs.readFileSync(searchDataPath, "utf8")
    );
    const fuseIndex = JSON.parse(fs.readFileSync(fuseIndexPath, "utf8"));

    const myIndex = Fuse.parseIndex(fuseIndex);
    const fuse = new Fuse(
      searchData,
      {
        keys: ["title", "excerpt", "tags", "content"],
        includeScore: true,
        threshold: 0.3,
      },
      myIndex
    );
    searchResults = fuse.search(query);
  }

  return (
    <main>
      <Container>
        <h1 className="h1-header">Search</h1>
        <SearchForm initialQuery={query} />
        {query && query.trim() !== "" ? (
          <>
            <h2>Results for "{query}"</h2>
            <ContentList
              contentType="post"
              items={searchResults.map((result) => ({
                ...(result.item as Content),
                score: result.score,
              }))}
              pagination={{
                total: searchResults.length,
                totalPages: 1,
                currentPage: 1,
                pageSize: searchResults.length,
              }}
            />
          </>
        ) : (
          <p>Please enter a search query to see results.</p>
        )}
      </Container>
    </main>
  );
}
