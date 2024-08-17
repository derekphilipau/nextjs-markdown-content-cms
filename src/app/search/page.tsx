"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/layout/container";
import { ContentList } from "@/components/content/content-list";
import SearchForm from "@/components/search/search-form";
import type { Content } from "@/types";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchResults, setSearchResults] = useState<
    Array<{
      item: Content;
      refIndex: number;
      score?: number;
    }>
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

  return (
    <main>
      <Container>
        <h1 className="h1-header">Search</h1>
        <SearchForm initialQuery={query} />
        {isLoading ? (
          <p>Loading...</p>
        ) : query && query.trim() !== "" ? (
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
