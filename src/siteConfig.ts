import type { SiteConfig } from "./types";

const twitter = "lumithornedesign";
const instagram = "lumithornedesign";
const github = "lumithornedesign";
const linkedin = "lumithornedesign";
const dribbble = "lumithornedesign";

export const siteConfig: SiteConfig = {
  siteUrl: "https://lumithornedesign.com",
  ogImageUrl:
    "https://og-image.vercel.app/Next.js%20Blog%20Starter%20Example.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg",
  contentTypes: {
    post: {
      slug: "posts",
    },
    tag: {
      slug: "tags",
    },
    page: {
      slug: "pages",
    },
  },
  primaryNavigation: [
    {
      title: "Home",
      slug: "/",
    },
    {
      title: "About",
      slug: "/about",
    },
    {
      title: "Contact",
      slug: "/contact",
    },
  ],
  secondaryNavigation: [
    {
      icon: "Instagram",
      slug: "https://instagram.com/" + instagram,
    },
    {
      icon: "Github",
      slug: "https://github.com/" + github,
    },
    {
      icon: "Linkedin",
      slug: "https://linkedin.com/in/" + linkedin,
    },
    {
      icon: "Dribbble",
      slug: "https://dribbble.com/" + dribbble,
    },
  ],
  defaultPageSize: 6,
};
