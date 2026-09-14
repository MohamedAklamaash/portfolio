import { NextSeo } from "next-seo";
import Link from "next/link";
import { SOCIAL_IDS } from "@/lib/constants";

const Privacy = () => {
  return (
    <>
      <NextSeo title="Privacy Policy" description="Privacy Policy" />
      <div className="max-w-3xl mx-auto px-6 sm:px-8 mb-24">
        <h1 className="text-4xl font-semibold mt-12 md:mt-20">Privacy Policy</h1>
        <p className="text-gray-400 mt-1">Last updated: September 14, 2026</p>

        <hr className="border-gray-700 my-6" />

        <div className="flex flex-col gap-6 text-gray-300 leading-relaxed">
          <p>
            This is a placeholder Privacy Policy page for this personal portfolio site,
            provided to satisfy third-party application/registration requirements. This site
            does not knowingly collect personal data beyond standard, anonymized analytics.
          </p>

          <section>
            <h2 className="text-xl font-medium text-gray-100 mb-2">Information collected</h2>
            <p>
              Basic, privacy-respecting analytics (e.g. page views) may be collected via
              Vercel Analytics to understand site usage. No account creation or personal data
              submission is required to use this site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-gray-100 mb-2">Cookies</h2>
            <p>
              This site does not use cookies for tracking or advertising purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-gray-100 mb-2">Third-party services</h2>
            <p>
              Links to third-party services (e.g. GitHub, LinkedIn) are governed by those
              services&apos; own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-gray-100 mb-2">Contact</h2>
            <p>
              Questions about this privacy policy can be sent to{" "}
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

export default Privacy;
