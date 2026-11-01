import Seo from "@/components/seo";
import { PROFILE_LABELS, PROFILE_PATHS } from "@/content/site";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found"
        description="This page doesn't exist."
        path="/404"
        noindex
      />
      <div className="mx-auto max-w-prose px-5 pt-20 sm:px-0 sm:pt-28">
        <p className="label">404</p>
        <h1 className="mt-3 text-[32px] font-semibold tracking-[-0.025em] text-fg">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-3 text-[17px] leading-7 text-body">
          It may have moved when I reorganised the site. These should get you
          where you were going:
        </p>
        <ul className="mt-6 space-y-2 text-[15px]">
          <li>
            <Link className="link" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="link" href={PROFILE_PATHS.software}>
              {PROFILE_LABELS.software}
            </Link>
          </li>
          <li>
            <Link className="link" href={PROFILE_PATHS.ai}>
              {PROFILE_LABELS.ai}
            </Link>
          </li>
          <li>
            <Link className="link" href="/posts">
              Writing
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
