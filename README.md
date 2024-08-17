# A statically generated CMS using Next.js, Markdown, and TypeScript

This project expands upon the official [blog-starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter).

Major differences include:

- Support for multiple content types (pages, posts, and tags)
- Frontmatter and shortcodes that allow for embedding components
- Search content with [Fuse.js](https://fusejs.io/)

Content is stored in `public/content/[contentType]`, e.g. `public/content/posts`, `public/content/pages`, and `public/content/tags`. Each piece of content has its own directory with an `index.md` file and any associated assets.

## Demo

[https://nextjs-markdown-content-cms.vercel.app/](https://nextjs-markdown-content-cms.vercel.app/)
