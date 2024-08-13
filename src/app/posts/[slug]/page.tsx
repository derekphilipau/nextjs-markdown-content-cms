import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent, getContentBySlug } from "@/lib/api/content";
import { Container } from "@/components/layout/container";
import { ContentBody } from "@/components/content/content-body";
import { ContentHeader } from "@/components/content/content-header";
import { resolveImagePath } from "@/lib/util/image";
import { getDictionary } from "@/lib/dictionaries/dictionaries";

export default async function Post({ params }: Params) {
  const content = await getContentBySlug("post", params.slug);

  if (!content) {
    return notFound();
  }

  return (
    <main>
      <Container>
        <article className="mb-32">
          <ContentHeader content={content} />
          <ContentBody htmlContent={content.htmlContent} />
        </article>
      </Container>
    </main>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const dict = getDictionary();
  const content = await getContentBySlug("post", params.slug);

  if (!content) {
    return notFound();
  }

  const title = `${content.title} | ${dict.site.title}`;

  const imageUrl = resolveImagePath("posts", content.slug, content.coverImage);

  return {
    title,
    openGraph: {
      title,
      images: [imageUrl],
    },
  };
}

export async function generateStaticParams() {
  const response = await getContent();
  const results = response.results;
  return results.map((content) => ({
    slug: content.slug,
  }));
}
