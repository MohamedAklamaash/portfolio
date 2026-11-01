import { absoluteUrl, PERSON } from "@/content/site";
import Head from "next/head";

interface SeoProps {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/software". */
  path: string;
  /** Site-relative OG image path. */
  image?: string;
  imageAlt?: string;
  type?: "website" | "profile" | "article";
  /** Use the title verbatim instead of appending the site name. */
  rawTitle?: boolean;
  jsonLd?: object[];
  noindex?: boolean;
  publishedTime?: string;
}

const Seo = ({
  title,
  description,
  path,
  image = "/og/home.png",
  imageAlt = `${PERSON.name}, software engineer`,
  type = "website",
  rawTitle = false,
  jsonLd = [],
  noindex = false,
  publishedTime,
}: SeoProps) => {
  const fullTitle = rawTitle ? title : `${title} | ${PERSON.name}`;
  const url = absoluteUrl(path);
  const img = absoluteUrl(image);
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={PERSON.name} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />
      {type === "profile" && (
        <>
          <meta property="profile:first_name" content="Mohamed" />
          <meta property="profile:last_name" content="Aklamaash" />
          <meta property="profile:username" content={PERSON.githubHandle} />
        </>
      )}
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      <meta name="twitter:image:alt" content={imageAlt} />
      {jsonLd.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          // JSON.stringify output is safe here; "<" is escaped to keep
          // a stray "</script>" in content from closing the tag.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </Head>
  );
};

export default Seo;
