import { allContents } from "contentlayer/generated";

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
}

/** Post metadata only, newest first. Never send post bodies to list pages. */
export const getPostList = (): PostMeta[] =>
  allContents
    .map(({ slug, title, description, date }) => ({
      slug,
      title,
      description,
      date,
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
