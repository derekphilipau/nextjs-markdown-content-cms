import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentBySlug, getContent, getAllTags } from "@/lib/api/content";
import { Container } from "@/components/layout/container";
import { ContentPreview } from "@/components/content/content-preview";
import { getDictionary } from "@/lib/dictionaries/dictionaries";

type Params = {
  params: {
    tag: string;
  };
};

export default async function TagPage({ params }: Params) {
  const tagContent = await getContentBySlug("tag", params.tag);

  const response = await getContent({
    contentType: "post",
    tag: params.tag,
  });
  const results = response.results;

  if (!results || results.length === 0) {
    return notFound();
  }

  return (
    <main>
      <Container>
        <h1 className="h1-heading mb-8">Posts tagged with "{params.tag}"</h1>
        {tagContent?.htmlContent && (
          <div
            className="mb-8 prose prose-lg lg:prose-2xl dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: tagContent.htmlContent }}
          />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((content) => (
            <ContentPreview content={content} />
          ))}
        </div>
      </Container>
    </main>
  );
}

export function generateMetadata({ params }: Params): Metadata {
  const dict = getDictionary();
  const title = `Posts tagged with "${params.tag}" | ${dict.site.title}`;

  return {
    title,
    openGraph: {
      title,
    },
  };
}

export async function generateStaticParams() {
  const tags = await getAllTags();

  return tags.map((tag) => ({
    tag: tag,
  }));
}
