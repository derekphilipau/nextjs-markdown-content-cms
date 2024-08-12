export function resolveImagePath(
  contentTypeSlug: string,
  slug: string,
  imagePath: string
): string {
  if (imagePath.startsWith("./")) {
    return `/content/${contentTypeSlug}/${slug}/${imagePath.slice(2)}`;
  }
  if (imagePath.startsWith("/")) {
    return imagePath;
  }
  return `/content/${contentTypeSlug}/${slug}/${imagePath}`;
}
