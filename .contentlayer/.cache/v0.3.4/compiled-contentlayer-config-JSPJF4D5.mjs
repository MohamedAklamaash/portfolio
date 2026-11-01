// contentlayer.config.ts
import {
  defineDocumentType,
  makeSource
} from "contentlayer/source-files";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";
var Content = defineDocumentType(() => ({
  name: "Content",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "Title",
      required: true
    },
    description: {
      type: "string",
      description: "The description of the snippet",
      required: true
    },
    date: {
      type: "string",
      description: "Date of the snippet",
      required: true
    }
  },
  computedFields
}));
var computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, "")
  }
};
var contentlayer_config_default = makeSource({
  contentDirPath: "./content",
  documentTypes: [Content],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeCodeTitles, rehypePrism]
  }
});
export {
  Content,
  computedFields,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-JSPJF4D5.mjs.map
