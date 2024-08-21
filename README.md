# A statically generated CMS using Next.js, Markdown, and TypeScript

This project expands upon the official [blog-starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter).

Major differences include:

- Support for multiple content types (pages, posts, and tags)
- Pages and subpages
- Frontmatter and shortcodes that allow for:

  - embedding components (e.g. contact form)
  - adding content sections (lists of content)
  - adding a gallery/carousel

- Search content with [Fuse.js](https://fusejs.io/)

Content is stored in `public/content/[contentType]`, e.g. `public/content/posts`, `public/content/pages`, and `public/content/tags`. Each piece of content has its own directory with an `index.md` file and any associated assets.

This is not an attempt to create a full-fledged, general-purpose CMS like [11ty](https://www.11ty.dev/docs/), but rather a simple way to manage content for a small site. The requirements were based on my content needs for my personal site.

## Demo

[https://nextjs-markdown-content-cms.vercel.app/](https://nextjs-markdown-content-cms.vercel.app/)
