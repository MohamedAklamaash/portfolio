import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from "contentlayer/source-files";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";

const computedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx?$/, ""),
  },
};

/**
 * Posts are plain Markdown compiled to HTML at build time. Using MDX instead
 * would need `new Function()` in the browser, which the site's CSP blocks.
 */
export const Content = defineDocumentType(() => ({
  name: "Content",
  filePathPattern: `**/*.md`,
  contentType: "markdown",
  fields: {
    title: { type: "string", description: "Title", required: true },
    description: {
      type: "string",
      description: "One-line summary",
      required: true,
    },
    date: { type: "string", description: "Publish date", required: true },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Content],
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeCodeTitles, rehypePrism],
  },
});
