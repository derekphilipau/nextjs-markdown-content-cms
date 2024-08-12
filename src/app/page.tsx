import { Container } from "@/app/_components/layout/container";
import { ContentHero } from "@/app/_components/content/content-hero";
import { ContentList } from "@/app/_components/content/content-list";
import { getContent } from "@/lib/api/content";

export default async function Index() {
  const res = await getContent();
  const results = res.results;
  console.log(results);

  const heroPost = results[0];

  const morePosts = results.slice(1);

  return (
    <main>
      <Container>
        <ContentHero
          contentType={"post"}
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
        {morePosts.length > 0 && (
          <ContentList contentType="post" items={morePosts} />
        )}
      </Container>
    </main>
  );
}
