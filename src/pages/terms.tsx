import LegalPage from "@/components/legal-page";
import { PERSON } from "@/content/site";

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      path="/terms"
      updated="September 14, 2026"
      intro="This is a placeholder Terms of Service page for this personal portfolio site, provided to satisfy third-party application/registration requirements. There is no commercial service, subscription, or paid product offered here."
      sections={[
        {
          heading: "Use of this site",
          body: "This site is a personal portfolio. Content is provided as-is, without warranty of any kind, for informational purposes only.",
        },
        {
          heading: "Third-party links",
          body: "This site links to third-party services (e.g. GitHub, LinkedIn). Those services have their own terms and privacy policies, which are not covered here.",
        },
        {
          heading: "Contact",
          body: (
            <>
              Questions about these terms can be sent to{" "}
              <a className="link" href={`mailto:${PERSON.email}`}>
                {PERSON.email}
              </a>
              .
            </>
          ),
        },
      ]}
    />
  );
}
