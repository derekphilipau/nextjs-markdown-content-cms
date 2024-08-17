import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentBySlug, getContent, getAllTags } from "@/lib/api/content";
import { Container } from "@/components/layout/container";
import { ContentHeader } from "@/components/content/content-header";
import { ContentBody } from "@/components/content/content-body";
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
        <ContentHeader content={content} />
        <ContentBody content={content} />
      </Container>
    </main>
  );
}

export async function generateMetadata({ params }: PageParams): Metadata {
  const content = await getContentBySlug("page", params.page);
  const dict = getDictionary();

  if (!content) {
    return {
      title: "Page Not Found",
    };
  }

  const title = `${content.title} | ${dict.site.title}`;

  return {
    title,
    description: content.excerpt,
    openGraph: {
      title,
      description: content.excerpt,
    },
  };
}

export async function generateStaticParams() {
  const response = await getContent({ contentType: "page" });

  return response.results.map((page) => ({
    page: page.slug,
  }));
}
