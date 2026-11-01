import LegalPage from "@/components/legal-page";
import { PERSON } from "@/content/site";

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy"
      updated="September 14, 2026"
      intro="This is a placeholder Privacy Policy page for this personal portfolio site, provided to satisfy third-party application/registration requirements. This site does not knowingly collect personal data beyond standard, anonymized analytics."
      sections={[
        {
          heading: "Information collected",
          body: "Basic, privacy-respecting analytics (e.g. page views) may be collected via Vercel Analytics to understand site usage. No account creation or personal data submission is required to use this site.",
        },
        {
          heading: "Cookies",
          body: "This site does not use cookies for tracking or advertising purposes.",
        },
        {
          heading: "Third-party services",
          body: "Links to third-party services (e.g. GitHub, LinkedIn) are governed by those services' own privacy policies.",
        },
        {
          heading: "Contact",
          body: (
            <>
              Questions about this privacy policy can be sent to{" "}
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
