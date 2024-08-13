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
  social?: {
    twitter?: string;
    instagram?: string;
    github?: string;
  };
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
  content: string;
  htmlContent: string;
  form?: string;
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
