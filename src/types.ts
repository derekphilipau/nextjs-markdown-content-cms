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

export type MarkdownContent = {
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
};

export type ContentRequest = {
  contentType: string;
  tag?: string;
  page?: number;
  limit?: number;
};

export type ContentResponse = {
  results: MarkdownContent[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
};
