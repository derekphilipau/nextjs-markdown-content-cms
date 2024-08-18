import Link from "next/link";

interface ContentBreadcrumbsProps {
  path: string[];
}

export function ContentBreadcrumbs({ path }: ContentBreadcrumbsProps) {
  const breadcrumbs = path.map((segment, index) => {
    const href = `/${path.slice(0, index + 1).join("/")}`;
    // TODO: Use a proper titles rather than just capitalizing the segment
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    return { href, label };
  });

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex space-x-2 text-base pb-2">
        <li>
          <Link href="/" className="">
            Home
          </Link>
        </li>
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center">
            <span className="text-gray-500">/</span>
            {index === breadcrumbs.length - 1 ? (
              <span className="text-gray-900 ml-2">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="ml-2">
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
