export type ContentType = "post" | "tag" | "page";

export type SiteContentType = {
  slug: string;
};

export type SiteNavigationItem = {
  title?: string;
  icon?: string;
  slug: string;
};

export type SiteConfig = {
  siteUrl: string;
  ogImageUrl?: string;
  contentTypes: {
    [key: string]: SiteContentType;
  };
  primaryNavigation: SiteNavigationItem[];
  secondaryNavigation: SiteNavigationItem[];
  defaultPageSize: number;
};

export type Author = {
  name: string;
  picture: string;
};

export type Content = {
  contentType: ContentType;
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  tags: string[];
  excerpt: string;
  ogImage: {
    url: string;
  };
  htmlContent?: string;
  isHighlighted?: boolean;
};

export type ContentRequest = {
  contentType: ContentType;
  tag?: string;
  page?: number;
  limit?: number;
};

export type Pagination = {
  total: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
};

export type ContentResponse = {
  results: Content[];
  pagination: Pagination;
};
