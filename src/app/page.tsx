import { Container } from "@/components/layout/container";
import { ContentHero } from "@/components/content/content-hero";
import { ContentList } from "@/components/content/content-list";
import { getContent } from "@/lib/api/content";

export default async function Index({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const response = await getContent({ page });
  let results = response.results;
  console.log(results);

  let heroPost = null;
  if (page === 1) {
    heroPost = results[0];
    results = results.slice(1);
  }

  return (
    <main>
      <Container>
        {heroPost && <ContentHero content={heroPost} />}
        {results.length > 0 && (
          <ContentList
            contentType="post"
            items={results}
            pagination={response.pagination}
          />
        )}
      </Container>
    </main>
  );
}
