import { NextSeo } from "next-seo";
import Link from "next/link";
import { SOCIAL_IDS } from "@/lib/constants";

const Terms = () => {
  return (
    <>
      <NextSeo title="Terms of Service" description="Terms of Service" />
      <div className="max-w-3xl mx-auto px-6 sm:px-8 mb-24">
        <h1 className="text-4xl font-semibold mt-12 md:mt-20">Terms of Service</h1>
        <p className="text-gray-400 mt-1">Last updated: September 14, 2026</p>

        <hr className="border-gray-700 my-6" />

        <div className="flex flex-col gap-6 text-gray-300 leading-relaxed">
          <p>
            This is a placeholder Terms of Service page for this personal portfolio site,
            provided to satisfy third-party application/registration requirements. There is
            no commercial service, subscription, or paid product offered here.
          </p>

          <section>
            <h2 className="text-xl font-medium text-gray-100 mb-2">Use of this site</h2>
            <p>
              This site is a personal portfolio. Content is provided as-is, without warranty
              of any kind, for informational purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-gray-100 mb-2">Third-party links</h2>
            <p>
              This site links to third-party services (e.g. GitHub, LinkedIn). Those services
              have their own terms and privacy policies, which are not covered here.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-gray-100 mb-2">Contact</h2>
            <p>
              Questions about these terms can be sent to{" "}
              <a
                href={`mailto:${SOCIAL_IDS.email}`}
                className="underline hover:text-white"
              >
                {SOCIAL_IDS.email}
              </a>
              .
            </p>
          </section>
        </div>

        <div className="border-gray-700 border-[0.2px] mt-10" />
        <Link href="/" className="flex justify-center mt-8 mb-4">
          <div className="flex gap-2 hover:bg-gray-800 px-4 py-2 rounded-md hover:cursor-pointer">
            <p className="text-sm">Back to home</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Terms;
