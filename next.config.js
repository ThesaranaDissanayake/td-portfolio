const createMDX = require("@next/mdx");
const rehypeHighlight = require("rehype-highlight");
const rehypeSlug = require("rehype-slug");
const rehypeAutolinkHeadings = require("rehype-autolink-headings");
const remarkMath = require("remark-math");
const rehypeKatex = require("rehype-katex");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Keep Next's image optimizer limited to local/public assets.
  // Add explicit HTTPS hostnames here only when a trusted remote image source is needed.
  images: {
    remotePatterns: [],
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      rehypeHighlight,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["anchor"],
          },
        },
      ],
      rehypeKatex,
    ],
  },
});

// Merge MDX config with Next.js config
module.exports = withMDX(nextConfig);
