"use client";

import { Suspense, useState, useEffect } from "react";
import { ContentList } from "@/components/content/content-list";
import type { Content } from "@/types";

function SearchResultsContent({ query = "" }) {
  const [searchResults, setSearchResults] = useState<
    Array<{ item: Content; refIndex: number; score?: number }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query.trim()) {
        setIsLoading(true);
        try {
          const response = await fetch(
            `/api/search?q=${encodeURIComponent(query)}`
          );
          const data = await response.json();
          setSearchResults(data.results);
        } catch (error) {
          console.error("Error fetching search results:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (isLoading) {
    return <p>Loading results...</p>;
  }

  if (!query || query.trim() === "") {
    return <p>Please enter a search query to see results.</p>;
  }

  return (
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
  );
}

export default function SearchResults({ query = "" }) {
  return (
    <Suspense fallback={<p>Loading results...</p>}>
      <SearchResultsContent query={query} />
    </Suspense>
  );
}
