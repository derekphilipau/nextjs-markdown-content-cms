import ContentPage from "../page";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string[] };
  searchParams: URLSearchParams;
}) {
  return ContentPage({ params, searchParams });
}
