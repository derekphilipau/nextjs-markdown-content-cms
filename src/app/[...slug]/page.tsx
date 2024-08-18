import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContentBySlug, getContent } from "@/lib/api/content";
import { Container } from "@/components/layout/container";
import { ContentHeader } from "@/components/content/content-header";
import { ContentBody } from "@/components/content/content-body";
import { getDictionary } from "@/lib/dictionaries/dictionaries";

type PageParams = {
  params: {
    slug: string[];
  };
};

export default async function Page({ params }: PageParams) {
  const slug = params.slug ? params.slug.join("/") : "index";
  const content = await getContentBySlug("page", slug);

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

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const slug = params.slug ? params.slug.join("/") : "index";
  const content = await getContentBySlug("page", slug);
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
    slug: page.slug.split("/"),
  }));
}
