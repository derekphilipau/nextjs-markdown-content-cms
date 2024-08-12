import { Container } from "@/app/_components/layout/container";
import { getAllTags } from "@/lib/api/tags";
import Link from "next/link";

export default async function TagsIndex() {
  const allTags = await getAllTags();

  return (
    <main>
      <Container>
        <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
          Tags
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
          {allTags.map((tag) => (
            <Link key={tag.slug} href={`/tags/${tag.slug}`}>
              <h3 className="text-3xl mb-3 leading-snug">{tag.name}</h3>
              <p className="text-lg leading-relaxed mb-4">
                {tag.count} {tag.count === 1 ? "post" : "posts"}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}
