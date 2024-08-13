import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentBySlug, getContent, getAllTags } from "@/lib/api/content";
import { Container } from "@/components/layout/container";
import { ContentPreview } from "@/components/content/content-preview";
import { getDictionary } from "@/lib/dictionaries/dictionaries";

type PageParams = {
  params: {
    page: string;
  };
};

export default async function Page({ params }: PageParams) {
  const content = await getContentBySlug("page", params.page);

  if (!content) {
    return notFound();
  }

  return (
    <main>
      <Container>
        <h1 className="text-3xl font-bold mb-8">{content.title}</h1>
        {content?.htmlContent && (
          <div
            className="mb-8 prose prose-lg lg:prose-2xl dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: content.htmlContent }}
          />
        )}
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
