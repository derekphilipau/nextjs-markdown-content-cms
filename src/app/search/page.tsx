import { Container } from "@/components/layout/container";
import SearchForm from "@/components/search/search-form";
import SearchResults from "@/components/search/search-results";

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";

  return (
    <main>
      <Container>
        <h1 className="h1-header">Search</h1>
        <SearchForm initialQuery={query} />
        <SearchResults query={query} />
      </Container>
    </main>
  );
}
