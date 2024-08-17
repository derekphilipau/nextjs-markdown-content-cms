import { Container } from "@/components/layout/container";
import { ContentList } from "@/components/content/content-list";
import { getContent } from "@/lib/api/content";
import { notFound } from "next/navigation";

export default async function Index({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const response = await getContent({ page });
  let results = response.results;

  if (!results || results.length === 0) {
    return notFound();
  }

  return (
    <main>
      <Container>
        <ContentList
          contentType="post"
          items={results}
          pagination={response.pagination}
        />
      </Container>
    </main>
  );
}
